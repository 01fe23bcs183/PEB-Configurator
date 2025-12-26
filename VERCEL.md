# 🚀 Vercel Deployment Guide

Deploy the PEB 3D Building Configurator to Vercel with **full-stack support** (frontend + backend).

## Why Vercel?

✅ **Full-stack support** - Deploys both React frontend and Express backend  
✅ **Serverless functions** - Backend runs as serverless API routes  
✅ **Automatic HTTPS** - Free SSL certificates  
✅ **Global CDN** - Fast content delivery worldwide  
✅ **PostgreSQL support** - Can connect to external databases  
✅ **Zero config** - Auto-detects settings from `vercel.json`  

---

## Prerequisites

- [Vercel account](https://vercel.com/signup) (free tier is perfect)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 20+ installed locally

---

## Deployment Options

### Option 1: Deploy via Vercel UI (Recommended)

#### Step 1: Push to Git

Your code is already pushed to:

- <https://github.com/01fe23bcs183/PEB-Configurator>

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your Git repository:
   - Choose **GitHub**
   - Select `01fe23bcs183/PEB-Configurator`
4. Configure project:
   - **Framework Preset**: Other (Vercel auto-detects from vercel.json)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist/public` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

#### Step 3: Environment Variables (Optional)

If you need a database:

- Click **"Environment Variables"**
- Add: `DATABASE_URL` = your PostgreSQL connection string
  - Get free PostgreSQL from: [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app goes live! 🎉
4. You'll get a URL like: `https://peb-configurator-xxx.vercel.app`

---

### Option 2: Deploy via Vercel CLI

#### Install Vercel CLI

```bash
npm install -g vercel
```

#### Login

```bash
vercel login
```

#### Deploy

```bash
cd c:\Users\iamje\OneDrive\Desktop\anitgravity\configurator\Kirby-Clone
vercel
```

Follow the prompts:

- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: No
- **Project name**: peb-configurator (or your choice)
- **Directory**: `./` (default)
- Vercel will auto-detect settings from `vercel.json`

#### Deploy to Production

```bash
vercel --prod
```

---

## Configuration Files

### `vercel.json`

Main configuration file:

- **Build settings**: Command, output directory, Node version
- **Rewrites**: API routes and SPA fallback
- **Headers**: Security and caching
- **Functions**: Serverless backend configuration

### `api/index.ts`

Serverless function entry point that wraps your Express app

### `.vercelignore`

Files to exclude from deployment bundle

---

## Database Setup (Optional)

This app uses PostgreSQL. For production:

### Option 1: Neon (Recommended - Free tier)

1. Go to [neon.tech](https://neon.tech)
2. Create a free PostgreSQL database
3. Copy the connection string
4. Add to Vercel:
   - Project Settings → Environment Variables
   - Key: `DATABASE_URL`
   - Value: `postgresql://...`

### Option 2: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to Vercel environment variables

### Option 3: Railway

1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy `DATABASE_URL`
4. Add to Vercel

### Run Migrations

After adding `DATABASE_URL`:

```bash
# Locally, with production DB URL
DATABASE_URL="your-production-url" npm run db:push
```

---

## Features

### ✅ What Works on Vercel

- **Full-stack deployment** - Frontend + Backend together
- **API routes** - All `/api/*` endpoints work
- **Database connections** - PostgreSQL via environment variable
- **3D visualization** - React Three Fiber renders perfectly
- **SPA routing** - Client-side routing with wouter
- **Session storage** - In-memory or PostgreSQL sessions
- **WebSocket support** - Real-time features (if needed)

### 🎯 Architecture

```
https://your-app.vercel.app/
├─ / → React Frontend (Static)
├─ /api → Express Backend (Serverless)
└─ Database → External PostgreSQL
```

---

## Post-Deployment Checklist

- ✅ Build successful
- ✅ Frontend loads at root URL
- ✅ API routes accessible at `/api/*`
- ✅ 3D models render correctly
- ✅ Database connected (if configured)
- ✅ No console errors
- ✅ Custom domain configured (optional)

---

## Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `configurator.yourdomain.com`)
3. Update DNS records:
   - **Type**: CNAME
   - **Name**: configurator
   - **Value**: cname.vercel-dns.com
4. Wait for DNS propagation (~1-2 hours)
5. SSL certificate auto-provisions

---

## Continuous Deployment

Vercel automatically deploys on every push:

1. **Push to main branch** → Production deployment
2. **Push to other branches** → Preview deployment (unique URL)
3. **Pull requests** → Automatic preview deployments

### View Deployments

```bash
vercel ls
```

### View Logs

```bash
vercel logs
```

---

## Troubleshooting

### Build Fails

**Check Node version**:

- Vercel uses Node 20.x by default
- Verify in Project Settings → General → Node.js Version

**Missing dependencies**:

```bash
# Test build locally
npm run build
```

### API Routes 404

- Verify `api/index.ts` exists
- Check `vercel.json` rewrites configuration
- Ensure API routes are prefixed with `/api`

### Database Connection Errors

- Verify `DATABASE_URL` in environment variables
- Test connection locally first
- Check firewall rules (allow Vercel IPs)
- Use connection pooling for serverless (e.g., Neon)

### 3D Models Not Loading

- Check browser console for WebGL errors
- Verify all assets are in `public/` or properly imported
- Test in different browsers

### Large Bundle Size

- Vercel has 250MB limit for serverless functions
- Check `vercel.json` functions configuration
- Consider code splitting for large dependencies

---

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Optional* |
| `NODE_ENV` | Set to `production` | Auto-set |

*Required only if using database features

---

## Comparison: Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|----------|
| **Backend Support** | ✅ Full (Serverless) | ❌ Static only |
| **Database** | ✅ Via external DB | ❌ Not supported |
| **API Routes** | ✅ Built-in | ⚠️ Functions only |
| **Build Time** | ~2-3 min | ~2-3 min |
| **SSL** | ✅ Automatic | ✅ Automatic |
| **Global CDN** | ✅ Yes | ✅ Yes |
| **Best For** | Full-stack apps | Static sites |

**Recommendation**: Use **Vercel** for this project (supports backend + database)

---

## Local Development vs Production

### Local (Development)

```bash
npm run dev
# Runs on http://localhost:5000
# Uses local PostgreSQL or in-memory storage
```

### Vercel (Production)

```bash
vercel dev
# Simulates Vercel environment locally
# Tests serverless functions
```

---

## Advanced Configuration

### Serverless Function Regions

Add to `vercel.json`:

```json
{
  "functions": {
    "api/index.ts": {
      "runtime": "nodejs20.x",
      "regions": ["iad1"]
    }
  }
}
```

### Custom Build Step

Update `package.json`:

```json
{
  "scripts": {
    "build": "tsx script/build.ts && cp -r api dist/"
  }
}
```

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

## Support

Issues? Check:

1. Vercel deployment logs (Dashboard → Deployments → View logs)
2. Browser console for frontend errors
3. [Vercel Community](https://github.com/vercel/vercel/discussions)
4. This repo's `DEPLOYMENT_SUMMARY.md`

---

**Ready to deploy!** 🚀
