# نشر الموقع وربط قاعدة البيانات (Firestore)

على جهازك المحلي يعمل الموقع غالباً لأن ملف `.env.local` موجود. **على الاستضافة** يجب إضافة نفس الإعدادات يدوياً — وإلا ستظهر أخطاء `500` على `/api/products-panels` وغيرها ولن تظهر المنتجات.

## 1. متغيرات البيئة المطلوبة

| المتغير | مطلوب | الوصف |
|---------|--------|--------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | **نعم** | ملف JSON كامل لحساب الخدمة (Service Account) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | نعم | معرّف مشروع Firebase (نفس المشروع) |
| `NEXT_PUBLIC_SITE_URL` | مُستحسن | `https://www.mbsolarpower.com` |
| بقية `NEXT_PUBLIC_FIREBASE_*` | حسب الحاجة | من إعدادات مشروع Firebase → Web app |

راجع أيضاً `.env.example` في المشروع.

## 2. الحصول على `FIREBASE_SERVICE_ACCOUNT_KEY`

1. [Firebase Console](https://console.firebase.google.com) → مشروعك  
2. **Project settings** (⚙️) → **Service accounts**  
3. **Generate new private key** → يُنزَّل ملف `.json`  
4. في لوحة الاستضافة (مثلاً **Vercel** → Project → **Settings** → **Environment Variables**):
   - الاسم: `FIREBASE_SERVICE_ACCOUNT_KEY`
   - القيمة: افتح الملف والصق **كل المحتوى في سطر واحد** (يبدأ بـ `{"type":"service_account",...}`)
   - فعّله لـ **Production** (و Preview إن رغبت)

5. **أعد النشر (Redeploy)** بعد حفظ المتغيرات.

### إن فشل اللصق

- جرّب متغيراً باسم `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` وقيمة = الملف مشفّر Base64.  
- تأكد أن الحقل `private_key` داخل JSON يحتوي على أسطر حقيقية أو `\n` (الكود يصلحها تلقائياً).

## 3. إنشاء Firestore (إن لم تكن موجودة)

Firebase Console → **Build** → **Firestore Database** → **Create database** → **Native mode**.

مجموعات البيانات المتوقعة: `panels`, `inverters`, `batteries`, `companies`, `products`.

## 4. التحقق بعد النشر

افتح في المتصفح:

```
https://www.mbsolarpower.com/api/health
```

- `{"ok":true,"firestore":"connected"}` → الاتصال سليم.  
- `503` مع `hint` / `hintAr` → راجع المتغيرات أعلاه وأعد النشر.

ثم:

```
https://www.mbsolarpower.com/api/products-panels?isActive=true
```

يجب أن يعيد `"success":true` ومصفوفة `data`.

## 5. تحذيرات Console (preload)

رسالة *"preloaded using link preload but not used"* غالباً من خطوط Next.js أو موارد CDN — **لا تمنع ظهور المنتجات**. الخطأ الحاسم هو `500` على مسارات `/api/...`.

## 6. Vercel (مختصر)

1. اربط المستودع بمشروع Vercel  
2. أضف كل متغيرات `.env.example` في **Environment Variables**  
3. Deploy → تحقق من `/api/health`
