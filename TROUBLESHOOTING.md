# Debugging "Always Loading" Issue

## Quick Diagnostics (Run these on your VPS)

### 1. Check if Next.js server is running

```bash
# Check if process is running
pm2 status

# If not running, check what happened
pm2 logs dokumi-fe --lines 50

# Check if port 4000 is listening
sudo netstat -tlnp | grep :4000
# OR
sudo lsof -i :4000
```

### 2. Test Next.js server directly

```bash
# From VPS
curl http://localhost:4000

# Should return HTML, not error
```

### 3. Check Apache proxy

```bash
# Check Apache error logs
sudo tail -f /var/log/apache2/error.log

# Check if proxy modules are enabled
apache2ctl -M | grep proxy
```

### 4. Check browser console

Open browser DevTools (F12) → Console tab

- Look for errors
- Check Network tab for failed requests

---

## Common Causes & Fixes

### Issue 1: Next.js Server Not Running

**Fix:**

```bash
cd /var/www/dokumi-fe

# Make sure .next folder exists
ls -la .next/

# If not, you need to build first
npm run build

# Start with PM2
pm2 start npm --name "dokumi-fe" -- start
pm2 save

# Check logs
pm2 logs dokumi-fe
```

### Issue 2: Wrong Proxy Order in Apache

Your backend API proxies might be catching all requests. The order matters!

**Correct Apache config order:**

```apache
# Backend FIRST (more specific paths)
ProxyPass        /docs/api/ http://127.0.0.1:5001/docs/api/
ProxyPassReverse /docs/api/ http://127.0.0.1:5001/docs/api/

ProxyPass        /api/ http://127.0.0.1:5001/
ProxyPassReverse /api/ http://127.0.0.1:5001/

ProxyPass        /ws/  ws://127.0.0.1:8000/ws/
ProxyPassReverse /ws/  ws://127.0.0.1:8000/ws/

# Frontend LAST (catch-all)
ProxyPass        / http://127.0.0.1:4000/
ProxyPassReverse / http://127.0.0.1:4000/
```

**Test Apache config:**

```bash
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### Issue 3: Environment Variable Not Set

**Fix:**

```bash
cd /var/www/dokumi-fe

# Create .env.production.local
cat > .env.production.local << EOF
NEXT_PUBLIC_API_URL=https://dokumi.itk.ac.id
EOF

# Restart Next.js
pm2 restart dokumi-fe
```

### Issue 4: Build Issues

**Fix:**

```bash
cd /var/www/dokumi-fe

# Check if build was successful
ls -la .next/standalone/

# If empty or missing, rebuild
npm run build

# Check for errors in build output
```

### Issue 5: Port Conflict

**Fix:**

```bash
# Check what's using port 4000
sudo lsof -i :4000

# If something else is using it, kill it or change port
pm2 delete dokumi-fe

# Start on different port (e.g., 3000)
PORT=3000 pm2 start npm --name "dokumi-fe" -- start

# Update Apache ProxyPass to use new port
# ProxyPass / http://127.0.0.1:3000/
```

---

## Step-by-Step Troubleshooting

Run these commands **on your VPS** and share the output:

```bash
# 1. Check PM2 status
pm2 status

# 2. Check Next.js logs
pm2 logs dokumi-fe --lines 20

# 3. Test local connection
curl -I http://localhost:4000

# 4. Check Apache error log
sudo tail -20 /var/log/apache2/error.log

# 5. Check if modules are enabled
apache2ctl -M | grep -E 'proxy|rewrite'
```

---

## Alternative: Revert to Static Export

If you're having trouble with the server mode, you can revert to static export:

### 1. Revert next.config.js

```javascript
const nextConfig = {
  output: "export", // Change back
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
};
```

### 2. Revert package.json

```json
"build": "next build && next export",
```

### 3. Rebuild

```bash
npm run build
```

### 4. Upload 'out' folder to VPS

```bash
# Upload to /var/www/dokumi-fe/out
```

### 5. Use your original Apache config with this fix

Make sure you have:

```apache
DocumentRoot /var/www/dokumi-fe/out

<Directory "/var/www/dokumi-fe/out">
  Options FollowSymLinks
  AllowOverride All  # Changed from None
  Require all granted
</Directory>

# Add .htaccess in /var/www/dokumi-fe/out
```

### 6. Create .htaccess

```bash
cat > /var/www/dokumi-fe/out/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteCond %{REQUEST_URI} !^/docs/
  RewriteCond %{REQUEST_URI} !^/ws/
  RewriteRule . /index.html [L]
</IfModule>
EOF
```

---

## What to Share for Help

Please run these and share the output:

1. `pm2 status`
2. `pm2 logs dokumi-fe --lines 30`
3. `curl -I http://localhost:4000`
4. Browser console errors (F12 → Console)
5. Browser network tab (F12 → Network) - what request is pending?
