# Strapi Expert Team Images Setup

Энэ файл нь expert-team хуудасны зурагнуудыг Strapi-аас авч ирэхэд зориулсан тохиргооны зааварчилгаа юм.

## 1. Content Type үүсгэх

Strapi admin panel-д орж дараах алхамуудыг дагана уу:

### Content Type Builder-д орно:
1. Strapi admin panel-д нэвтрэн орно
2. `Content-Type Builder` цэсэнд орно
3. `Create new collection type` товчийг дарна

### Collection Type тохиргоо:
- **Display name**: `Expert Team Images`
- **API ID (singular)**: `expert-team-image`
- **API ID (plural)**: `expert-team-images`

## 2. Fields нэмэх

### 2.1 Image field:
- **Field type**: `Media`
- **Field name**: `image`
- **Required**: Yes
- **Multiple media**: No

### 2.2 Alt text field:
- **Field type**: `Text`
- **Field name**: `alt`
- **Required**: Yes
- **Default value**: `Expert Team Image`

### 2.3 Order field:
- **Field type**: `Number`
- **Field name**: `order`
- **Required**: Yes
- **Default value**: `1`
- **Integer**: Yes

### 2.4 Section field:
- **Field type**: `Text`
- **Field name**: `section`
- **Required**: Yes
- **Default value**: `process-control`
- **Enumeration values**: 
  - `process-control`
  - `team-members`
  - `services`

## 3. Permissions тохиргоо

### Public access:
1. `Settings` → `Users & Permissions Plugin` → `Roles` → `Public`
2. `Expert Team Images` → `find` permission-ийг идэвхжүүлнэ

## 4. Content нэмэх

### 3 зураг нэмэх:

#### Зураг 1 - Process Control:
- **Image**: Process control-тай холбоотой зураг
- **Alt**: "Процессийн хяналт"
- **Order**: 1
- **Section**: process-control

#### Зураг 2 - Team Members:
- **Image**: Team members-тай холбоотой зураг
- **Alt**: "Багийн бүрэлдэхүүн"
- **Order**: 2
- **Section**: team-members

#### Зураг 3 - Services:
- **Image**: Services-тай холбоотой зураг
- **Alt**: "Үйл ажиллагааны чиглэл"
- **Order**: 3
- **Section**: services

## 5. API Testing

API-г тест хийх:
```bash
curl http://localhost:1337/api/expert-team-images?populate=*
```

Хүлээгдэж буй хариу:
```json
{
  "data": [
    {
      "id": 1,
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
        "order": 1,
        "section": "process-control"
      }
    }
  ]
}
```

## 6. Environment Variables

`.env.local` файлд дараах хувьсагч нэмэх:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

## 7. Fallback Images

Хэрэв Strapi-аас зураг ирэхгүй бол дараах fallback зурагнууд ашиглагдана:
- Process Control: `/img/background1.jpg`
- Team Members: `/img/background.jpg`
- Services: `/img/background.jpg`

## 8. Troubleshooting

### API алдаа гарвал:
1. Strapi server ажиллаж байгаа эсэхийг шалгана
2. Content type зөв үүсгэгдсэн эсэхийг шалгана
3. Permissions зөв тохируулагдсан эсэхийг шалгана
4. Environment variables зөв тохируулагдсан эсэхийг шалгана

### Зураг харагдахгүй бол:
1. Fallback зурагнууд байгаа эсэхийг шалгана
2. Image URL зөв үүсгэгдсэн эсэхийг шалгана
3. Browser console-д алдаа байгаа эсэхийг шалгана
