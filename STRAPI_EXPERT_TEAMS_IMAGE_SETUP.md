# Strapi Expert Teams Image Setup

Энэ файл нь одоо байгаа `expert-teams` content type-д зурагны field нэмэх зааварчилгаа юм.

## 1. Expert Teams Content Type-д Image Field нэмэх

Strapi admin panel-д орж дараах алхамуудыг дагана уу:

### Content Type Builder-д орно:
1. Strapi admin panel-д нэвтрэн орно
2. `Content-Type Builder` цэсэнд орно
3. `Collection Types` → `Expert Teams`-г олж дарна

### Image Field нэмэх:
1. `Add another field` товчийг дарна
2. **Field type**: `Media` сонгоно
3. **Field name**: `image` гэж бичнэ
4. **Required**: Yes (идэвхжүүлнэ)
5. **Multiple media**: No (идэвхжүүлэхгүй)
6. `Finish` товчийг дарна

### Alt Text Field нэмэх:
1. `Add another field` товчийг дахин дарна
2. **Field type**: `Text` сонгоно
3. **Field name**: `alt` гэж бичнэ
4. **Required**: Yes (идэвхжүүлнэ)
5. **Default value**: `Expert Team Image` гэж бичнэ
6. `Finish` товчийг дарна

### Section Field нэмэх:
1. `Add another field` товчийг дахин дарна
2. **Field type**: `Text` сонгоно
3. **Field name**: `section` гэж бичнэ
4. **Required**: Yes (идэвхжүүлнэ)
5. **Default value**: `process-control` гэж бичнэ
6. `Finish` товчийг дарна

## 2. Permissions тохиргоо

### Public access:
1. `Settings` → `Users & Permissions Plugin` → `Roles` → `Public`
2. `Expert Teams` → `find` permission-ийг идэвхжүүлнэ

## 3. Content шинэчлэх

Одоо байгаа 3 expert team record-д зурагны мэдээлэл нэмэх:

### Record 1 (ID: 7):
1. `Content Manager` → `Collection Types` → `Expert Teams`-д орно
2. Эхний record-г нээнэ
3. **Image**: Process control-тай холбоотой зураг upload хийх
4. **Alt**: "Процессийн хяналт" гэж бичнэ
5. **Section**: "process-control" гэж бичнэ
6. `Save` товчийг дарна

### Record 2 (ID: 9):
1. Хоёр дахь record-г нээнэ
2. **Image**: Team members-тай холбоотой зураг upload хийх
3. **Alt**: "Багийн бүрэлдэхүүн" гэж бичнэ
4. **Section**: "team-members" гэж бичнэ
5. `Save` товчийг дарна

### Record 3 (ID: 10):
1. Гурав дахь record-г нээнэ
2. **Image**: Services-тай холбоотой зураг upload хийх
3. **Alt**: "Үйл ажиллагааны чиглэл" гэж бичнэ
4. **Section**: "services" гэж бичнэ
5. `Save` товчийг дарна

## 4. API Testing

API-г тест хийх:
```bash
curl "http://localhost:1337/api/expert-teams?populate=*"
```

Хүлээгдэж буй хариу:
```json
{
  "data": [
    {
      "id": 7,
      "attributes": {
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/expert_team_1.jpg"
            }
          }
        },
        "alt": "Процессийн хяналт",
        "section": "process-control",
        "order": "0"
      }
    }
  ]
}
```

## 5. Code Update

Expert team page нь автоматаар шинэ API-г ашиглах болно:

```typescript
// lib/strapi.js-д нэмэгдсэн
export async function getExpertTeams() {
  // expert-teams API-г ашиглах
}

// app/expert-team/page.tsx-д шинэчлэгдсэн
const imagesData = await getExpertTeams()
```

## 6. Fallback System

Хэрэв `expert-teams`-д зураг байхгүй бол:
1. `expert-team-images` API-г оролдоно
2. Хэрэв тэр ч байхгүй бол fallback зурагнууд ашиглагдана

## 7. Troubleshooting

### API алдаа гарвал:
1. Strapi server ажиллаж байгаа эсэхийг шалгана
2. Image field зөв нэмэгдсэн эсэхийг шалгана
3. Permissions зөв тохируулагдсан эсэхийг шалгана
4. Content-д зураг upload хийгдсэн эсэхийг шалгана

### Зураг харагдахгүй бол:
1. Fallback зурагнууд байгаа эсэхийг шалгана
2. Image URL зөв үүсгэгдсэн эсэхийг шалгана
3. Browser console-д алдаа байгаа эсэхийг шалгана

## 8. Benefits

### Одоогийн системийн давуу тал:
- **Existing data**: Одоо байгаа expert-teams data-г ашиглах
- **No migration**: Шинэ content type үүсгэх шаардлагагүй
- **Consistent API**: Бусад content type-тай ижил хэв маяг
- **Fallback support**: Хоёр API-г дэмжих
