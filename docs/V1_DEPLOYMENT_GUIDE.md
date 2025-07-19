# V1 Deployment Guide - Adrian Rusan Portfolio

## Overview

This guide covers the complete deployment process for the V1 enhancement of Adrian Rusan's portfolio, including all new features: advanced contact system, GitHub integration, Calendly booking, documentation platform, learning platform, service status page, and UI/UX enhancements.

## Prerequisites

### Development Environment
- Node.js 18.x or higher
- npm or yarn package manager
- Git version control
- Code editor (VS Code recommended)

### Third-Party Services
- **Vercel Account** - For hosting and deployment
- **Resend Account** - For email delivery
- **GitHub Account** - For repository integration
- **Sentry Account** - For error monitoring
- **Calendly Account** (optional) - For booking integration
- **Google Analytics** (optional) - For analytics

## Environment Configuration

### 1. Local Development Setup

Create a `.env.local` file in the project root:

```env
# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# GitHub Integration
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_USERNAME=yourusername

# Calendly Integration (Optional)
CALENDLY_API_KEY=your_calendly_api_key
CALENDLY_USERNAME=your-calendly-username

# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Security (Optional)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://yourdomain.com

# Vercel (Auto-populated in production)
VERCEL_URL=your-vercel-deployment-url
```

### 2. Environment Variable Setup Guide

#### Resend Configuration
1. Sign up at [resend.com](https://resend.com)
2. Create an API key in the dashboard
3. Verify your domain for email sending
4. Set up SPF/DKIM records for better deliverability

#### GitHub Integration
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a token with `repo` and `user` scopes
3. Copy the token to `GITHUB_TOKEN`

#### Sentry Configuration
1. Create a project at [sentry.io](https://sentry.io)
2. Get the DSN from project settings
3. Create an auth token for source map uploads
4. Configure organization and project names

#### Calendly Setup (Optional)
1. Sign up at [calendly.com](https://calendly.com)
2. Get API key from developer settings
3. Configure your booking page URL

## Vercel Deployment

### 1. Initial Setup

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "V1 features ready for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

### 2. Environment Variables Configuration

In Vercel dashboard, go to Project Settings > Environment Variables:

```bash
# Required Variables
RESEND_API_KEY=re_your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_USERNAME=yourusername
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Optional Variables
CALENDLY_API_KEY=your_calendly_api_key
CALENDLY_USERNAME=your-calendly-username
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://yourdomain.com
```

### 3. Domain Configuration

#### Custom Domain Setup
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### SSL Certificate
- Vercel automatically provisions SSL certificates
- Verify HTTPS is working after domain setup

### 4. Function Configuration

Verify `vercel.json` is configured correctly:

```json
{
  "functions": {
    "app/api/cron/github-sync/route.ts": {
      "maxDuration": 30
    },
    "app/api/cron/email-sequences/route.ts": {
      "maxDuration": 60
    }
  },
  "crons": [
    {
      "path": "/api/cron/github-sync",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/email-sequences",
      "schedule": "0 9 * * *"
    }
  ]
}
```

## Pre-Deployment Testing

### 1. Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run start

# Run all audits
npm run audit:performance
npm run audit:security
npm run config:production

# Run E2E tests
npm run test:e2e
```

### 2. Feature Testing Checklist

- [ ] Contact form submission works
- [ ] Email notifications are sent
- [ ] GitHub data loads correctly
- [ ] Calendly widget displays
- [ ] Documentation pages load
- [ ] Learning platform functional
- [ ] Status page shows correct data
- [ ] Mobile responsiveness works
- [ ] All navigation works properly

## Deployment Process

### 1. Pre-Deployment Verification

```bash
# Ensure all tests pass
npm run verify:all

# Check for any linting errors
npm run lint

# Verify environment variables
npm run config:production
```

### 2. Deploy to Vercel

1. **Automatic Deployment**
   - Push to main branch triggers automatic deployment
   - Monitor deployment in Vercel dashboard

2. **Manual Deployment**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel --prod
   ```

### 3. Post-Deployment Verification

1. **Check Deployment Status**
   - Verify deployment succeeded in Vercel dashboard
   - Check build logs for any warnings/errors

2. **Test Production URL**
   - Visit your production domain
   - Test all critical user flows
   - Verify contact form works
   - Check mobile experience

3. **Monitor Services**
   - Check Sentry for any errors
   - Verify Vercel Analytics is working
   - Test email delivery

## Monitoring & Maintenance

### 1. Error Monitoring

#### Sentry Setup
- Errors are automatically tracked
- Set up alerts for critical errors
- Monitor performance metrics
- Review error trends weekly

#### Vercel Analytics
- Monitor Core Web Vitals
- Track user experience metrics
- Review performance trends

### 2. Performance Monitoring

```bash
# Regular performance audits
npm run audit:performance

# Security audits
npm run audit:security

# Check for dependency vulnerabilities
npm audit
```

### 3. Maintenance Tasks

#### Weekly
- [ ] Review Sentry error reports
- [ ] Check Vercel Analytics data
- [ ] Verify email delivery rates
- [ ] Test contact form functionality

#### Monthly
- [ ] Update dependencies
- [ ] Run comprehensive security audit
- [ ] Review and optimize performance
- [ ] Update documentation

#### Quarterly
- [ ] Comprehensive security review
- [ ] Performance optimization
- [ ] Feature usage analysis
- [ ] Plan next version features

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npm run lint
```

#### 2. Environment Variable Issues
- Verify all required variables are set in Vercel
- Check variable names match exactly
- Ensure no trailing spaces in values

#### 3. Email Delivery Problems
- Verify Resend API key is correct
- Check domain verification status
- Review SPF/DKIM records

#### 4. GitHub Integration Issues
- Verify token has correct permissions
- Check rate limiting status
- Ensure username is correct

### Emergency Procedures

#### Rollback Deployment
1. Go to Vercel dashboard
2. Find previous successful deployment
3. Click "Redeploy" on stable version
4. Verify rollback successful

#### Critical Issue Response
1. **Immediate Actions**
   - Assess severity and impact
   - Implement temporary fixes if possible
   - Document the issue

2. **Communication**
   - Notify stakeholders
   - Update status page if applicable
   - Provide regular updates

3. **Resolution**
   - Identify root cause
   - Implement permanent fix
   - Test thoroughly before deployment
   - Post-mortem analysis

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Sentry Documentation](https://docs.sentry.io)

### Support Channels
- **Vercel Support**: support@vercel.com
- **Resend Support**: support@resend.com
- **Sentry Support**: support@sentry.io
- **GitHub Support**: support@github.com

### Useful Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server

# Testing & Auditing
npm run test:e2e           # Run E2E tests
npm run audit:performance  # Performance audit
npm run audit:security     # Security audit
npm run config:production  # Production config check

# Utilities
npm run lint               # Code linting
npm run analyze           # Bundle analysis
npm run verify:all        # Run all verifications
```

## Security Considerations

### 1. Environment Variables
- Never commit sensitive data to repository
- Use different keys for development/production
- Rotate keys regularly
- Monitor for exposed credentials

### 2. API Security
- Implement rate limiting
- Validate all inputs
- Use HTTPS everywhere
- Monitor for suspicious activity

### 3. Content Security
- Sanitize user inputs
- Implement CSRF protection
- Use security headers
- Regular security audits

## Performance Optimization

### 1. Core Web Vitals
- Monitor LCP, FID, and CLS metrics
- Optimize images and fonts
- Minimize JavaScript bundles
- Use efficient caching strategies

### 2. Bundle Optimization
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npm run audit:dependencies
```

### 3. Caching Strategy
- Static assets: Long-term caching
- API responses: Appropriate TTL
- GitHub data: 6-hour ISR
- Contact form: No caching

---

This deployment guide ensures a smooth and secure deployment of the V1 portfolio enhancements. Follow each step carefully and verify all configurations before going live. 