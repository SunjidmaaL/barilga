# Strapi "Service Starting" Асуудлыг Шийдэх Зааварчилгаа

## Асуудал: Вэбсайт дээр Strapi мэдээлэл харагдахгүй, Strapi "Service Starting" гэж байнга харагдаж байна

## Шууд Шийдэл

### 1. Strapi Service Status Шалгах

Diagnostic script ажиллуулах:
```bash
node check-strapi-status.js
```

Энэ нь Strapi service-ийн status-ийг шалгаж, асуудлыг тодорхойлоход тусална.

### 2. Strapi Admin Panel Шалгах

Browser дээр дараах URL-уудыг шалгана уу:

1. **Admin Panel:** `https://effortless-luck-023aebe70f.strapiapp.com/admin`
   - Хэрэв "Service Starting" гэж харагдаж байвал:
     - 5-10 минут хүлээх (cold start)
     - Browser refresh хийх (Ctrl+F5)
     - Incognito mode дээр турших

2. **API Endpoint:** `https://effortless-luck-023aebe70f.strapiapp.com/api`
   - Хэрэв 200 OK буцаавал: Service ажиллаж байна
   - Хэрэв 503 Service Unavailable: Service эхлэж байна

### 3. Strapi Cloud Dashboard Шалгах

1. [Strapi Cloud Dashboard](https://cloud.strapi.io) руу нэвтрэх
2. Project сонгох
3. Service status шалгах
4. Хэрэв "Starting" эсвэл "Sleeping" байвал:
   - "Restart Service" товч дарах
   - 5-10 минут хүлээх

## Код дээрх Шийдлүүд

### 1. Retry Logic (Одоо байгаа)

Код дээр retry logic нэмэгдсэн:
- **Timeout:** 10 секунд → 30 секунд (cold start-д зориулж)
- **Retry:** 503 Service Unavailable эсвэл timeout бол 2 удаа retry хийх
- **Delay:** Retry хооронд 5 секунд завсар

### 2. Environment Variables Шалгах

`.env.local` файл үүсгэх (хэрэв байхгүй бол):
```bash
NEXT_PUBLIC_STRAPI_URL=https://effortless-luck-023aebe70f.strapiapp.com
STRAPI_API_TOKEN=your_token_here
DEBUG_STRAPI=true
```

Vercel дээр environment variables тохируулах:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Дараах variables нэмэх:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://effortless-luck-023aebe70f.strapiapp.com`
   - `STRAPI_API_TOKEN` = (хэрэв шаардлагатай бол)
   - `DEBUG_STRAPI` = `true` (debug хийхэд)
3. **Redeploy хийх** (чухал!)

## Түгээмэл Асуудлууд

### Асуудал 1: Strapi Free Tier Cold Start

**Тайлбар:** Strapi cloud free tier дээр service удаан эхэлдэг (5-10 минут)

**Шийдэл:**
- 5-10 минут хүлээх
- Diagnostic script ажиллуулах
- Paid plan upgrade хийх (хэрэв боломжтой бол)

### Асуудал 2: Service Sleep Mode

**Тайлбар:** Free tier дээр inactive байх үед sleep mode руу ордог

**Шийдэл:**
- Strapi dashboard дээр service "wake up" хийх
- Эхний request удаан байж болно

### Асуудал 3: Database Connection Issues

**Тайлбар:** Database connection алдаа гарч байж болно

**Шийдэл:**
- Strapi dashboard → Settings → Database шалгах
- Database connection string зөв эсэхийг шалгах

### Асуудал 4: Permissions Issues

**Тайлбар:** Public role-д find permissions идэвхжүүлээгүй байж болно

**Шийдэл:**
1. Strapi admin panel руу орох
2. Settings → Users & Permissions plugin → Roles → Public
3. Дараах content types-ууд дээр **find** permission идэвхжүүлэх:
   - `news2` - find
   - `trainings` - find
   - `contacts` - find
   - `contact-hrs` - find
   - `licenses` - find
   - `laws` - find
   - `slides` - find
   - `expert-teams` - find
   - `foreign-relations` - find
   - `training-ankets` - find

## Debug Хийх

### 1. Development Mode дээр Debug

```bash
# .env.local файлд
DEBUG_STRAPI=true
```

Одоо console дээр Strapi API calls-ийн дэлгэрэнгүй мэдээлэл харагдана.

### 2. Browser Console Шалгах

1. Browser дээр F12 дарах
2. Console tab нээх
3. Strapi-тай холбоотой алдаануудыг шалгах
4. Network tab дээр API request-уудыг шалгах

### 3. Vercel Logs Шалгах

1. Vercel Dashboard → Deployments
2. Сүүлийн deployment сонгох
3. Functions → Runtime Logs шалгах
4. `[Strapi]` гэсэн log-уудыг харах

## Шалгах Жагсаалт

- [ ] `check-strapi-status.js` script ажиллуулсан
- [ ] Strapi admin panel руу орох (`/admin`)
- [ ] API endpoint шалгах (`/api`)
- [ ] Browser console дээрх алдаанууд шалгах
- [ ] Network tab дээрх request-ууд шалгах
- [ ] Strapi dashboard дээр service status шалгах
- [ ] Service restart хийх (хэрэв шаардлагатай бол)
- [ ] 5-10 минут хүлээх
- [ ] Environment variables тохируулсан
- [ ] Permissions шалгах

## Хэрэв Асуудал Шийдэгдэхгүй Бол

1. **Strapi Support-д хандах:**
   - Strapi dashboard → Support
   - Error logs илгээх
   - Service status screenshot илгээх

2. **Alternative Solutions:**
   - Self-hosted Strapi instance ашиглах
   - Other CMS (Contentful, Sanity) ашиглах
   - Static data ашиглах (temporary)

3. **Upgrade Plan:**
   - Strapi Cloud paid plan ашиглах
   - Better performance болон reliability

## Холбоотой Файлууд

- `lib/strapi.js` - Strapi API functions (retry logic байна)
- `check-strapi-status.js` - Diagnostic script
- `VERCEL_DEPLOYMENT.md` - Deployment guide
- `STRAPI_API_OPTIMIZATION.md` - API optimization guide

## Тусламж

Асуудал гарвал:
1. `check-strapi-status.js` script ажиллуулах
2. Browser console logs харах
3. Network tab дээрх request-ууд шалгах
4. Strapi dashboard дээрх logs шалгах
5. Vercel logs шалгах (production дээр)
