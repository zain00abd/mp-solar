import { NextResponse } from 'next/server';
import {
  getDb,
  COL,
  isValidDocumentId,
  fetchCollectionRows,
  sortDocuments,
  attachCompany,
  findDuplicateProductNameInCategory,
  serverTimestampsNew,
  docWithId,
} from '@/lib/firestore';

const ALLOWED_CATEGORIES = ['batteries', 'inverters', 'products'];
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

export async function GET(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 12;
    const category = searchParams.get('category') || '';
    const company = searchParams.get('company') || '';
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let rows = await fetchCollectionRows(db, COL.products, {
      company: company && isValidDocumentId(company) ? company : '',
      search,
      activeOnly: true,
    });

    if (category) {
      rows = rows.filter((r) => r.category === category);
    }

    const sorted = sortDocuments(rows, sortBy, sortOrder);
    const total = sorted.length;
    const skip = (page - 1) * limit;
    const pageRows = sorted.slice(skip, skip + limit);
    const data = await attachCompany(db, pageRows);

    return NextResponse.json({
      success: true,
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 0 },
      stats: { totalProducts: total },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { name, category, company, image, pdfUrl, description, features, models, specs, tags, warranty } = body;

    if (!name || !category || !company || !image || !pdfUrl || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, category, company, image, pdfUrl, and description are required' },
        { status: 400 }
      );
    }

    if (!ALLOWED_CATEGORIES.includes(String(category).toLowerCase())) {
      return NextResponse.json({ success: false, error: 'Invalid category' }, { status: 400 });
    }

    if (!isValidDocumentId(company)) {
      return NextResponse.json({ success: false, error: 'Invalid company ID' }, { status: 400 });
    }

    const cSnap = await db.collection(COL.companies).doc(company).get();
    if (!cSnap.exists) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }

    const dup = await findDuplicateProductNameInCategory(db, category, name, null);
    if (dup) {
      return NextResponse.json(
        { success: false, error: 'Product with this name already exists in this category' },
        { status: 409 }
      );
    }

    const ref = db.collection(COL.products).doc();
    const payload = {
      ...pickBody({
        name,
        category: String(category).toLowerCase(),
        company,
        image,
        pdfUrl,
        description,
        features: features || [],
        models: models || [],
        specs: specs || [],
        tags: tags || [],
        warranty: warranty || {},
        gallery: Array.isArray(body.gallery)
          ? body.gallery
              .filter((u) => typeof u === 'string' && /^https?:\/\//i.test(String(u).trim()) && !String(u).trim().startsWith('data:'))
              .map((u) => String(u).trim())
          : undefined,
        isActive: true,
      }),
      ...serverTimestampsNew(),
    };
    await ref.set(payload);

    const created = docWithId(ref.id, (await ref.get()).data());
    const [populated] = await attachCompany(db, [created]);
    return NextResponse.json({ success: true, data: populated, message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
