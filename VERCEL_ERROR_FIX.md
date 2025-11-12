# Vercel Error Засах Зааварчилгаа

## Зассан Алдаанууд

### 1. Function нэр давхцаж байсан алдаа

**Асуудал:**
- `fetchWithRetry` function 2 удаа тодорхойлогдож байсан
- Эхний function нь `fetchWithTimeout` байх ёстой байсан

**Зассан:**
- 40-р мөрөнд байгаа function-ийг `fetchWithTimeout` болгосон
- Одоо зөв ажиллана

### 2. Recursion алдаа

**Асуудал:**
- `fetchWithRetry` function дотор `fetchWithRetry` дуудаж байсан (хязгааргүй recursion)

**Зассан:**
- `fetchWithRetry` дотор `fetchWithTimeout` дуудах болгосон

## Vercel дээр Build хийхэд

### 1. Environment Variables Шалгах

Vercel Dashboard → Settings → Environment Variables дээр:

```
NEXT_PUBLIC_STRAPI_URL=https://effortless-luck-023aebe70f.strapiapp.com
STRAPI_API_TOKEN=your_token_here (хэрэв шаардлагатай бол)
```

### 2. Build Logs Шалгах

Vercel Dashboard → Deployments → Build Logs дээр:
- Build алдаа байгаа эсэхийг шалгах
- TypeScript алдаа байгаа эсэхийг шалгах

### 3. Runtime Logs Шалгах

Vercel Dashboard → Deployments → Functions → Runtime Logs дээр:
- Runtime алдаа байгаа эсэхийг шалгах
- `[Strapi]` гэсэн log-уудыг харах

## Хэрэв Асуудал Шийдэгдэхгүй Бол

1. **Local дээр build хийх:**
   ```bash
   npm run build
   ```
   - Хэрэв local дээр build хийгдэж байвал Vercel дээр ч хийгдэнэ

2. **TypeScript алдаа шалгах:**
   ```bash
   npm run lint
   ```

3. **Vercel CLI ашиглах:**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

## Одоогийн Тохиргоо

- ✅ `fetchWithTimeout` - timeout-тэй fetch
- ✅ `fetchWithRetry` - retry логик бүхий fetch
- ✅ Timeout: 30 секунд
- ✅ Retry: 2 удаа (нийт 3 удаа оролдоно)
- ✅ Retry delay: 5 секунд

## Шалгах Жагсаалт

- [ ] Local дээр `npm run build` ажиллаж байна
- [ ] `npm run lint` алдаагүй
- [ ] Environment variables тохируулсан
- [ ] Vercel build logs шалгасан
- [ ] Runtime logs шалгасан
