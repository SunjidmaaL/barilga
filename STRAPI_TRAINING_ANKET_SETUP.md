# Strapi Training Anket Setup Guide

## Overview
This guide explains how to set up the training anket content type in Strapi to provide downloadable anket forms.

## Setup Steps

### 1. Create the Content Type

1. Go to your Strapi admin panel: `http://localhost:1337/admin`
2. Navigate to **Content-Type Builder**
3. Click **Create new collection type**
4. Enter the display name: **Training Anket**
5. Click **Continue**

### 2. Add Fields

Add the following fields to your "Training Anket" content type:

#### Field 1: Title (Text - Short text)
- API name: `title`
- Type: Text → Short text
- Required: Yes

#### Field 2: Anket File (Media)
- API name: `anket`
- Type: Media → Single media
- Type of media: Files

**OR**

#### Alternative Field: File (Media)
- API name: `file`
- Type: Media → Single media
- Type of media: Files

**OR**

#### Another Alternative: Form (Media)
- API name: `form`
- Type: Media → Single media
- Type of media: Files

### 3. Set Permissions

1. Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Find **Training Anket** in the list
3. Check the **find** and **findOne** permissions
4. Save

### 4. Add Content

1. Go to **Content Manager** → **Training Anket**
2. Click **Create new entry**
3. Fill in the title (e.g., "Training Application Form")
4. Upload your PDF/document file
5. Click **Save**
6. Click **Publish**

## API Endpoint

After setup, the endpoint will be:
```
GET http://localhost:1337/api/training-ankets?populate=*
```

The response structure will be:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Training Application Form",
        "anket": {
          "data": {
            "url": "/uploads/training_anket_abc123.pdf",
            "attributes": {
              "url": "/uploads/training_anket_abc123.pdf",
              "name": "training_anket_abc123.pdf",
              "mime": "application/pdf"
            }
          }
        }
      }
    }
  ]
}
```

## Code Implementation

The code is already implemented in:
- `lib/strapi.js` - `getTrainingAnkets()` function
- `app/training/page.tsx` - `TrainingAnketContent` component

The code will automatically:
1. Fetch the latest anket from Strapi
2. Extract the file URL
3. Display a download button with the anket file
4. Show a placeholder button with `#` if no data exists (prevents errors)

## Testing

1. Make sure your Strapi server is running: `http://localhost:1337`
2. Go to the training page: `http://localhost:3000/training`
3. Scroll to the "Сургалтын анкет" section
4. You should see the download button with your uploaded file

## Troubleshooting

### Button doesn't work / shows `#`
- Check that you've created the content type in Strapi
- Verify you've set the permissions to public
- Make sure you've published the anket entry
- Check the browser console for any error messages

### 403 Forbidden Error
- Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
- Enable **find** and **findOne** permissions for Training Anket
- Save and refresh your page

### File not downloading
- Verify the file uploaded correctly in Strapi
- Check that the file field name matches: `anket`, `file`, or `form`
- Test the API directly: `http://localhost:1337/api/training-ankets?populate=*`

## Notes

- The code supports multiple field names: `anket`, `file`, or `form`
- Only the first anket entry is used
- The anket is cached for 5 minutes (300 seconds)
- The button always displays to prevent layout issues
