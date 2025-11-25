# Apache Deployment Guide for Dokumi Frontend

## Option 1: Next.js Standalone Server (Recommended - Current Setup)

### 1. Build the Application

```bash
npm run build
```

### 2. Upload to VPS

Upload to `/var/www/dokumi-fe/`:

- `.next/` folder
- `public/` folder
- `package.json`
- `node_modules/` (or run `npm install --production` on VPS)

### 3. Set Environment Variable on VPS

```bash
cd /var/www/dokumi-fe
echo "NEXT_PUBLIC_API_URL=https://dokumi.itk.ac.id" > .env.production.local
```

### 4. Start Next.js Server with PM2

```bash
cd /var/www/dokumi-fe
npm install -g pm2
pm2 start npm --name "dokumi-fe" -- start
pm2 save
pm2 startup
```

### 5. Update Apache Config

Use the config from `apache-config-nextjs-server.conf`:

```bash
sudo nano /etc/apache2/sites-available/dokumi.conf
# Copy content from apache-config-nextjs-server.conf

# Enable required modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
sudo a2enmod ssl

# Test and reload
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 6. Verify

- Check PM2: `pm2 status`
- Check logs: `pm2 logs dokumi-fe`
- Visit: https://dokumi.itk.ac.id

---

## Option 2: Static Export (Alternative)

If you prefer static files, revert the changes:

### 1. Revert next.config.js

```javascript
const nextConfig = {
  output: "export", // Change back to export
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
};
```

### 2. Revert package.json scripts

```json
"build": "next build && next export",
"start": "npx serve@latest out -p 4000",
```

### 3. Build and Deploy

```bash
npm run build
# Upload 'out' folder to /var/www/dokumi-fe/out
```

### 4. Use Your Current Apache Config

Your current config will work, but make sure you have this rewrite rule:

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

---

## Troubleshooting

**Next.js server not starting:**

```bash
cd /var/www/dokumi-fe
pm2 logs dokumi-fe
```

**Port 4000 already in use:**

```bash
sudo lsof -i :4000
pm2 delete dokumi-fe
pm2 start npm --name "dokumi-fe" -- start
```

**Apache proxy errors:**

```bash
sudo tail -f /var/log/apache2/error.log
```

**Routes still not working:**

- Verify Next.js is running: `curl http://localhost:4000`
- Check Apache modules: `apache2ctl -M | grep proxy`
- Restart Apache: `sudo systemctl restart apache2`
