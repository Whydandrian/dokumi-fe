# Deployment Guide - Dokumi Frontend

## Changes Made

I've updated your Next.js configuration from **static export** to **standalone mode** to fix the routing issue on your VPS.

### What Changed:

- `next.config.js`: Changed `output: 'export'` to `output: 'standalone'`
- `package.json`: Updated build script from `next build && next export` to `next build`
- `package.json`: Updated start script from `npx serve@latest out -p 4000` to `next start -p 4000`

## Deployment Steps for VPS

### 1. Build the Application

```bash
npm run build
```

This will create a `.next` folder with the standalone server.

### 2. Upload to VPS

Upload these folders/files to your VPS:

- `.next/` folder
- `public/` folder
- `package.json`
- `node_modules/` (or run `npm install --production` on VPS)

### 3. Set Environment Variables

Create `.env.production.local` on your VPS:

```bash
NEXT_PUBLIC_API_URL=http://your-backend-api-url:5001
```

### 4. Start the Application

```bash
npm start
```

Or use PM2 for production (recommended):

```bash
# Install PM2
npm install -g pm2

# Start the app
pm2 start npm --name "dokumi-fe" -- start

# Save PM2 config
pm2 save

# Setup auto-restart on server reboot
pm2 startup
```

### 5. Configure Nginx (Optional but Recommended)

If you want to use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Alternative: Keep Static Export (If Preferred)

If you prefer static export, you need to configure your web server:

### For Nginx:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### For Apache (.htaccess):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Testing

After deployment:

1. Visit your domain
2. Click on different menu items
3. Verify navigation works correctly
4. Test file upload and API consumption
5. Check browser console for any errors

## Troubleshooting

**Issue: Routes still don't work**

- Check if Next.js server is running: `pm2 status`
- Check logs: `pm2 logs dokumi-fe`
- Verify environment variables are set correctly

**Issue: API calls fail**

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on your backend
- Check network tab in browser DevTools
