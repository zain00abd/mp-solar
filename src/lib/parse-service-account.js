/**
 * Parses Firebase service account JSON from env (plain JSON or base64).
 * Fixes private_key newlines when pasted as literal \\n in hosting dashboards.
 */
export function parseServiceAccountFromEnv(raw) {
  const trimmed = raw.trim();
  let parsed;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    try {
      parsed = JSON.parse(Buffer.from(trimmed, 'base64').toString('utf8'));
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON or base64 JSON');
    }
  }

  if (!parsed?.client_email || !parsed?.private_key) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY JSON is missing client_email or private_key');
  }

  if (typeof parsed.private_key === 'string') {
    parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  }

  return parsed;
}
