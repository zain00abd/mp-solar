import { NextResponse } from 'next/server';
import { getDb, COL, resolveApiError } from '@/lib/firestore';

/** للتحقق من اتصال Firestore على الاستضافة: GET /api/health */
export async function GET() {
  try {
    const db = getDb();
    await db.collection(COL.companies).limit(1).get();
    return NextResponse.json({
      ok: true,
      firestore: 'connected',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || null,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    const { status, body } = resolveApiError(error, 'Health check failed');
    return NextResponse.json({ ok: false, ...body }, { status });
  }
}
