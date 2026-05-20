import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';
import admin from 'firebase-admin';
import { parseServiceAccountFromEnv } from '@/lib/parse-service-account';

/**
 * Initializes Firebase Admin once. Use one of:
 * - FIREBASE_SERVICE_ACCOUNT_PATH: path to the downloaded JSON file (recommended on Windows)
 * - FIREBASE_SERVICE_ACCOUNT_KEY: same JSON as a single line in .env.local (escape quotes carefully)
 * - GOOGLE_APPLICATION_CREDENTIALS: path to the JSON file (Google standard env var)
 */
export function getAdminApp() {
  if (admin.apps.length) {
    return admin.app();
  }

  const fromPath = (filePath) => {
    const p = filePath.trim();
    const resolved = isAbsolute(p) ? p : resolve(process.cwd(), p);
    if (!existsSync(resolved)) {
      throw new Error(`Firebase service account file not found: ${resolved}`);
    }
    const parsed = JSON.parse(readFileSync(resolved, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(parsed),
    });
    return admin.app();
  };

  const pathEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (pathEnv?.trim()) {
    return fromPath(pathEnv);
  }

  const raw =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  if (raw?.trim()) {
    const parsed = parseServiceAccountFromEnv(raw);
    admin.initializeApp({
      credential: admin.credential.cert(parsed),
    });
    return admin.app();
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()) {
    admin.initializeApp();
    return admin.app();
  }

  throw new Error(
    [
      'Firebase Admin is not configured.',
      'Add to .env.local ONE of:',
      '  FIREBASE_SERVICE_ACCOUNT_PATH=./mb-solar-service-account.json   (easiest: put the JSON file in the project folder)',
      '  FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}   (single line; the whole JSON)',
      '  GOOGLE_APPLICATION_CREDENTIALS=C:/full/path/to/serviceAccount.json',
      'Get the file: Firebase Console → Project settings → Service accounts → Generate new private key.',
    ].join(' ')
  );
}
