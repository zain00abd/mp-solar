import { NextResponse } from 'next/server';
import {
  getDb,
  COL,
  sortDocuments,
  escapeRegExp,
  countActiveByCompany,
  findDuplicateCompanyName,
  serverTimestampsNew,
  docWithId,
  resolveApiError,
} from '@/lib/firestore';

const COMPANY_FIELDS = ['name', 'country', 'logo', 'description', 'website', 'established', 'color1', 'color2', 'color3'];

function pickCompanyBody(body) {
  const out = {};
  for (const k of COMPANY_FIELDS) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}

export async function GET(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 10;
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const includeCounts = (searchParams.get('includeCounts') || 'false').toLowerCase() === 'true';

    const snap = await db.collection(COL.companies).get();
    let rows = snap.docs.map((d) => docWithId(d.id, d.data()));

    if (search) {
      const re = new RegExp(escapeRegExp(search), 'i');
      rows = rows.filter((c) => re.test(c.name || ''));
    }
    if (country) {
      const re = new RegExp(escapeRegExp(country), 'i');
      rows = rows.filter((c) => re.test(c.country || ''));
    }

    rows = sortDocuments(rows, 'createdAt', 'desc');
    const total = rows.length;
    const skip = (page - 1) * limit;
    let pageRows = rows.slice(skip, skip + limit);

    if (includeCounts) {
      pageRows = await Promise.all(
        pageRows.map(async (company) => {
          const id = company._id;
          const [batteryCount, inverterCount, panelCount] = await Promise.all([
            countActiveByCompany(db, COL.batteries, id),
            countActiveByCompany(db, COL.inverters, id),
            countActiveByCompany(db, COL.panels, id),
          ]);
          const totalProducts = batteryCount + inverterCount + panelCount;
          return {
            ...company,
            productsSummary: {
              batteries: batteryCount,
              inverters: inverterCount,
              panels: panelCount,
              total: totalProducts,
            },
          };
        })
      );
    }

    return NextResponse.json({
      success: true,
      data: pageRows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 0 },
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    const { status, body } = resolveApiError(error, 'Failed to fetch companies');
    return NextResponse.json(body, { status });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { name, country, logo, description, website, established, color1, color2, color3 } = body;

    if (!name || !country || !logo) {
      return NextResponse.json({ success: false, error: 'Name, country, and logo are required' }, { status: 400 });
    }

    const dup = await findDuplicateCompanyName(db, name, null);
    if (dup) {
      return NextResponse.json({ success: false, error: 'Company with this name already exists' }, { status: 409 });
    }

    const ref = db.collection(COL.companies).doc();
    await ref.set({
      ...pickCompanyBody({ name, country, logo, description, website, established, color1, color2, color3 }),
      ...serverTimestampsNew(),
    });

    const created = docWithId(ref.id, (await ref.get()).data());
    return NextResponse.json({ success: true, data: created, message: 'Company created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    const { status, body } = resolveApiError(error, 'Failed to create company');
    return NextResponse.json(body, { status });
  }
}
