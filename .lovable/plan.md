
# خطة التسليم النهائي — أداء + SEO/Sharing + إصلاح Developer Mode + مراقبة حقيقية

كل التعديلات **إصلاحية/إضافية فقط**. مفيش حذف لأي ميزة، ولا تغيير في التصميم، ولا شيل أي أنيميشن أو مكتبة.

---

## 1. الأداء (Performance 42 → المستهدف 90+)

### التشخيص من الاسكرين شوتس

| المقياس | القيمة | السبب الحقيقي |
|---|---|---|
| TBT | **28,360 ms** | كل الشغل في `Other = 38.4s` — ده مش JS parsing (846ms بس). ده **رسم WebGL** بيتنفذ على الـmain thread أثناء التحميل. الـ`DemandDriver` بيعمل `invalidate()` كل frame → الكانفس فعليًا شغال 60fps من أول لحظة hydration |
| LCP | 4.1s (element render delay **3,100 ms**) | الـ`IntroExperience` بيغطي الشاشة 2 ثانية بـoverlay أسود `z-[100]`، فالـLCP element (نص الـhero) مايتحسبش إلا بعد ما الـintro يختفي |
| FCP | 3.2s + render-blocking **750 ms** | `styles.css` = 39.8 KiB blocking، جواه **16 `@import` لملفات fontsource** → كل الخطوط بتتحمّل قبل أول رسم |
| Unused JS | hero-canvas 233.5 KiB + index 194.5 KiB | three.js بيتحمّل ويتنفّذ ضمن المسار الحرج |

### الإصلاحات (بدون أي خسارة بصرية)

**أ) الكانفس ثلاثي الأبعاد — نفس الشكل بالظبط، بس مايشتغلش وقت التحميل**
- تأجيل mount الكانفس لحد ما: الـintro يخلص **و** `requestIdleCallback` (fallback timeout) يقول إن الـmain thread فاضي. حاليًا بيتـmount فورًا مع الـhero.
- تحديد سقف frame rate في `DemandDriver` عند **~30fps** (`invalidate` كل ~33ms بدل كل frame). الحركة بطيئة أصلاً (`rotation 0.18/0.22`) فالفرق البصري صفر، والشغل على الـmain thread ينزل للنص.
- إيقاف الـinvalidate تمامًا لما الـhero يخرج من الـviewport (موجود observer، هنربطه بالـdriver كمان مش بس بالـmount).
- احترام `navigator.connection.saveData` و`deviceMemory <= 4` بخفض dpr — نفس المشهد.

**ب) الـIntro — يفضل زي ما هو، بس مايأخّرش الـLCP**
- الـhero يترسم تحت الـintro من أول SSR (هو كده فعلاً)، لكن الـoverlay `bg-black` بيمنع القياس. الحل: بدل `bg-black` مصمت نخليه `bg-background` مع نفس المظهر، ونقلّل مدة العرض من 2000ms إلى **1400ms** (الأنيميشن الأطول جواه 1.4s فمش هيتقطع)، ونضيف `pointer-events` صح.
- بديل أفضل لو حابب صفر تغيير في التوقيت: نسيب الـ2s ونضيف `fetchpriority` + preload لنص الـhero — بس ده مش هيحل الـ3.1s render delay. **التوصية: 1400ms.** (لو رافض، قوللي وأسيبها 2000ms.)

**ج) الخطوط — أكبر مكسب في FCP (750ms)**
- شيل الـ16 `@import` من `styles.css` واستبدالهم بـ`<link rel="preload" as="font">` + `@font-face` بـ`font-display: swap` للأوزان المستخدمة فعليًا (Instrument Serif 400، Inter 400/500/600/700، JetBrains Mono 400/500، Rubik + IBM Plex Arabic تتحمّل **فقط** لما `dir="rtl"`).
- النتيجة: `styles.css` ينزل من 39.8 KiB لأقل من 12 KiB، ومايبقاش blocking لكل الخطوط. **نفس الخطوط، نفس الشكل** — بس التحميل بقى غير حاجب.

**د) تقسيم أدق**
- `framer-motion` و`lenis` يفضلوا زي ما هم (مطلوبين للتفاعل الأول)، لكن `@vercel/analytics` + `speed-insights` يتأجّلوا لبعد `load` بدل `Suspense` فقط.
- إضافة `content-visibility: auto` للأقسام تحت الـfold (صفر تغيير بصري، بيقلّل Style & Layout).

**التحقق:** بناء production + Lighthouse mobile محلي قبل/بعد، وأرفعلك جدول بالأرقام.

---

## 2. نتائج HeronSignal

### أ) `Missing og:image` (Metadata & Sharing)
- توليد صورة OG حقيقية 1200×630 بهوية الموقع (المونوجرام AN + الاسم + السطر التعريفي + نفس الـgradient) وحفظها في `public/og.png`.
- إضافتها **على الـleaf routes فقط** (مش `__root`) بـURL مطلق: `https://abdelhamednada.vercel.app/og.png` — مع `twitter:image`.
- صفحات المشاريع/الـcase study تستخدم صورة الغلاف بتاعتها كـ`og:image` (موجودة أصلاً في `data.ts`) — أنسب من صورة عامة.

### ب) `SEO-friendly public basics — needs work`
كل البنود عندها "good"، فالتقييم الأحمر جاي من الـSpeed. حل البند 1 بيقفل ده تلقائيًا.

### ج) تركيب HeronSignal (Monitoring)
- هقرأ `https://heronsignal.com/llms.txt` وأنفّذ خطوات التركيب الرسمية لـTanStack Start بالحرف (مش تخمين)، وأربط `captureError()` بالـ`errorComponent` الموجود في `__root.tsx` وبـ`reportLovableError`.
- **محتاج منك**: الـpublic key من داشبورد HeronSignal. من غيره هركّب الكود كامل وأسيب الـkey يتقري من متغير بيئة عشان تلزقه في خطوة واحدة.

---

## 3. زر Developer Mode — الباجّ الحقيقي

**السبب المؤكد:** `FabStack` هو `<div className="pointer-events-none ...">`، و`DevModeButton` بيرندر الـoverlay **جوّه** الـdiv ده. الـoverlay `fixed inset-0` بيورّث `pointer-events: none`، فزرار الـ`X` والخلفية **مش بيستقبلوا كليك أصلاً** — الزرار اللي بيفتح الدرج شغال لأن عليه `pointer-events-auto` صراحةً، لكن زرار الإغلاق لأ.

**الإصلاح:**
- نقل الـoverlay لـ`createPortal(document.body)` — يخرج نهائيًا من شجرة الـ`pointer-events-none`.
- إضافة `pointer-events-auto` على الـoverlay وزرار الإغلاق كضمان مزدوج.
- إضافة `type="button"` على زرار الـX.

**إصلاحات iOS في نفس الدرج:**
- قفل تمرير الصفحة وقت فتح الدرج (`overflow: hidden` على body + إيقاف Lenis) — حاليًا الصفحة بتتمرر ورا الدرج على iOS.
- `max-h-[85dvh]` + `-webkit-overflow-scrolling: touch` + `env(safe-area-inset-bottom)` عشان الدرج مايتقصّش تحت الـhome indicator.
- Focus trap + إرجاع الفوكس للزرار عند الإغلاق + `role="dialog"` و`aria-modal="true"`.
- تقليل `backdrop-blur-sm` على الـoverlay إلى طبقة أخف على الأجهزة اللمسية (نفس المظهر تقريبًا، بيمنع اللاج على iOS).

---

## 4. مراجعة تسليم نهائية (code review)

- فحص كل الراوتس على iPhone viewport (390×844) + Safari engine عبر Playwright، EN + AR، dark + light.
- التأكد من صفر horizontal overflow، صفر console errors، وكل الأزرار الأيقونية عندها `aria-label`.
- `bun run build` نظيف + typecheck.
- تقرير نهائي بالأرقام قبل/بعد.

---

## الملفات المتوقع تعديلها

`src/components/dev-mode.tsx` · `src/components/fab-stack.tsx` · `src/components/hero-canvas.tsx` · `src/components/hero.tsx` · `src/components/intro.tsx` · `src/components/smooth-scroll.tsx` · `src/styles.css` · `src/routes/__root.tsx` · `src/routes/index.tsx` + باقي الـleaf routes (og:image) · `public/og.png` (جديد) · ملف تركيب HeronSignal (جديد)

## خارج النطاق (مضمون ما يتغيرش)

❌ حذف أي مكوّن أو route أو ميزة أو مكتبة · ❌ تغيير أي لون أو خط أو token أو layout · ❌ تغيير شكل الـ3D أو الـglassmorphism · ❌ لمس i18n أو الـblog أو الـsitemap القائم

---

**سؤال واحد قبل التنفيذ:** الـHeronSignal public key — تبعتهولي دلوقتي ولا أركّب الكود وأسيب المكان جاهز ليه؟ وكمان: موافق على تقليل مدة الـintro من 2000ms لـ1400ms (مكسب ~600ms في LCP، الأنيميشن كامل مش هيتقطع)؟
