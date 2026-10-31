import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getAllProducts, saveProduct } from '@/lib/db';
import { escapeHtml } from '@/lib/security';

export async function GET(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    let products = await getAllProducts(false);

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          (p.material && p.material.toLowerCase().includes(search)) ||
          (p.tolerance && p.tolerance.toLowerCase().includes(search))
      );
    }

    if (category && category !== 'All') {
      products = products.filter((p) => p.category === category);
    }

    if (status === 'published') {
      products = products.filter((p) => p.is_published === 1 || p.is_published === true);
    } else if (status === 'draft') {
      products = products.filter((p) => p.is_published === 0 || p.is_published === false);
    }

    return NextResponse.json({
      success: true,
      products,
      total: products.length,
    });
  } catch (error) {
    console.error('Failed fetching products:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid product payload.' }, { status: 400 });
    }

    const {
      name = '',
      category = '',
      process = '',
      industry = '',
      material = '',
      tolerance = '',
      finish = '',
      dimensions = '',
      weight = '',
      moq = 10,
      description = '',
      specs = '',
      applications = '',
      image = '',
      is_published = 1,
      featured = 0,
    } = body;

    if (!name.trim()) {
      return NextResponse.json({ success: false, error: 'Product name is required.' }, { status: 400 });
    }

    if (!category.trim()) {
      return NextResponse.json({ success: false, error: 'Category is required.' }, { status: 400 });
    }

    const slug = (body.slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const saved = await saveProduct({
      name: escapeHtml(name.trim()),
      slug,
      category: escapeHtml(category.trim()),
      process: escapeHtml(process.trim()),
      industry: escapeHtml(industry.trim()),
      material: escapeHtml(material.trim()),
      tolerance: escapeHtml(tolerance.trim()),
      finish: escapeHtml(finish.trim()),
      dimensions: escapeHtml(dimensions.trim()),
      weight: escapeHtml(weight.trim()),
      moq: Number(moq) || 10,
      description: escapeHtml(description.trim()),
      specs: escapeHtml(specs.trim()),
      applications: escapeHtml(applications.trim()),
      image: image.trim() || '/images/products/cnc-turned-bushings-fittings.jpg',
      is_published: is_published ? 1 : 0,
      featured: featured ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully.',
      product: saved,
    });
  } catch (error) {
    console.error('Failed saving product:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
