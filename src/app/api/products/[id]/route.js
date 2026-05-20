import { NextResponse } from 'next/server';
import {
  getDb,
  COL,
  isValidDocumentId,
  docWithId,
  attachCompany,
  findDuplicateProductNameInCategory,
  serverTimestampUpdate,
} from '@/lib/firestore';

const PRODUCT_FIELDS = [
  'name',
  'category',
  'company',
  'image',
  'gallery',
  'pdfUrl',
  'description',
  'features',
  'models',
  'specs',
  'tags',
  'warranty',
  'isActive',
];

function pickBody(body) {
  const out = {};
  for (const k of PRODUCT_FIELDS) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.products).doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const product = docWithId(snap.id, snap.data());
    const [populated] = await attachCompany(db, [product]);
    const companyId =
      typeof populated.company === 'object' ? populated.company?._id : populated.company;
    const cat = populated.category;

    const activeSnap = await db.collection(COL.products).where('isActive', '==', true).get();
    const relatedProducts = activeSnap.docs
      .map((d) => docWithId(d.id, d.data()))
      .filter(
        (r) =>
          r._id !== id &&
          (r.company === companyId || (cat && r.category === cat))
      )
      .slice(0, 4);

    const relatedPopulated = await attachCompany(db, relatedProducts, ['name', 'logo']);

    return NextResponse.json({
      success: true,
      data: {
        ...populated,
        relatedProducts: relatedPopulated,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.products).doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const ex = existing.data();

    if (body.company && !isValidDocumentId(body.company)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    if (body.company && body.company !== ex?.company) {
      const cSnap = await db.collection(COL.companies).doc(body.company).get();
      if (!cSnap.exists) {
        return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
      }
    }

    const cat = body.category || ex?.category;
    if (body.name && body.name !== ex?.name) {
      const dup = await findDuplicateProductNameInCategory(db, cat, body.name, id);
      if (dup) {
        return NextResponse.json(
          { success: false, error: 'Product with this name already exists in this category' },
          { status: 409 }
        );
      }
    }

    const merged = { ...ex, ...pickBody(body), ...serverTimestampUpdate() };
    await ref.set(merged, { merge: false });

    const updatedProduct = docWithId(id, (await ref.get()).data());
    const [populated] = await attachCompany(db, [updatedProduct]);
    return NextResponse.json({ success: true, data: populated, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.products).doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (permanent) {
      await ref.delete();
      return NextResponse.json({ success: true, message: 'Product permanently deleted' });
    }

    await ref.set({ ...snap.data(), isActive: false, ...serverTimestampUpdate() }, { merge: true });
    return NextResponse.json({ success: true, message: 'Product deactivated successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
