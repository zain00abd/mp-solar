const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../src/app/api');
const files = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.js')) files.push(p);
  }
}

walk(root);

const catchRe =
  /} catch \(error\) \{\s*console\.error\(([^)]+)\);\s*return NextResponse\.json\(\{ success: false, error: '([^']+)' \}, \{ status: 500 \}\);\s*\}/g;

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  if (!catchRe.test(s)) continue;
  catchRe.lastIndex = 0;

  if (!s.includes('resolveApiError') && s.includes("@/lib/firestore")) {
    s = s.replace(
      /docWithId,\n\} from '@\/lib\/firestore';/,
      "docWithId,\n  resolveApiError,\n} from '@/lib/firestore';"
    );
    s = s.replace(
      /docWithId,\n  isFirestoreDatabaseMissing,\n  firestoreSetupJsonResponse,\n\} from '@\/lib\/firestore';/,
      "docWithId,\n  isFirestoreDatabaseMissing,\n  firestoreSetupJsonResponse,\n  resolveApiError,\n} from '@/lib/firestore';"
    );
    s = s.replace(
      /firestoreSetupJsonResponse,\n\} from '@\/lib\/firestore';/,
      "firestoreSetupJsonResponse,\n  resolveApiError,\n} from '@/lib/firestore';"
    );
    if (!s.includes('resolveApiError')) {
      s = s.replace(
        /\} from '@\/lib\/firestore';/,
        "  resolveApiError,\n} from '@/lib/firestore';"
      );
    }
  }

  const next = s.replace(catchRe, (_m, logLabel, msg) => {
    return `} catch (error) {
    console.error(${logLabel}, error);
    const { status, body } = resolveApiError(error, '${msg}');
    return NextResponse.json(body, { status });
  }`;
  });

  if (next !== s) {
    fs.writeFileSync(file, next);
    console.log('updated', path.relative(root, file));
  }
}
