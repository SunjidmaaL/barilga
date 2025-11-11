# Strapi API Calls Optimization Guide

## Асуудал: API Calls хэт их өсөж байна

Vercel free хувилбар дээр Strapi API calls хэт их өсөж байгаа асуудлыг шийдэх зааварчилгаа.

## Хийсэн өөрчлөлтүүд

### 1. Cache хугацааг уртасгасан

**Өмнө:**
- FREQUENT: 2 цаг (7200 секунд)
- MODERATE: 4 цаг (14400 секунд)
- RARE: 24 цаг (86400 секунд)

**Одоо:**
- FREQUENT: 24 цаг (86400 секунд) - Мэдээ, Сургалт
- MODERATE: 48 цаг (172800 секунд) - Хууль, Лиценз, Гадаад харилцаа
- RARE: 7 хоног (604800 секунд) - Холбоо барих, Слайд, Мэргэжилтэн баг

**Үр дүн:** API calls 12-84 дахин багасна!

### 2. Revalidation тохиргоо

Next.js ISR (Incremental Static Regeneration) ашиглаж байна. Энэ нь:
- Эхлээд cache-лэгдсэн мэдээллийг харуулна
- Cache хугацаа дуусахад background дээр дахин татана
- Хэрэглэгч cache-лэгдсэн мэдээллийг хараад байна

## API Calls өсөх шалтгаанууд

### 1. Build хугацаанд API дуудалт
- Vercel build хийхэд бүх page-үүд render хийгдэнэ
- Server-side rendering-ийн үед API дуудалт хийгдэнэ
- **Шийдэл:** Cache хугацааг уртасгасан

### 2. Crawler/Bot хандалт
- Google, Bing зэрэг search engine crawler-ууд
- Social media bot-ууд (Facebook, Twitter)
- SEO tool-ууд
- **Шийдэл:** Cache хугацааг уртасгасан, crawler-ууд cache-лэгдсэн мэдээллийг харах болно

### 3. Revalidation
- Cache хугацаа дуусахад дахин татана
- **Шийдэл:** Cache хугацааг уртасгасан

### 4. Development mode
- Development дээр cache байхгүй
- **Шийдэл:** Зөвхөн production дээр cache ашиглана

## API Calls хэмжүүлэх

### Vercel Dashboard дээр:
1. Project → Analytics
2. API Calls харах
3. Хугацааны график шалгах

### Strapi Dashboard дээр:
1. Strapi admin panel
2. Settings → Monitoring (хэрэв байвал)
3. API usage харах

## Цаашид хийх зүйлс

### 1. Manual Revalidation
Хэрэв мэдээ шинэчлэх шаардлагатай бол:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { path, secret } = await request.json()
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  revalidatePath(path)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

### 2. On-Demand Revalidation
Strapi webhook ашиглах:
- Strapi дээр content шинэчлэгдэхэд webhook илгээх
- Next.js API route-д хүлээн авч revalidate хийх

### 3. Static Generation
Илүү их cache хийх:
- `generateStaticParams` ашиглах
- Build хугацаанд бүх page-үүдийг static generate хийх

## Cache хугацааг тохируулах

`lib/strapi.js` файлд:

```javascript
const CACHE_SETTINGS = {
  FREQUENT: 86400,   // 24 цаг
  MODERATE: 172800,  // 48 цаг
  RARE: 604800,      // 7 хоног
};
```

Хэрэв илүү их cache хийх шаардлагатай бол:
- FREQUENT: 172800 (48 цаг)
- MODERATE: 604800 (7 хоног)
- RARE: 2592000 (30 хоног)

**Анхаар:** Cache хугацааг уртасгах нь мэдээлэл хуучин болох магадлалыг нэмэгдүүлнэ.

## Environment Variables

Production дээр cache идэвхтэй байхын тулд:

```bash
NODE_ENV=production
```

Development дээр cache байхгүй (мэдээлэл шууд татагдана).

## Шалгах

1. **Vercel Build Logs:**
   - Deployments → Build Logs
   - API дуудалтууд харагдах ёстой

2. **Browser Network Tab:**
   - F12 → Network
   - Strapi API дуудалтууд харагдах ёстой
   - Cache hit/miss харагдах ёстой

3. **Vercel Analytics:**
   - Project → Analytics
   - API Calls график шалгах

## Түгээмэл асуудлууд

### Q: Мэдээ шинэчлэгдсэн ч сайт дээр харагдахгүй байна
**A:** Cache хугацаа дуусах хүртэл хүлээх эсвэл manual revalidation хийх

### Q: API calls хэт их байна
**A:** Cache хугацааг уртасгах эсвэл static generation ашиглах

### Q: Development дээр мэдээлэл шинэчлэгдэхгүй байна
**A:** Development дээр cache байхгүй, мэдээлэл шууд татагдана. Хэрэв асуудал байвал browser cache цэвэрлэх

## Дэмжлэг

Асуудал гарвал:
1. Vercel build logs шалгах
2. Browser console шалгах
3. Network tab шалгах
4. Cache тохиргоо шалгах
