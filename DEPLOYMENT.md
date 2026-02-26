# 🚀 Deployment Guide - Lead Haven Landing Page

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. **Drag & Drop Deploy:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the entire `lead-haven` folder
   - Your site is live in seconds!

2. **GitHub Deploy:**
   ```bash
   # Push to GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   
   # Then connect to Netlify:
   # - Go to netlify.com
   # - "New site from Git"
   # - Select your repo
   # - Deploy!
   ```

3. **Custom Domain:**
   - In Netlify dashboard: Domain Settings → Add custom domain
   - Point your DNS to Netlify nameservers
   - SSL certificate auto-configured ✅

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd lead-haven
vercel

# Follow the prompts
# Your site is live!
```

### Option 3: GitHub Pages

```bash
# Create repo and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# Enable GitHub Pages:
# Repo Settings → Pages → Source: main branch → Save
# Live at: https://USERNAME.github.io/REPO_NAME/
```

### Option 4: Traditional Hosting (cPanel, etc.)

1. **Upload via FTP/SFTP:**
   - Connect to your hosting via FileZilla/Cyberduck
   - Upload all files to `public_html` or `www` directory
   - Ensure file permissions are correct (644 for files, 755 for folders)

2. **File Structure on Server:**
   ```
   public_html/
   ├── index.html
   ├── style.css
   ├── main.js
   └── README.md
   ```

## 🔧 Pre-Deployment Checklist

- [ ] **Update Calendly URL** in `main.js` (line 23)
- [ ] **Update phone number** in `index.html` (line ~34)
- [ ] **Add favicon** (create and link in `<head>`)
- [ ] **Add Google Analytics** tracking code
- [ ] **Add Facebook Pixel** (if using)
- [ ] **Test all CTA buttons** open Calendly popup
- [ ] **Verify mobile responsiveness**
- [ ] **Check browser compatibility** (Chrome, Safari, Firefox)

## 📊 Post-Deployment Setup

### 1. Google Analytics

Add before closing `</head>` in `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Facebook Pixel

Add before closing `</head>`:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### 3. Google Ads Conversion Tracking

Add conversion event to `main.js` Calendly trigger:

```javascript
Calendly.initPopupWidget({
    url: 'https://calendly.com/julian-leadhaven'
});

// Track conversion
gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX'
});

// Track Facebook event
fbq('track', 'Lead');
```

### 4. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property (use domain or URL prefix)
3. Verify ownership (use HTML tag method)
4. Submit sitemap (optional for single page)

### 5. SSL Certificate

**Netlify/Vercel:** Automatic ✅  
**Traditional Hosting:** Use Let's Encrypt or hosting provider's SSL

## 🎯 Google Ads Setup

### 1. Campaign Structure

**Campaign:** Lead Haven - FL Dental Marketing  
**Type:** Search  
**Budget:** $50-100/day to start

### 2. Ad Group: Dental Marketing

**Keywords:**
```
[dental marketing florida]
[dental patient acquisition]
[dental practice marketing florida]
[get more dental patients]
"dental marketing agency florida"
+dental +marketing +florida
```

### 3. Ad Example

**Headline 1:** Get 20-40 New Patients Monthly  
**Headline 2:** Florida Dental Marketing  
**Headline 3:** Pay Only for Results  
**Description 1:** Performance-based dental marketing. No results, no pay. Add qualified patients in 14 days.  
**Description 2:** Free strategy call. 60-day guarantee. Trusted by 50+ Florida practices.  
**Final URL:** https://yourdomain.com

### 4. Conversion Tracking

Set up in Google Ads:
- **Conversion Name:** Calendly Button Click
- **Category:** Submit lead form
- **Value:** Assign estimated patient value
- **Count:** One per click

## 📱 Testing & Quality Assurance

### Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Safari (desktop & mobile)
- ✅ Firefox (latest)
- ✅ Edge (latest)

### Device Testing

- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)
- ✅ Desktop (1920×1080, 1366×768)

### Functionality Testing

```bash
# Test checklist:
□ All 7 CTA buttons open Calendly popup
□ Calendly popup loads correctly
□ Mobile menu opens/closes properly
□ FAQ accordion expands/collapses
□ Sticky CTA bar appears on scroll
□ All links work correctly
□ Phone number is clickable on mobile
□ Page loads in < 3 seconds
□ No console errors
```

## 🔒 Security Best Practices

1. **Keep dependencies updated:**
   - Calendly widget script (auto-updated via CDN)
   - Google Fonts (auto-updated via CDN)

2. **HTTP Security Headers** (add via hosting):
   ```
   X-Frame-Options: SAMEORIGIN
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   ```

3. **Content Security Policy** (optional, advanced):
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; 
                  script-src 'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com; 
                  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com;">
   ```

## 📈 Performance Optimization

### After Deployment:

1. **Test with PageSpeed Insights:**
   - [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   - Target: 90+ score

2. **Optimize Images** (if you add any):
   - Use WebP format
   - Lazy load below-fold images
   - Compress with TinyPNG

3. **Enable Caching:**
   - Netlify/Vercel: Automatic ✅
   - Traditional: Add `.htaccess` rules

4. **CDN Setup:**
   - Netlify/Vercel: Built-in ✅
   - Traditional: Use Cloudflare free tier

## 🆘 Troubleshooting

### Calendly Popup Not Working

1. Check browser console for errors
2. Verify script loaded: `console.log(typeof Calendly)`
3. Check Calendly URL is correct in `main.js`
4. Ensure no ad blockers interfering

### Styling Issues

1. Verify `style.css` is linked correctly
2. Check browser cache (hard refresh: Ctrl+Shift+R)
3. Validate CSS syntax

### Mobile Menu Not Opening

1. Check if `main.js` is loaded
2. Verify no JavaScript errors in console
3. Test click events manually

## 📞 Need Help?

Common issues and solutions:
- **404 Error:** Check file paths and hosting root directory
- **CSS Not Loading:** Verify file path in `<link>` tag
- **JS Not Working:** Check browser console for errors
- **Calendly Issues:** Test the direct Calendly link

## 🎉 You're Live!

Once deployed:
1. Test from different devices
2. Share with team for feedback
3. Monitor Google Analytics
4. Track conversions
5. A/B test variations
6. Iterate and optimize

**Pro Tip:** Set up Google Ads campaign first, then deploy the landing page. This ensures everything is tracking correctly from day one.

---

**Questions?** Check the main [README.md](README.md) for detailed documentation.
