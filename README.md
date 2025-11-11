# Барилгын Нийлүүлэлт ХХК - Next.js Website

This is a Next.js 14 project converted from the static HTML website for a construction company.

## Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Interactive Components**: 
  - Swiper hero slider with autoplay
  - Animated statistics counters
  - News view tracking with localStorage
  - Facebook Messenger chat integration
- **SEO Optimized**: Proper meta tags and semantic HTML
- **TypeScript**: Full type safety throughout the application

## Pages

- **Home** (`/`): Hero slider, featured projects, statistics, news, training announcements
- **Activities** (`/activities`): Company services overview
- **News** (`/news`): News articles with view tracking
- **Training** (`/training`): Training sessions and registration
- **Law** (`/law`): Legal documents and regulations
- **Licenses** (`/licenses`): Company permits and licenses table
- **Contact** (`/contact`): Contact information and form

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Slider**: Swiper.js
- **Icons**: Icons8
- **Images**: Unsplash (placeholder images)

## Getting Started

1. **Install dependencies**:
   ```bash
   cd nextjs-project
   npm install
   ```

2. **Add your background image**:
   - Replace `public/img/background.jpg` with your actual background image

3. **Configure Facebook Messenger**:
   - Update `YOUR_PAGE_ID` in `components/FacebookChat.tsx` with your Facebook Page ID

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nextjs-project/
├── app/
│   ├── activities/page.tsx
│   ├── contact/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── law/page.tsx
│   ├── licenses/page.tsx
│   ├── news/page.tsx
│   ├── page.tsx (home)
│   └── training/page.tsx
├── components/
│   ├── FacebookChat.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSlider.tsx
│   └── NewsCard.tsx
├── public/
│   └── img/
│       └── background.jpg
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Customization

### Colors and Styling
- Edit `tailwind.config.js` to customize the color scheme
- Modify `app/globals.css` for custom styles

### Content
- Update page content in respective `app/*/page.tsx` files
- Modify component props in `components/*.tsx` files

### Facebook Integration
- Replace `YOUR_PAGE_ID` in `components/FacebookChat.tsx`
- Customize chat appearance in the component

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. **Environment Variables тохируулах** (Чухал!):
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_STRAPI_URL` = `https://effortless-luck-023aebe70f.strapiapp.com`
   - `STRAPI_API_TOKEN` = (Strapi API token, хэрэв шаардлагатай бол)
4. Redeploy хийх
5. Strapi дээр Public role-д find permissions идэвхжүүлэх

**Дэлгэрэнгүй**: 
- `VERCEL_DEPLOYMENT.md` - Vercel deployment зааварчилгаа
- `STRAPI_API_OPTIMIZATION.md` - API calls багасгах зааварчилгаа

### API Calls Optimization

Strapi API calls багасгахын тулд cache хугацааг уртасгасан:
- Мэдээ, Сургалт: 24 цаг cache
- Хууль, Лиценз: 48 цаг cache
- Холбоо барих, Слайд: 7 хоног cache

**Дэлгэрэнгүй**: `STRAPI_API_OPTIMIZATION.md` файлыг үзнэ үү

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting platform
3. Environment variables тохируулах

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Барилгын Нийлүүлэлт ХХК. All rights reserved.
