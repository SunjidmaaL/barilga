# News API Setup Guide

## Хэрэгжүүлсэн өөрчлөлтүүд

### 1. API функцүүд (`lib/strapi.js`)

Дараах API функцүүдийг нэмсэн:

- `getNews()` - Бүх мэдээг авах
- `getNewsById(id)` - Тодорхой мэдээг ID-аар авах  
- `getFeaturedNews()` - Онцлох мэдээг авах

### 2. News хуудас (`app/news/page.tsx`)

- Static өгөгдлийн оронд API-аас өгөгдөл татах
- Loading state нэмсэн
- Error handling нэмсэн
- Suspense ашиглан performance сайжруулсан

### 3. NewsCard component (`components/NewsCard.tsx`)

- Зураг алдаа гарсан тохиолдолд fallback зураг харуулах
- Error handling сайжруулсан
- Hover эффект нэмсэн
- Text truncation нэмсэн

## Strapi Content Type Structure

Strapi дээр дараах бүтэцтэй `news` content type үүсгэх хэрэгтэй:

```json
{
  "title": "Text (required)",
  "description": "Text", 
  "excerpt": "Text",
  "content": "Rich Text",
  "publishedAt": "DateTime",
  "featured": "Boolean",
  "image": "Media (Single)"
}
```

## Environment Variables

`.env.local` файлд дараах тохиргоог нэмнэ үү:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Production-д:
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

## Strapi Permissions

Strapi Admin Panel дээр дараах зөвшөөрлүүдийг тохируулна уу:

### Public Role Permissions:
- **News**: find, findOne

## API Endpoints

### Get All News
```
GET /api/news?populate=*&sort=publishedAt:desc
```

### Get News by ID  
```
GET /api/news/{id}?populate=*
```

### Get Featured News
```
GET /api/news?populate=*&filters[featured][$eq]=true&sort=publishedAt:desc
```

## Features

### ✅ Хэрэгжүүлсэн
- API integration
- Loading states
- Error handling
- Image fallbacks
- Responsive design
- View counting (localStorage)
- Hover effects

### 🔄 Нэмэлт боломжууд
- Pagination
- Search functionality
- Categories/Tags
- Individual news pages
- Social sharing
- Comments system

## Ашиглах заавар

1. Strapi server ажиллуулна уу
2. News content type үүсгэнэ үү
3. Зарим мэдээ нэмнэ үү
4. Environment variable тохируулна уу
5. Next.js app ажиллуулна уу

```bash
npm run dev
```

## Troubleshooting

### API холболт алдаа
- NEXT_PUBLIC_STRAPI_URL зөв эсэхийг шалгана уу
- Strapi server ажиллаж байгаа эсэхийг шалгана уу
- CORS тохиргоог шалгана уу

### Зураг харагдахгүй байх
- Strapi-н media upload тохиргоог шалгана уу
- Image URL зөв эсэхийг шалгана уу
- Fallback зураг ажиллах ёстой

### Performance
- API responses кэш хийгдэж байна (revalidate: 60s)
- Featured news 5 минут кэш хийгдэнэ
- Loading states хэрэглэгчийн туршлагыг сайжруулна
