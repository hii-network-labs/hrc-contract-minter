# Deployment Guide

## 📋 Overview

Guide to deploy Hii Token Minter v2 to different environments.

## 🚀 Production Deployment

### Prerequisites

- Node.js 18+ hoặc Bun
- Web server (Nginx, Apache, hoặc CDN)
- Domain name (tùy chọn)
- SSL certificate (khuyến nghị)

### Build for Production

```bash
# Clone repository
git clone https://github.com/hii-network-labs/hrc-contract-minter.git
cd hii-token-minter-v2

# Install dependencies
bun install
cd frontend && bun install

# Copy contract artifacts
./copy-contracts.sh

# Build production
bun run build
```

### Deploy with Nginx

1. **Copy build files**:
```bash
sudo cp -r frontend/dist/* /var/www/html/
```

2. **Nginx configuration** (`/etc/nginx/sites-available/hii-token-minter`):
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    root /var/www/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: wss:; font-src 'self' data:;" always;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Enable site**:
```bash
sudo ln -s /etc/nginx/sites-available/hii-token-minter /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🌐 CDN Deployment

### Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel --prod
```

3. **Vercel configuration** (`vercel.json`):
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Netlify

1. **Build settings**:
   - Build command: `bun run build`
   - Publish directory: `frontend/dist`

2. **Netlify configuration** (`netlify.toml`):
```toml
[build]
  command = "./copy-contracts.sh && cd frontend && bun install && bun run build"
  publish = "frontend/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production` file in `frontend/` directory:

```env
# API Keys for contract verification
VITE_HII_TESTNET_API_KEY=your_testnet_api_key
VITE_HII_MAINNET_API_KEY=your_mainnet_api_key

# Analytics (tùy chọn)
VITE_GA_TRACKING_ID=your_google_analytics_id
```

## 📊 Monitoring & Analytics

### Google Analytics (tùy chọn)

1. **Add to `index.html`**:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Monitoring

Khuyến nghị sử dụng:
- [Sentry](https://sentry.io/) cho error tracking
- [LogRocket](https://logrocket.com/) cho session replay

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP (Content Security Policy) implemented
- [ ] No sensitive data in client-side code
- [ ] Regular dependency updates
- [ ] Domain verification

## 🚨 Troubleshooting

### Common Issues

1. **White screen after deployment**:
   - Check browser console for errors
   - Verify all assets are loading correctly
   - Check routing configuration

2. **MetaMask connection issues**:
   - Ensure HTTPS is enabled
   - Check CSP headers
   - Verify domain is whitelisted

3. **Contract deployment fails**:
   - Check network configuration
   - Verify RPC endpoints are accessible
   - Ensure sufficient gas fees

### Performance Optimization

1. **Bundle analysis**:
```bash
cd frontend
bun run build -- --analyze
```

2. **Lighthouse audit**:
   - Run Lighthouse in Chrome DevTools
   - Focus on Performance, Accessibility, SEO

## 📞 Support

If you encounter issues during deployment:
- [GitHub Issues](https://github.com/hii-network-labs/hrc-contract-minter/issues)
- [Documentation](https://github.com/hii-network-labs/hrc-contract-minter#readme)