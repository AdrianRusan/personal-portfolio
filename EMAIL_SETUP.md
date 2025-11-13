# Email & SEO Setup Guide

This guide will help you set up email notifications for your contact form and Google Search Console verification.

## 📧 Email Setup with Resend (Free)

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Free tier includes: **100 emails/day** (perfect for a portfolio contact form)

### 2. Get Your API Key

1. Log in to Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy your API key (starts with `re_`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Email Configuration (Resend)
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=rusan.adrian.ionut@gmail.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important Notes:**
- `RESEND_FROM_EMAIL`: Use `onboarding@resend.dev` for testing
- For production with custom domain: Verify your domain in Resend first, then use `contact@yourdomain.com`
- `CONTACT_EMAIL`: Your personal email where you'll receive contact form submissions

### 4. (Optional) Set Up Custom Domain

To send from `contact@adrian-rusan.com` instead of `onboarding@resend.dev`:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `adrian-rusan.com`
4. Add DNS records to your domain registrar (Vercel/Cloudflare/etc.)
5. Wait for verification (usually takes 5-30 minutes)
6. Update `.env.local`: `RESEND_FROM_EMAIL=contact@adrian-rusan.com`

### 5. Test Your Setup

```bash
npm run dev
```

1. Navigate to the contact form on your portfolio
2. Fill out the form with test data
3. Submit the form
4. Check your `CONTACT_EMAIL` inbox for the notification

### Troubleshooting

**"API key not found" error:**
- Make sure `.env.local` exists in project root
- Restart your dev server: `npm run dev`
- Check that `RESEND_API_KEY` starts with `re_`

**Emails not arriving:**
- Check spam folder
- Verify API key is correct in Resend dashboard
- Check server logs for errors: `console.log` output
- Try sending from Resend dashboard directly to verify account works

**Rate limiting:**
- Free tier: 100 emails/day
- Contact form has built-in rate limiting: 3 submissions per 15 minutes per IP
- If you need more, upgrade to Resend Pro plan

---

## 🔍 Google Search Console Setup

### 1. Add Your Site

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Enter your URL: `https://www.adrian-rusan.com`
4. Choose **HTML tag** verification method

### 2. Get Verification Code

Google will show you an HTML tag like:
```html
<meta name="google-site-verification" content="abc123xyz..." />
```

Copy only the content value: `abc123xyz...`

### 3. Add to Environment Variables

Add to your `.env.local`:

```bash
# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz...
```

**Note:** This environment variable has `NEXT_PUBLIC_` prefix because it needs to be available in the browser for the meta tag.

### 4. Deploy and Verify

1. Commit and push your changes
2. Deploy to Vercel/production
3. Wait 1-2 minutes for deployment
4. Go back to Google Search Console
5. Click **Verify**
6. You should see "Ownership verified" ✅

### 5. Submit Sitemap

After verification:
1. In Google Search Console, go to **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Google will start crawling your site!

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] `.env.local` is in `.gitignore` (already done)
- [ ] Add environment variables to Vercel:
  - Go to Vercel project settings
  - Navigate to **Environment Variables**
  - Add all variables from `.env.local`
  - **Important:** Resend API key should only be in **Production** and **Preview** environments
- [ ] Test contact form in production
- [ ] Verify Google Search Console verification works
- [ ] Set up custom domain email (optional but recommended)

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Resend** | 100 emails/day | $20/month for 50k emails |
| **Google Search Console** | Free forever | Free |
| **Vercel Hosting** | Free hobby plan | $20/month Pro |

**Total Monthly Cost (Free Tier):** $0 ✅

---

## 📝 Environment Variables Reference

```bash
# .env.local (NEVER commit this file!)

# Email (Required for contact form)
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=rusan.adrian.ionut@gmail.com
RESEND_FROM_EMAIL=onboarding@resend.dev

# SEO (Optional but recommended)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Sentry (Optional - for error tracking)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_PROJECT=personal-portfolio
SENTRY_ORG=your_org
SENTRY_AUTH_TOKEN=your_auth_token
```

---

## 🆘 Need Help?

- **Resend Docs:** https://resend.com/docs
- **Google Search Console Help:** https://support.google.com/webmasters
- **Vercel Environment Variables:** https://vercel.com/docs/environment-variables

---

## 🎉 You're All Set!

Once configured:
- Contact form emails will arrive in your inbox instantly
- Google will index your portfolio for search results
- You'll get notifications every time someone reaches out

**Pro tip:** Check your email settings to make sure Resend emails aren't going to spam!
