import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAdminSession } from '@/lib/auth';
import { sanitizeFileName } from '@/lib/security';

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ success: false, error: 'Invalid form submission.' }, { status: 400 });
    }

    const file = formData.get('file') as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'No image file uploaded.' }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ success: false, error: 'Image size exceeds the 5 MB limit.' }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image format. Allowed formats: JPG, PNG, WEBP.' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeName = sanitizeFileName(file.name);
    const destinationPath = path.join(uploadDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/images/products/${safeName}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: publicUrl,
      filename: safeName,
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload image.' }, { status: 500 });
  }
}
