import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { getAdminApp } from '@/lib/firebase-admin';

export const COL = {
  companies: 'companies',
  panels: 'panels',
  inverters: 'inverters',
  batteries: 'batteries',
  products: 'products',
};

export function getDb() {
  const app = getAdminApp();
  const dbId = process.env.FIRESTORE_DATABASE_ID?.trim();
  if (dbId) {
    return getFirestore(app, dbId);
  }
  return getFirestore(app);
}

/** gRPC 5 NOT_FOUND — غالبًا لم يُنشأ Firestore في مشروع Firebase */
export function isFirestoreDatabaseMissing(error) {
  if (!error) return false;
  if (error.code === 5 || error.code === 'NOT_FOUND') return true;
  const msg = String(error.message || '');
  return /NOT_FOUND|5\s+NOT_FOUND/i.test(msg);
}

export function firestoreSetupJsonResponse() {
  return {
    success: false,
    error: 'Firestore database not found for this project.',
    hint:
      'In Firebase Console: Build → Firestore Database → Create database (choose Native mode). Wait a minute, then retry.',
    hintAr:
      'في Firebase Console: Build → Firestore Database → إنشاء قاعدة بيانات (اختر Native). انتظر قليلاً ثم أعد المحاولة.',
  };
}

/** Firestore document id: non-empty, no slash. Mongo ObjectIds are valid. */
export function isValidDocumentId(id) {
  if (typeof id !== 'string' || !id.trim()) return false;
  const s = id.trim();
  if (s.length > 800) return false;
  if (s.includes('/') || s.includes('..')) return false;
  return true;
}

export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tsToIso(v) {
  if (v == null) return v;
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v.toDate === 'function') return v.toDate().toISOString();
  if (v instanceof Date) return v.toISOString();
  return v;
}

/** Shape returned to clients (Mongoose-like): _id + ISO date strings */
export function docWithId(id, data) {
  if (!data) return null;
  const o = { _id: id, ...data };
  if (o.createdAt != null) o.createdAt = tsToIso(o.createdAt);
  if (o.updatedAt != null) o.updatedAt = tsToIso(o.updatedAt);
  return o;
}

export async function getCompanyMap(db, ids) {
  const uniq = [...new Set(ids)].filter(isValidDocumentId);
  const out = {};
  if (!uniq.length) return out;
  const refs = uniq.map((id) => db.collection(COL.companies).doc(id));
  const snaps = await db.getAll(...refs);
  for (const sn of snaps) {
    if (sn.exists) out[sn.id] = docWithId(sn.id, sn.data());
  }
  return out;
}

export async function attachCompany(
  db,
  items,
  selectFields = ['name', 'country', 'logo', 'color1', 'color2', 'color3']
) {
  const ids = items
    .map((i) => (typeof i.company === 'string' ? i.company : i.company?._id))
    .filter(Boolean);
  const map = await getCompanyMap(db, ids);
  return items.map((item) => {
    const cid = typeof item.company === 'string' ? item.company : item.company?._id;
    const c = map[cid];
    if (!c) return item;
    const sub = { _id: cid };
    for (const f of selectFields) {
      if (c[f] !== undefined) sub[f] = c[f];
    }
    return { ...item, company: sub };
  });
}

function sortValue(obj, key) {
  const v = obj[key];
  if (v instanceof Timestamp) return v.toMillis();
  if (v && typeof v.toMillis === 'function') return v.toMillis();
  if (typeof v === 'string' && /At$/.test(key)) {
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : 0;
  }
  if (typeof v === 'number') return v;
  return String(v ?? '');
}

export function sortDocuments(rows, sortBy, sortOrder) {
  const dir = sortOrder === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = sortValue(a, sortBy);
    const vb = sortValue(b, sortBy);
    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });
}

export function matchesSearch(doc, search) {
  if (!search) return true;
  const re = new RegExp(escapeRegExp(search), 'i');
  if (re.test(doc.name || '')) return true;
  if (re.test(doc.description || '')) return true;
  const tags = doc.tags || [];
  return tags.some((t) => re.test(String(t)));
}

/**
 * List docs: optional company filter (query by company, then filter isActive in memory to avoid composite indexes).
 */
export async function fetchCollectionRows(db, collection, { company, search, activeOnly = true }) {
  const col = db.collection(collection);
  let snap;
  if (company && isValidDocumentId(company)) {
    snap = await col.where('company', '==', company).get();
  } else if (activeOnly) {
    snap = await col.where('isActive', '==', true).get();
  } else {
    snap = await col.get();
  }

  let rows = snap.docs.map((d) => docWithId(d.id, d.data()));
  if (company && isValidDocumentId(company) && activeOnly) {
    rows = rows.filter((r) => r.isActive !== false);
  }
  if (search) rows = rows.filter((r) => matchesSearch(r, search));
  return rows;
}

export async function countActiveByCompany(db, collection, companyId) {
  const snap = await db.collection(collection).where('company', '==', companyId).get();
  return snap.docs.filter((d) => d.data()?.isActive !== false).length;
}

export async function countByCompany(db, collection, companyId) {
  const snap = await db.collection(collection).where('company', '==', companyId).get();
  return snap.size;
}

export async function findDuplicateNameForCompany(db, collection, companyId, name, excludeId) {
  const snap = await db.collection(collection).where('company', '==', companyId).get();
  const re = new RegExp(`^${escapeRegExp(name)}$`, 'i');
  for (const d of snap.docs) {
    if (excludeId && d.id === excludeId) continue;
    if (re.test(d.data()?.name || '')) return docWithId(d.id, d.data());
  }
  return null;
}

export async function findDuplicateCompanyName(db, name, excludeId) {
  const snap = await db.collection(COL.companies).get();
  const re = new RegExp(`^${escapeRegExp(name)}$`, 'i');
  for (const d of snap.docs) {
    if (excludeId && d.id === excludeId) continue;
    if (re.test(d.data()?.name || '')) return docWithId(d.id, d.data());
  }
  return null;
}

export async function findDuplicateProductNameInCategory(db, category, name, excludeId) {
  const snap = await db.collection(COL.products).where('category', '==', category).get();
  const re = new RegExp(`^${escapeRegExp(name)}$`, 'i');
  for (const d of snap.docs) {
    if (excludeId && d.id === excludeId) continue;
    if (re.test(d.data()?.name || '')) return docWithId(d.id, d.data());
  }
  return null;
}

export const serverTimestampsNew = () => ({
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
});

export const serverTimestampUpdate = () => ({
  updatedAt: FieldValue.serverTimestamp(),
});
