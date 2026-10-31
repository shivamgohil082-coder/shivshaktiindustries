import { type NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { escapeHtml, getClientIp, checkRateLimit } from '@/lib/security';
import { getAdminSessionFromRequest } from '@/lib/auth';
import { saveProduct } from '@/lib/db';

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'products');
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  let uploadedImagePath: string | null = null;

  try {
    const clientIp = getClientIp(req);

    // Rate limit checks
    const rateLimit = checkRateLimit(`products_write_${clientIp}`, 10, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Require a signed administrator session.
    const session = getAdminSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Sign in as an administrator.' },
        { status: 401 }
      );
    }

    let data: Record<string, unknown> | null = null;
    let imageFile: File | null = null;

    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        data = Object.fromEntries(
          ['name', 'specs', 'materials', 'tolerance', 'applications'].map((key) => [
            key,
            formData.get(key),
          ])
        );
        const image = formData.get('image');
        if (image instanceof File && image.size > 0) {
          imageFile = image;
        } else if (image !== null && typeof image !== 'string') {
          return NextResponse.json(
            { success: false, error: 'Invalid product image.' },
            { status: 400 }
          );
        }
      }
    } else {
      data = await req.json().catch(() => null);
    }

    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    // Required fields validation
    if (
      !data.name || typeof data.name !== 'string' ||
      !data.specs || typeof data.specs !== 'string' ||
      !data.materials || typeof data.materials !== 'string' ||
      !data.tolerance || typeof data.tolerance !== 'string' ||
      !data.applications || typeof data.applications !== 'string'
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required product fields.' },
        { status: 400 }
      );
    }

    if (imageFile) {
      const imageTypes: Record<string, { extension: string; valid: (buffer: Buffer) => boolean }> = {
        'image/jpeg': {
          extension: '.jpg',
          valid: (buffer) => buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
        },
        'image/png': {
          extension: '.png',
          valid: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
        },
        'image/webp': {
          extension: '.webp',
          valid: (buffer) => buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP',
        },
      };
      const imageType = imageTypes[imageFile.type];
      if (!imageType || imageFile.size > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          { success: false, error: 'Choose a JPEG, PNG, or WEBP image up to 5 MB.' },
          { status: 400 }
        );
      }

      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      if (!imageType.valid(imageBuffer)) {
        return NextResponse.json(
          { success: false, error: 'The selected file is not a valid image.' },
          { status: 400 }
        );
      }

      const filename = `${randomUUID()}${imageType.extension}`;
      await fs.promises.mkdir(IMAGE_DIR, { recursive: true });
      uploadedImagePath = path.join(IMAGE_DIR, filename);
      await fs.promises.writeFile(uploadedImagePath, imageBuffer, { flag: 'wx' });
    }

    // Restrict product images to local paths or HTTPS URLs.
    let safeImage = '/images/products/cnc-turned-bushings-fittings.jpg';
    if (uploadedImagePath) {
      safeImage = `/images/products/${path.basename(uploadedImagePath)}`;
    } else if (typeof data.image === 'string' && data.image.trim()) {
      const rawImg = data.image.trim();
      if (rawImg.startsWith('/') || rawImg.startsWith('https://')) {
        safeImage = escapeHtml(rawImg);
      }
    }

    const name = escapeHtml(data.name.trim().slice(0, 120));
    const product = await saveProduct({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      category: 'Turning',
      process: 'Swiss CNC Turning',
      material: escapeHtml(data.materials.trim().slice(0, 200)),
      tolerance: escapeHtml(data.tolerance.trim().slice(0, 100)),
      description: escapeHtml(data.specs.trim().slice(0, 500)),
      specs: escapeHtml(data.specs.trim().slice(0, 500)),
      applications: escapeHtml(data.applications.trim().slice(0, 300)),
      image: safeImage,
      is_published: 1,
      featured: 0,
      moq: 10,
    });
    uploadedImagePath = null;

    return NextResponse.json({
      success: true,
      message: 'Product catalog updated successfully!',
      product,
    });
  } catch (error) {
    if (uploadedImagePath) {
      await fs.promises.unlink(uploadedImagePath).catch((cleanupError) => {
        console.error('Product image cleanup error:', cleanupError instanceof Error ? cleanupError.message : 'Unknown');
      });
    }
    console.error('Products API Error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { success: false, error: 'Failed to save product.' },
      { status: 500 }
    );
  }
}
