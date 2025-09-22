<div align="center">
  <img src="public/logo-pitchplease.png" alt="Pitch, Please! Logo" width="200">
  <h1>Pitch, Please!</h1>
  <p><strong>AI-Powered Pitch Deck Assistant</strong></p>
</div>

<p align="center">
  Transform your basic pitch deck into compelling, AI-enhanced video presentations with automated narration, visual enhancements, and professional polish.
</p>

<p align="center">
  <a href="#what-it-does"><strong>What It Does</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#technology-stack"><strong>Tech Stack</strong></a> ·
  <a href="#how-it-works"><strong>How It Works</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a>
</p>

---

## What It Does

**Pitch, Please!** is an AI-powered platform that transforms your basic pitch deck PDFs into compelling video presentations. Simply upload your pitch deck, and our AI pipeline will:

- **Extract and analyze** your slides and content
- **Generate AI narration** with natural-sounding voice synthesis
- **Create visual enhancements** and animations
- **Compile everything** into a professional video presentation

Perfect for entrepreneurs, startups, and businesses looking to create engaging pitch videos for investors, clients, or stakeholders.

### Screenshots

**Main Interface - Upload Your Pitch Deck**
![Pitch Please Homepage](https://github.com/user-attachments/assets/44022686-be4f-4e02-be50-eac2162333cd)

**AI Processing Pipeline in Action**
![Processing Pipeline](https://github.com/user-attachments/assets/70bc420f-d332-4a71-8932-675c252dc997)

## How It Works

Pitch, Please! uses a sophisticated AI processing pipeline to transform your static pitch deck into an engaging video:

### 1. **File Upload & Processing** 📄
- Upload your PDF pitch deck (up to 10MB)
- Secure file storage and initial processing
- Content extraction and analysis

### 2. **AI Narration Generation** 🎙️
- Powered by **Sievedata.com** and **VEED.io**
- Creates natural-sounding voice narration
- Talking avatar generation for presentations

### 3. **Visual Enhancement** 🎨
- **fal.ai** integration for visual improvements
- Automatic slide animations and transitions
- Professional visual polish and effects

### 4. **Voice Synthesis** 🔊
- **ElevenLabs.io** for high-quality voice generation
- Multiple voice options and styles
- Synchronized audio with visual content

### 5. **Final Compilation** 🎬
- Complete video rendering and compilation
- Professional output ready for sharing
- Multiple format options available


## Technology Stack

Pitch, Please! is built with cutting-edge technologies to deliver a seamless AI-powered experience:

### Core Framework
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions
  - Turbopack for ultra-fast development builds

### AI & Machine Learning
- **[AI SDK](https://sdk.vercel.ai/docs)** - Unified API for AI integrations
  - Supports xAI (Grok), OpenAI, and other LLM providers
  - Streaming AI responses and tool calls
  - Multi-modal AI capabilities

### AI Service Integrations
- **[ElevenLabs.io](https://elevenlabs.io)** - Premium voice synthesis
- **[fal.ai](https://fal.ai)** - AI-powered visual generation
- **[Sievedata.com](https://sievedata.com)** - Video AI processing
- **[VEED.io](https://veed.io)** - Video editing and enhancement

### Frontend & UI
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible components
- **[Framer Motion](https://framer.com/motion)** - Smooth animations
- **[Radix UI](https://radix-ui.com)** - Accessible component primitives

### Backend & Database
- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Serverless PostgreSQL
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe database queries
- **[Supabase](https://supabase.com)** - Backend-as-a-Service
- **[Vercel Blob](https://vercel.com/storage/blob)** - File storage

### Authentication & Security
- **[NextAuth.js](https://authjs.dev)** - Secure authentication
- **[GitHub OAuth](https://github.com)** - Social authentication
- **[Google OAuth](https://google.com)** - Social authentication
- Guest user support for demo access

### Development & Deployment
- **[TypeScript](https://typescriptlang.org)** - Type-safe development
- **[Biome](https://biomejs.dev)** - Fast linter and formatter
- **[Playwright](https://playwright.dev)** - End-to-end testing
- **[Vercel](https://vercel.com)** - Seamless deployment and hosting

## Features

### 🚀 **AI-Powered Video Generation**
- Transform static PDF pitch decks into dynamic video presentations
- Automated content analysis and script generation
- Professional narration with multiple voice options

### 🎭 **Talking Avatar Creation**
- AI-generated talking avatars for presentations
- Synchronized lip-sync with narration
- Professional presenter appearance

### 🎨 **Visual Enhancement**
- Automatic slide animations and transitions
- AI-powered visual improvements
- Professional design polish

### 🔊 **Premium Voice Synthesis**
- High-quality AI voice generation
- Multiple voice styles and languages
- Natural-sounding speech patterns

### 📱 **Modern Web Interface**
- Responsive design for all devices
- Real-time processing status updates
- Intuitive drag-and-drop file upload

### 🔐 **Secure & Private**
- Secure file upload and processing
- User authentication and session management
- Privacy-focused data handling

### ⚡ **Fast Processing**
- Optimized AI pipeline for quick results
- Real-time progress tracking
- Efficient resource utilization

### 🌐 **Easy Deployment**
- One-click Vercel deployment
- Serverless architecture
- Global CDN distribution

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database (or use Vercel Postgres)
- AI service API keys (see [Environment Variables](#environment-variables))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/mitchellfyi/pitchplease.git
   cd pitchplease
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys and database URLs (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   pnpm db:migrate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open in your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

You'll need to configure the following environment variables in your `.env` file:

#### Required
```bash
# Authentication
AUTH_SECRET=your-auth-secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your-postgres-url
DATABASE_URL_UNPOOLED=your-postgres-unpooled-url

# File Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

#### AI Services (Optional - for full functionality)
```bash
# Voice Synthesis
ELEVENLABS_API_KEY=your-elevenlabs-key

# Visual Generation
FAL_API_KEY=your-fal-ai-key

# Video Processing
SIEVE_API_KEY=your-sieve-key
VEED_API_KEY=your-veed-key

# LLM Providers
OPENAI_API_KEY=your-openai-key
# or use xAI (Grok) as default
```

#### OAuth Providers (Optional)
```bash
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

## Deploy Your Own

Deploy your own instance of Pitch, Please! to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmitchellfyi%2Fpitchplease&env=AUTH_SECRET,DATABASE_URL,BLOB_READ_WRITE_TOKEN&envDescription=API%20keys%20and%20database%20configuration%20required&demo-title=Pitch%20Please!&demo-description=AI-Powered%20Pitch%20Deck%20Assistant)

### Manual Deployment

1. **Fork this repository**

2. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

3. **Configure environment variables** in the Vercel dashboard

4. **Set up your database** using Vercel Postgres or your preferred provider

5. **Configure your AI service APIs** for full functionality

## Development

### Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Drizzle Studio
pnpm db:push      # Push schema changes

# Code Quality
pnpm lint         # Run ESLint and Biome
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code with Biome

# Testing
pnpm test         # Run Playwright tests
```

### Project Structure

```
pitchplease/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (chat)/            # Main chat interface
│   ├── sessions/          # Processing sessions
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── chat/             # Chat-related components
│   └── progress-steps/   # Processing pipeline UI
├── lib/                  # Utility libraries
│   ├── ai/              # AI SDK configuration
│   ├── db/              # Database queries and schema
│   └── supabase/        # Supabase integration
├── artifacts/           # AI artifact definitions
├── public/             # Static assets
└── tests/              # E2E tests
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@pitchplease.ai
- 🐛 Issues: [GitHub Issues](https://github.com/mitchellfyi/pitchplease/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/mitchellfyi/pitchplease/discussions)

---

<div align="center">
  <p>Built with ❤️ using Next.js, AI SDK, and modern web technologies</p>
  <p>
    <a href="https://vercel.com">
      <img src="https://img.shields.io/badge/Powered%20by-Vercel-black?style=flat&logo=vercel" alt="Powered by Vercel">
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Built%20with-Next.js-black?style=flat&logo=next.js" alt="Built with Next.js">
    </a>
    <a href="https://sdk.vercel.ai">
      <img src="https://img.shields.io/badge/AI%20SDK-Vercel-blue?style=flat" alt="AI SDK">
    </a>
  </p>
</div>
