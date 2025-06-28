# IMM Media - Creative Media Production House

A modern, bilingual (English/Chinese) website for IMM Media, a Hong Kong-based creative media production company specializing in TV commercials, KOL content, and digital media solutions.

## 🚀 Features

- **Bilingual Support**: Full English and Chinese localization
- **Modern Design**: Responsive design with Tailwind CSS
- **AI Integration**: AI-powered storyboard generator
- **Professional Portfolio**: Showcase of creative work
- **Contact Forms**: Lead generation and client communication
- **SEO Optimized**: Proper metadata and structured content

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
web_IMM/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized routes
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   ├── services/       # Services page
│   │   │   ├── portfolio/      # Portfolio page
│   │   │   └── ai-generator/   # AI tool page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   └── Footer.tsx      # Site footer
│   │   └── LanguageSwitcher.tsx # Language toggle
│   ├── i18n/
│   │   └── request.ts          # i18n configuration
│   └── lib/
│       ├── ai.ts               # AI integration
│       ├── types.ts            # TypeScript types
│       └── utils.ts            # Utility functions
├── messages/
│   ├── en.json                 # English translations
│   └── zh.json                 # Chinese translations
├── public/                     # Static assets
└── middleware.ts               # i18n middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web_IMM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - English: http://localhost:3000/en
   - Chinese: http://localhost:3000/zh

## 🌐 Internationalization

The website supports English and Chinese languages with automatic locale detection and URL-based routing.

### Adding New Translations

1. Add new keys to `messages/en.json`
2. Add corresponding translations to `messages/zh.json`
3. Use the translation hook in your components:

```typescript
import { getTranslations } from 'next-intl/server';

const t = await getTranslations({ locale, namespace: 'hero' });
```

## 🎨 Customization

### Colors and Styling

- Edit `tailwind.config.ts` for theme customization
- Modify `src/app/globals.css` for global styles
- Component-specific styles use Tailwind utility classes

### Content Management

- Update translation files in `messages/` for text content
- Modify page components in `src/app/[locale]/` for layout changes
- Update navigation in `src/components/layout/Header.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Start production server: `npm run start`

## 📄 License

This project is private and proprietary to IMM Media.

## 🤝 Contributing

For internal development:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: hello@immmedia.hk
- Phone: +852 1234 5678

---

Built with ❤️ by IMM Media Team
