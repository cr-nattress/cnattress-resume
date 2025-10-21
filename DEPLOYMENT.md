# Deployment Guide - Netlify

Complete guide for deploying the Chris Nattress AI-powered portfolio to Netlify.

---

## 📋 Prerequisites

- ✅ GitHub repository: https://github.com/cr-nattress/cnattress-resume
- ✅ Netlify account (free tier works)
- ✅ Supabase project created
- ✅ Anthropic API key obtained

---

## 🚀 Quick Deployment Steps

### 1. Connect Repository to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select repository: **cr-nattress/cnattress-resume**

### 2. Configure Build Settings

Netlify should auto-detect Next.js settings. Verify:

**Build settings:**
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: `netlify/functions`

**Advanced build settings:**
- **Node version**: 20 (set in netlify.toml)

Click **"Show advanced"** and verify these are correct.

### 3. Set Environment Variables

Before deploying, add these environment variables in Netlify:

Go to **Site settings** → **Environment variables** → **Add a variable**

#### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Anthropic (Claude AI)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Application Settings
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NODE_ENV=production

# Analytics & Admin
NEXT_PUBLIC_ENABLE_ANALYTICS=true
ADMIN_ACCESS_KEY=your-secret-admin-key-here
RATE_LIMIT_MAX_REQUESTS=100
```

#### Where to Find Values

**Supabase**:
1. Go to https://supabase.com/dashboard
2. Select your project: `chris-nattress`
3. Go to **Settings** → **API**
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

**Anthropic**:
1. Go to https://console.anthropic.com/settings/keys
2. Create a new API key
3. Copy the key → `ANTHROPIC_API_KEY`

**Admin Access**:
- Create a secure random string for `ADMIN_ACCESS_KEY`
- This protects your `/admin/analytics` dashboard

### 4. Deploy

1. Click **"Deploy site"**
2. Netlify will:
   - Clone your repository
   - Install dependencies
   - Run `npm run build`
   - Deploy to CDN

**First deploy takes ~2-3 minutes**

### 5. Verify Deployment

Once deployed, you'll get a URL like:
```
https://inspiring-name-123456.netlify.app
```

**Test these features:**

1. **Homepage** - Should load with gradient design
2. **Chat Widget** - Click the floating button
3. **AI Chat** - Send a message and verify AI responds
4. **Admin Dashboard** - Visit `/admin/analytics` and use your admin key

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to configure DNS

Recommended:
```
www.chrisnattress.com → Primary domain
chrisnattress.com → Redirect to www
```

### SSL Certificate

- ✅ Automatically provisioned by Netlify
- ✅ Free Let's Encrypt certificate
- ✅ Auto-renewal enabled

### Continuous Deployment

✅ **Already configured!**

Every time you push to `main` branch:
1. Netlify detects the push
2. Triggers automatic build
3. Deploys new version if build succeeds

**Deploy previews** for pull requests are also automatic.

---

## 🔍 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to **Deploys** → Select failed deploy
2. Click **"Deploy log"**
3. Look for errors

**Common issues:**

1. **Missing environment variables**
   - Error: `Missing NEXT_PUBLIC_SUPABASE_URL`
   - Fix: Add all required env vars in Netlify dashboard

2. **TypeScript errors**
   - Error: `Type error: ...`
   - Fix: Run `npm run build` locally first
   - Ensure latest code is pushed to GitHub

3. **Out of memory**
   - Error: `JavaScript heap out of memory`
   - Fix: Add `NODE_OPTIONS=--max_old_space_size=4096` to env vars

### API Routes Not Working

**Symptom:** 404 on `/api/chat` or `/api/analytics`

**Fix:**
1. Verify `netlify.toml` is in repository root
2. Check **Site settings** → **Functions** → Verify enabled
3. Redeploy: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Chat Widget Not Responding

**Possible causes:**

1. **Missing Anthropic API key**
   - Check env vars include `ANTHROPIC_API_KEY`

2. **Rate limiting**
   - Check Anthropic dashboard for API usage
   - Verify API key is valid

3. **CORS issues**
   - Check browser console for errors
   - Verify `NEXT_PUBLIC_APP_URL` matches your Netlify URL

### Database Errors

**Symptom:** Analytics not saving, chat logs not persisted

**Fix:**
1. Verify Supabase env vars are correct
2. Run database schema: `supabase/schema.sql`
3. Check Supabase dashboard → **Table Editor**
4. Verify RLS policies are enabled

---

## 📊 Monitoring

### Build Status

**Netlify Dashboard:**
- **Deploys** → See all deployments
- **Production deploys** → Latest live version
- **Deploy previews** → Pull request previews

**Build notifications:**
- Set up in **Site settings** → **Build & deploy** → **Deploy notifications**
- Options: Email, Slack, webhook

### Analytics

**Netlify Analytics** (optional, paid):
- Site settings → Analytics
- Shows traffic, performance, top pages

**Your Custom Analytics:**
- Visit `/admin/analytics` on your deployed site
- Use your `ADMIN_ACCESS_KEY` to login
- View AI chat statistics

### Function Logs

**View function execution:**
1. Go to **Functions** tab
2. Select a function (`api/chat`, `api/analytics`)
3. View logs, invocations, errors

---

## 🎯 Performance Optimization

### Enable Caching

Already configured in `netlify.toml`:
- Static assets: 1 year cache
- HTML pages: No cache (always fresh)
- API routes: No cache

### Image Optimization

Netlify automatically optimizes images. To use:

```typescript
import Image from 'next/image'

<Image src="/photo.jpg" width={500} height={500} alt="..." />
```

### Bundle Analyzer

Check bundle size:

```bash
npm run build
# Review output in terminal
```

### Edge Functions (Advanced)

For even faster response times, consider Netlify Edge Functions:
- Deploy AI chat to the edge
- Reduce latency for global users

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit API keys to Git
- ✅ Use Netlify dashboard for secrets
- ✅ Rotate keys regularly
- ✅ Use different keys for staging/production

### API Rate Limiting

Already implemented:
- 100 requests per hour per IP (configurable)
- Set `RATE_LIMIT_MAX_REQUESTS` env var to adjust

### Database Security

Supabase RLS policies protect your data:
- ✅ Anonymous users can INSERT (tracking)
- ✅ Authenticated users can SELECT (admin)
- ✅ No public reads (privacy-first)

### Admin Dashboard

Protected by `ADMIN_ACCESS_KEY`:
- Keep this key secure
- Don't share publicly
- Consider using Netlify Identity for multi-user access

---

## 📈 Scaling

### Free Tier Limits

**Netlify Free:**
- 300 build minutes/month
- 100 GB bandwidth/month
- Unlimited sites

**When you might need Pro:**
- More than 300 min builds
- High traffic (>100 GB/month)
- Advanced features (analytics, A/B testing)

### Database Scaling

**Supabase Free:**
- 500 MB database
- 5 GB bandwidth
- 50 MB file storage

**Monitor usage:**
- Supabase dashboard → **Settings** → **Usage**

### AI API Costs

**Anthropic Claude:**
- Pay per token
- Monitor: https://console.anthropic.com/settings/usage

**Cost optimization:**
- Implement caching for common questions
- Set conversation length limits
- Monitor usage in Anthropic dashboard

---

## 🔄 CI/CD Pipeline

### Automatic Deploys

**Trigger:** Push to `main` branch
**Steps:**
1. Netlify detects commit
2. Clones repository
3. Installs dependencies (`npm install`)
4. Runs build (`npm run build`)
5. Deploys to CDN
6. Invalidates cache

### Deploy Previews

**Trigger:** Create Pull Request
**Result:** Unique URL for testing

Example:
```
https://deploy-preview-123--your-site.netlify.app
```

### Branch Deploys

Deploy specific branches:
1. **Site settings** → **Build & deploy** → **Branch deploys**
2. Select branches to deploy
3. Each branch gets unique URL

---

## 📚 Useful Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables set in Netlify
- [ ] Database schema run in Supabase
- [ ] Build succeeds locally (`npm run build`)
- [ ] All tests pass
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active
- [ ] Admin dashboard accessible
- [ ] Chat widget responds to messages
- [ ] Analytics tracking works
- [ ] 404 page displays correctly
- [ ] Mobile responsive tested
- [ ] Browser compatibility checked

---

**Deployment Date:** October 21, 2025
**Repository:** https://github.com/cr-nattress/cnattress-resume
**Live Site:** TBD (after deployment)

Good luck with your deployment! 🚀
