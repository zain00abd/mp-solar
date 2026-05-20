import { NextResponse } from 'next/server';
import {
  getDb,
  COL,
  isValidDocumentId,
  docWithId,
  attachCompany,
  findDuplicateNameForCompany,
  serverTimestampUpdate,
  resolveApiError,
} from '@/lib/firestore';

const COLLECTION = COL.batteries;
const PRODUCT_FIELDS = ['name', 'company', 'image', 'gallery', 'pdfUrl', 'description', 'features', 'models', 'specs', 'tags', 'warranty', 'category', 'sortOrder', 'isActive'];

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
      return NextResponse.json({ success: false, error: 'Invalid battery ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COLLECTION).doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Battery not found' }, { status: 404 });
    }

    const item = docWithId(snap.id, snap.data());
    const [populated] = await attachCompany(db, [item]);
    const companyId = typeof populated.company === 'object' ? populated.company?._id : populated.company;

    const relSnap = await db.collection(COLLECTION).where('company', '==', companyId || '').get();
    const related = relSnap.docs
      .map((d) => docWithId(d.id, d.data()))
      .filter((r) => r._id !== id && r.isActive !== false)
      .slice(0, 6);

    return NextResponse.json({ success: true, data: populated, related });
  } catch (error) {
    console.error('Error fetching battery:', error);
    const { status, body } = resolveApiError(error, 'Failed to fetch battery');
    return NextResponse.json(body, { status });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid battery ID' }, { status: 400 });
    }

    if (body.company && !isValidDocumentId(body.company)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COLLECTION).doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ success: false, error: 'Battery not found' }, { status: 404 });
    }

    if (body.company) {
      const cSnap = await db.collection(COL.companies).doc(body.company).get();
      if (!cSnap.exists) {
        return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
      }
    }

    const companyForDup = body.company ?? existing.data()?.company;
    if (body.name && companyForDup) {
      const dup = await findDuplicateNameForCompany(db, COLLECTION, companyForDup, body.name, id);
      if (dup) {
        return NextResponse.json({ success: false, error: 'Battery with this name already exists for this company' }, { status: 409 });
      }
    }

    const merged = { ...existing.data(), ...pickBody(body), ...serverTimestampUpdate() };
    await ref.set(merged, { merge: false });

    const updated = docWithId(id, (await ref.get()).data());
    const [populated] = await attachCompany(db, [updated]);
    return NextResponse.json({ success: true, data: populated, message: 'Battery updated successfully' });
  } catch (error) {
    console.error('Error updating battery:', error);
    const { status, body } = resolveApiError(error, 'Failed to update battery');
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid battery ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COLLECTION).doc(id);

    if (permanent) {
      const snap = await ref.get();
      if (!snap.exists) {
        return NextResponse.json({ success: false, error: 'Battery not found' }, { status: 404 });
      }
      await ref.delete();
      return NextResponse.json({ success: true, message: 'Battery deleted permanently' });
    }

    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Battery not found' }, { status: 404 });
    }
    await ref.set({ ...snap.data(), isActive: false, ...serverTimestampUpdate() }, { merge: true });
    const disabled = docWithId(id, (await ref.get()).data());
    return NextResponse.json({ success: true, message: 'Battery deactivated successfully', data: disabled });
  } catch (error) {
    console.error('Error deleting battery:', error);
    const { status, body } = resolveApiError(error, 'Failed to delete battery');
    return NextResponse.json(body, { status });
  }
}
