# Vercel Deployment Guide - Strapi Integration

## Асуудал: Strapi мэдээлэл орж ирэхгүй байна

Vercel дээр deploy хийсний дараа Strapi мэдээлэл орж ирэхгүй байвал дараах зүйлсийг шалгаарай:

## 1. Environment Variables тохируулах

Vercel dashboard дээр дараах environment variables нэмэх хэрэгтэй:

### Шаардлагатай Environment Variables:

1. **NEXT_PUBLIC_STRAPI_URL** (Client-side болон Server-side)
   - Утга: `https://effortless-luck-023aebe70f.strapiapp.com`
   - Тайлбар: Strapi API-ийн URL

2. **STRAPI_API_TOKEN** (Зөвхөн Server-side)
   - Утга: Strapi-аас авсан API Token
   - Тайлбар: Хэрэв Strapi дээр authentication шаардлагатай бол

### Vercel дээр тохируулах:

1. Vercel dashboard руу орох
2. Project сонгох
3. Settings → Environment Variables руу орох
4. Дараах variables нэмэх:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://effortless-luck-023aebe70f.strapiapp.com`
   - `STRAPI_API_TOKEN` = (Strapi-аас авсан token, хэрэв шаардлагатай бол)
   - `DEBUG_STRAPI` = `true` (Зөвхөн debug хийхэд, production дээр `false` эсвэл устгах)

**Чухал**: Environment variables нэмсний дараа **redeploy** хийх хэрэгтэй!

## 2. Strapi Permissions шалгах

Strapi admin panel дээр дараах permissions тохируулах:

1. Strapi admin panel руу орох: `https://effortless-luck-023aebe70f.strapiapp.com/admin`
2. Settings → Users & Permissions plugin → Roles → Public
3. Дараах content types-ууд дээр **find** болон **findOne** permissions идэвхжүүлэх:
   - `news2` - find, findOne
   - `trainings` - find, findOne
   - `contacts` - find
   - `contact-hrs` - find
   - `licenses` - find, findOne
   - `laws` - find, findOne
   - `slides` - find
   - `expert-teams` - find
   - `foreign-relations` - find
   - `training-ankets` - find
   - `member-news1` - find, findOne ⚠️ **Шинэ нэмэгдсэн**

## 3. CORS тохиргоо

Strapi дээр CORS тохиргоо хийх (хэрэв шаардлагатай бол):

Strapi `config/middlewares.js` файлд:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://effortless-luck-023aebe70f.strapiapp.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://effortless-luck-023aebe70f.strapiapp.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'], // Production дээр Vercel URL-аа нэмэх
      // origin: ['https://your-vercel-app.vercel.app'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 4. Build хугацаанд API дуудалт

Next.js build хугацаанд Strapi API-д хандах боломжтой эсэхийг шалгах:

1. Vercel build logs шалгах
2. Хэрэв build хугацаанд API дуудалт хийгдэж байгаа бол Strapi server online байх ёстой

## 5. Debug хийх

### Environment Variable Debug Mode идэвхжүүлэх:

1. Vercel dashboard → Settings → Environment Variables
2. `DEBUG_STRAPI` = `true` нэмэх
3. Redeploy хийх
4. Одоо server logs дээр Strapi API URL болон token тохируулагдсан эсэх харагдана

### Browser Console шалгах:

1. Vercel дээр deploy хийсэн сайт руу орох
2. Browser console (F12) нээх
3. Network tab шалгах - Strapi API дуудалтууд харагдаж байгаа эсэх
4. Console дээр алдааны мессеж байгаа эсэх
5. API response status code шалгах (200 OK эсэх)

### Vercel Function Logs шалгах:

1. Vercel dashboard → Deployments
2. Сүүлийн deployment сонгох
3. Functions → Runtime Logs шалгах
4. `[Strapi Config]` гэсэн log харагдах ёстой (хэрэв DEBUG_STRAPI=true байвал)

## 6. Түр зуурын шийдэл

Хэрэв environment variables тохируулаагүй бол, код дээр fallback байна:

```javascript
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://effortless-luck-023aebe70f.strapiapp.com';
```

Гэхдээ production дээр environment variable ашиглах нь илүү сайн.

## 7. Шалгах жагсаалт

- [ ] `NEXT_PUBLIC_STRAPI_URL` environment variable тохируулсан
- [ ] `STRAPI_API_TOKEN` environment variable тохируулсан (хэрэв шаардлагатай бол)
- [ ] Environment variables нэмсний дараа redeploy хийсэн
- [ ] Strapi дээр Public role-д find permissions идэвхжүүлсэн
- [ ] Strapi server online байна
- [ ] CORS тохиргоо зөв байна
- [ ] Browser console дээр алдаа байхгүй

## Тусламж

Хэрэв асуудал шийдэгдэхгүй бол:
1. Vercel build logs шалгах
2. Browser console дээрх алдаануудыг шалгах
3. Strapi server logs шалгах
4. Network tab дээр API response шалгах
