# Strapi дээр Member News Content Type тохируулах заавар

## 1. Content Type үүсгэх

Strapi Admin дээр:

1. **Content-Type Builder** → **Create new collection type**
2. **Display name**: `Member News` (эсвэл `Гишүүн байгууллагуудын мэдээ`)
3. **API ID (singular)**: `member-news1` ⚠️ **Энэ нь яг `member-news1` байх ёстой!**
4. **API ID (plural)**: `member-news1` (автоматаар үүснэ)

## 2. Fields нэмэх

Дараах fields-уудыг нэмэх:

### Required Fields:

1. **title** (Text)
   - Type: Text
   - Required: ✅ Yes
   - Name: `title`

2. **description** (Text)
   - Type: Long text
   - Required: ❌ No
   - Name: `description`

3. **content** (Rich Text)
   - Type: Rich text (Strapi v4) эсвэл Text (Long text)
   - Required: ❌ No
   - Name: `content`

4. **image** (Media)
   - Type: Media
   - Required: ❌ No
   - Name: `image`
   - Allowed types: Images only

5. **publishedAt** (Date)
   - Type: Date
   - Required: ❌ No
   - Name: `publishedAt`

### Optional Fields:

6. **createdAt** (Date) - Автоматаар үүснэ
7. **updatedAt** (Date) - Автоматаар үүснэ

## 3. Permissions тохируулах

**Settings** → **Users & Permissions plugin** → **Roles** → **Public**:

1. `member-news1` content type олох
2. Дараах permissions-ийг идэвхжүүлэх:
   - ✅ **find** - Бүх мэдээг авах
   - ✅ **findOne** - Нэг мэдээг дэлгэрэнгүй харах

## 4. API Endpoint шалгах

Strapi дээр content type үүсгэсний дараа дараах endpoint-ууд ажиллах ёстой:

- `GET /api/member-news1` - Бүх мэдээ
- `GET /api/member-news1?populate=*` - Бүх мэдээ (populate-тай)
- `GET /api/member-news1/{id}` - Нэг мэдээ
- `GET /api/member-news1/{id}?populate=*` - Нэг мэдээ (populate-тай)

### Шалгах:

Browser эсвэл Postman дээр:
```
http://localhost:1337/api/member-news1
```

Хариу нь дараах байдлаар байх ёстой:
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

## 5. Анхаарах зүйлс

⚠️ **Content Type нэр**: 
- API ID нь яг `member-news1` байх ёстой
- Код дээр `member-news1` ашиглаж байгаа тул Strapi дээр ч мөн адил нэртэй байх ёстой

⚠️ **Permissions**:
- Public role дээр `member-news1` content type-д `find` болон `findOne` permissions заавал идэвхжүүлэх
- Эсвэл 403 Forbidden алдаа гарна

⚠️ **Field нэрүүд**:
- `title`, `description`, `content`, `image`, `publishedAt` гэсэн нэрүүдийг ашиглах
- Бусад нэр ашиглавал код дээр засах шаардлагатай

## 6. Туршилтын мэдээ нэмэх

Strapi Admin дээр:

1. **Content Manager** → **Member News** → **Create new entry**
2. Дараах мэдээлэл оруулах:
   - **title**: "Туршилтын мэдээ"
   - **description**: "Энэ бол туршилтын мэдээ юм"
   - **content**: "Дэлгэрэнгүй мэдээлэл..."
   - **image**: Зураг upload хийх (optional)
   - **publishedAt**: Огноо сонгох
3. **Save** → **Publish**

## 7. Next.js дээр шалгах

Next.js app дээр:

1. `/projects` хуудас руу орох
2. Туршилтын мэдээ харагдах ёстой
3. Мэдээ дээр дарахад `/projects/{id}` хуудас руу очих ёстой

## Алдаа засах

### 404 Not Found алдаа гарвал:

1. Content Type нэрийг шалгах (`member-news1` байх ёстой)
2. Permissions шалгах (Public role дээр `member-news1` дээр `find` идэвхтэй эсэх)
3. Strapi server restart хийх

### 403 Forbidden алдаа гарвал:

1. Settings → Users & Permissions → Roles → Public
2. `member-news1` дээр `find` болон `findOne` permissions идэвхжүүлэх

### Data null байвал:

1. Content Manager дээр мэдээ publish хийсэн эсэхийг шалгах
2. API endpoint шууд шалгах: `http://localhost:1337/api/member-news1`
