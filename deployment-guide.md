# Deployment Options for AI in Onderwijs Website

## 1. Netlify (Recommended) ⭐
**Pros:**
- Free tier with generous limits
- Automatic deployments from GitHub
- Built-in form handling
- Custom domains
- SSL certificates included
- Great for React/Vite projects

**Steps:**
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Deploy automatically
4. Custom domain: aiinonderwijs.nl

## 2. Vercel
**Pros:**
- Excellent for React projects
- Free tier available
- Fast global CDN
- Easy GitHub integration
- Serverless functions support

**Steps:**
1. Visit vercel.com
2. Import from GitHub
3. Deploy with one click
4. Custom domain support

## 3. GitHub Pages
**Pros:**
- Completely free
- Direct integration with GitHub
- Good for static sites

**Cons:**
- Only supports static sites
- Limited custom domain options

**Steps:**
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Use GitHub Actions for build

## 4. Firebase Hosting
**Pros:**
- Google's platform
- Free tier available
- Fast global CDN
- Good performance

**Steps:**
1. Install Firebase CLI
2. firebase init hosting
3. firebase deploy

## 5. Surge.sh
**Pros:**
- Simple command-line deployment
- Free custom domains
- Very fast setup

**Steps:**
1. npm install -g surge
2. npm run build
3. surge dist

## 6. Render
**Pros:**
- Free tier for static sites
- Automatic deployments
- SSL included

## Build Commands for All Platforms
```bash
# Build command
npm run build

# Output directory
dist

# Node version
18
```