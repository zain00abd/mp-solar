import { NextResponse } from 'next/server';
import {
  getDb,
  COL,
  isValidDocumentId,
  docWithId,
  countByCompany,
  findDuplicateCompanyName,
  serverTimestampUpdate,
  resolveApiError,
} from '@/lib/firestore';

const PICK_FIELDS = ['name', 'image', 'isActive'];
const COMPANY_UPDATE_FIELDS = ['name', 'country', 'logo', 'description', 'website', 'established', 'color1', 'color2', 'color3'];

function pickCompanyBody(body) {
  const out = {};
  for (const k of COMPANY_UPDATE_FIELDS) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}

function pickProductSummary(data) {
  const o = { _id: data._id };
  for (const k of PICK_FIELDS) {
    if (data[k] !== undefined) o[k] = data[k];
  }
  if (data.price !== undefined) o.price = data.price;
  return o;
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.companies).doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }

    const company = docWithId(snap.id, snap.data());

    const [batSnap, invSnap, panSnap] = await Promise.all([
      db.collection(COL.batteries).where('company', '==', id).get(),
      db.collection(COL.inverters).where('company', '==', id).get(),
      db.collection(COL.panels).where('company', '==', id).get(),
    ]);

    const batteries = batSnap.docs.map((d) => pickProductSummary(docWithId(d.id, d.data())));
    const inverters = invSnap.docs.map((d) => pickProductSummary(docWithId(d.id, d.data())));
    const panels = panSnap.docs.map((d) => pickProductSummary(docWithId(d.id, d.data())));

    return NextResponse.json({
      success: true,
      data: {
        ...company,
        products: { batteries, inverters, panels },
        counts: {
          batteries: batteries.length,
          inverters: inverters.length,
          panels: panels.length,
          total: batteries.length + inverters.length + panels.length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    const { status, body } = resolveApiError(error, 'Failed to fetch company');
    return NextResponse.json(body, { status });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.companies).doc(id);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }

    const ex = existing.data();
    if (body.name && body.name !== ex?.name) {
      const dup = await findDuplicateCompanyName(db, body.name, id);
      if (dup) {
        return NextResponse.json({ success: false, error: 'Company with this name already exists' }, { status: 409 });
      }
    }

    const patch = pickCompanyBody(body);
    const merged = { ...ex, ...patch, ...serverTimestampUpdate() };
    await ref.set(merged, { merge: false });

    const updatedCompany = docWithId(id, (await ref.get()).data());
    return NextResponse.json({ success: true, data: updatedCompany, message: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    const { status, body } = resolveApiError(error, 'Failed to update company');
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!isValidDocumentId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const db = getDb();
    const ref = db.collection(COL.companies).doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }

    const batteriesCount = await countByCompany(db, COL.batteries, id);
    const invertersCount = await countByCompany(db, COL.inverters, id);
    const panelsCount = await countByCompany(db, COL.panels, id);
    const totalCount = batteriesCount + invertersCount + panelsCount;

    if (totalCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete company. ${totalCount} products are associated with this company (batteries: ${batteriesCount}, inverters: ${invertersCount}, panels: ${panelsCount}). Please delete or reassign the products first.`,
        },
        { status: 409 }
      );
    }

    await ref.delete();
    return NextResponse.json({ success: true, message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    const { status, body } = resolveApiError(error, 'Failed to delete company');
    return NextResponse.json(body, { status });
  }
}
