# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project Name:** Adrian Rusan Personal Portfolio
**Technology Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion, Resend, Sentry, Vercel
**Architecture:** JAMstack with serverless functions and ISR (Incremental Static Regeneration)

## Core Development Principles

### 1. Code Quality Standards
- **Immutable Rule:** All code must pass linting and type checking before commit
- **Testing Required:** Minimum 80% test coverage for new features
- **Documentation:** All public APIs must be documented
- **Security:** Never commit secrets, always use environment variables

### 2. Modular Command Structure
This project uses the Claude Code modular command system for consistent workflows:
- Commands are organized in `.claude/commands/` by category
- Each command follows XML-structured format for clarity
- Use `/[category]:[command]` syntax for execution
- Commands are environment-aware and security-focused

### 3. Emergency Procedures
- **Build Failures:** Run `/dev:debug-session` for systematic troubleshooting
- **Test Failures:** Use `/test:coverage-analysis` to identify issues
- **Deployment Issues:** Execute `/deploy:rollback-procedure` for emergency rollback
- **Security Concerns:** Immediately run security scans and notify team

## Command Categories

### Project Management
- `/project:create-feature` - Full feature development with tests and docs
- `/project:scaffold-component` - Component creation with boilerplate
- `/project:setup-environment` - Development environment initialization

### Development Workflow
- `/dev:code-review` - Structured code review with quality checks
- `/dev:refactor-analysis` - Code improvement recommendations
- `/dev:debug-session` - Systematic debugging and problem solving

### Testing
- `/test:generate-tests` - Comprehensive test suite generation
- `/test:coverage-analysis` - Test coverage assessment and improvement
- `/test:integration-tests` - Integration test creation and execution

### Deployment
- `/deploy:prepare-release` - Release preparation with quality gates
- `/deploy:deploy-staging` - Staging deployment with validation
- `/deploy:rollback-procedure` - Emergency rollback execution

### Documentation
- `/docs:api-docs` - API documentation generation
- `/docs:update-readme` - README maintenance and updates
- `/docs:architecture-review` - Architecture documentation and review

## Project-Specific Commands

### Build and Development
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Analyze bundle size
npm run analyze

# Security check
npm run security-check

# Verify all (tests, build, security)
npm run verify:all
```

### Database Operations
```bash
# Run migrations
N/A - Static portfolio with no database

# Seed database
N/A - Static portfolio with no database

# Reset database
N/A - Static portfolio with no database
```

### Environment Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
N/A - Static portfolio with no database
```

## Architecture Notes

### Key Components
- **Hero Section:** Interactive animations with Framer Motion in components/Hero.tsx
- **Contact System:** Advanced contact form with lead qualification in components/ContactForm.tsx
- **GitHub Integration:** Dynamic repository showcase in components/GitHubShowcase.tsx

### Data Flow
Static content flows from data/index.ts → React components → Server-side rendering. Contact forms use client-side validation → Server Actions → Resend API for email delivery. GitHub data uses API routes with ISR caching for performance.

### External Dependencies
- **Resend:** Email service for contact forms and automated email sequences
- **GitHub API:** Repository data and contribution statistics via Octokit REST client
- **Sentry:** Error monitoring and performance tracking for production debugging

### Security Considerations
- Authentication: No user authentication system (static portfolio)
- Authorization: Server Actions validate all inputs with Zod schemas
- Data Protection: Environment variables for API keys, no user data persistence

## Quality Gates

### Pre-commit Requirements
- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Security scan clean
- [ ] Code coverage maintained

### Pre-deployment Requirements
- [ ] All quality gates pass
- [ ] Documentation updated
- [ ] Migration scripts tested
- [ ] Performance benchmarks met
- [ ] Security review complete

## Token Management

### Context Optimization
- Use progressive disclosure for large codebases
- Load commands just-in-time based on current task
- Clear context when switching between major tasks
- Monitor token usage and optimize accordingly

### Memory Management
- Leverage MCP memory server for session continuity
- Store architectural decisions in external documentation
- Use modular instructions to reduce token overhead
- Implement context compression for repeated patterns

## Team Conventions

### Git Workflow
- **Branch Naming:** `feat/feature-name`, `fix/bug-name`, `docs/doc-name`
- **Commit Messages:** Follow conventional commits format
- **Pull Requests:** Require review and all checks passing
- **Merging:** Squash commits for clean history

### Code Review Process
- Use `/dev:code-review` for automated analysis
- Focus on security, performance, and maintainability
- Require documentation for public APIs
- Ensure test coverage for new features

### Release Process
- Use `/deploy:prepare-release` for release preparation
- Follow semantic versioning
- Generate changelog automatically
- Deploy to staging first, then production

## Configuration

### Environment Variables
```bash
# Required environment variables
RESEND_API_KEY=re_your_api_key
GITHUB_TOKEN=ghp_your_github_token
SENTRY_DSN=https://your-sentry-dsn

# Optional environment variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.adrian-rusan.com
CALENDLY_ACCESS_TOKEN=your_calendly_token
```

### Feature Flags
Feature flags are configured in config/environment.ts with current settings: blog (disabled for V1), contactForm (enabled), testimonials (enabled), darkMode (enabled), calendly (enabled)

## Troubleshooting

### Common Issues
- **Build Failures:** Check TypeScript errors, then ESLint configuration
- **Email Not Sending:** Verify RESEND_API_KEY in environment variables
- **GitHub API Errors:** Check GITHUB_TOKEN permissions and rate limits

### Debug Commands
- Use `/dev:debug-session` for systematic debugging
- Check logs: `npm run audit:performance`
- Monitor performance: `npm run audit:security`

## Resources

### Documentation
- [API Documentation](./docs/api.md)
- [Architecture Guide](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Resend API Documentation](https://resend.com/docs)
- [Vercel Dashboard](https://vercel.com)

---

*This CLAUDE.md file is part of the Claude Code modular framework. Commands are loaded dynamically based on the current task to optimize token usage and maintain context efficiency.* 