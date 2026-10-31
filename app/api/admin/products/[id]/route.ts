import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getProductById, saveProduct, deleteProduct } from '@/lib/db';
import { escapeHtml } from '@/lib/security';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const product = await getProductById(numId);
  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const existing = await getProductById(numId);
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid payload.' }, { status: 400 });
  }

  const updated = await saveProduct({
    id: numId,
    name: body.name ? escapeHtml(body.name.trim()) : existing.name,
    slug: body.slug ? body.slug.trim() : existing.slug,
    category: body.category ? escapeHtml(body.category.trim()) : existing.category,
    process: body.process !== undefined ? escapeHtml(body.process.trim()) : existing.process,
    industry: body.industry !== undefined ? escapeHtml(body.industry.trim()) : existing.industry,
    material: body.material !== undefined ? escapeHtml(body.material.trim()) : existing.material,
    tolerance: body.tolerance !== undefined ? escapeHtml(body.tolerance.trim()) : existing.tolerance,
    finish: body.finish !== undefined ? escapeHtml(body.finish.trim()) : existing.finish,
    dimensions: body.dimensions !== undefined ? escapeHtml(body.dimensions.trim()) : existing.dimensions,
    weight: body.weight !== undefined ? escapeHtml(body.weight.trim()) : existing.weight,
    moq: body.moq !== undefined ? Number(body.moq) : existing.moq,
    description: body.description !== undefined ? escapeHtml(body.description.trim()) : existing.description,
    specs: body.specs !== undefined ? escapeHtml(body.specs.trim()) : existing.specs,
    applications: body.applications !== undefined ? escapeHtml(body.applications.trim()) : existing.applications,
    image: body.image ? body.image.trim() : existing.image,
    is_published: body.is_published !== undefined ? (body.is_published ? 1 : 0) : existing.is_published,
    featured: body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
  });

  return NextResponse.json({
    success: true,
    message: 'Product updated successfully.',
    product: updated,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const success = await deleteProduct(numId);
  if (!success) {
    return NextResponse.json({ success: false, error: 'Failed to delete product.' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Product deleted successfully.',
  });
}
