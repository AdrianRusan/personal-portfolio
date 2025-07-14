const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Required environment variables for production
const REQUIRED_ENV_VARS = {
  // Email Configuration (Resend)
  RESEND_API_KEY: {
    description: 'Resend API key for email delivery',
    required: true,
    sensitive: true
  },
  FROM_EMAIL: {
    description: 'From email address for notifications',
    required: true,
    sensitive: false
  },
  ADMIN_EMAIL: {
    description: 'Admin email address for notifications',
    required: true,
    sensitive: false
  },
  
  // GitHub Integration
  GITHUB_TOKEN: {
    description: 'GitHub personal access token for API access',
    required: true,
    sensitive: true
  },
  GITHUB_USERNAME: {
    description: 'GitHub username for repository data',
    required: true,
    sensitive: false
  },
  
  // Calendly Integration
  CALENDLY_API_KEY: {
    description: 'Calendly API key for booking integration',
    required: false,
    sensitive: true
  },
  CALENDLY_USERNAME: {
    description: 'Calendly username for booking widget',
    required: false,
    sensitive: false
  },
  
  // Analytics & Monitoring
  NEXT_PUBLIC_GA_ID: {
    description: 'Google Analytics ID',
    required: false,
    sensitive: false
  },
  SENTRY_DSN: {
    description: 'Sentry DSN for error monitoring',
    required: true,
    sensitive: true
  },
  SENTRY_ORG: {
    description: 'Sentry organization',
    required: true,
    sensitive: false
  },
  SENTRY_PROJECT: {
    description: 'Sentry project name',
    required: true,
    sensitive: false
  },
  SENTRY_AUTH_TOKEN: {
    description: 'Sentry auth token for source maps',
    required: true,
    sensitive: true
  },
  
  // Security
  NEXTAUTH_SECRET: {
    description: 'NextAuth secret for session security',
    required: false,
    sensitive: true
  },
  NEXTAUTH_URL: {
    description: 'NextAuth URL for authentication',
    required: false,
    sensitive: false
  },
  
  // Vercel
  VERCEL_URL: {
    description: 'Vercel deployment URL',
    required: false,
    sensitive: false
  }
};

// Vercel configuration requirements
const VERCEL_CONFIG_REQUIREMENTS = {
  functions: {
    'app/api/cron/github-sync/route.ts': { maxDuration: 30 },
    'app/api/cron/email-sequences/route.ts': { maxDuration: 60 }
  },
  crons: [
    { path: '/api/cron/github-sync', schedule: '0 */6 * * *' },
    { path: '/api/cron/email-sequences', schedule: '0 9 * * *' }
  ]
};

class ProductionConfigValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.reportDir = path.join(__dirname, '../.taskmaster/reports');
    this.ensureReportDir();
  }

  ensureReportDir() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  validateEnvironmentVariables() {
    console.log('🔍 Validating environment variables...');
    
    const envIssues = [];
    const envWarnings = [];
    
    // Check for .env.local file
    const envLocalPath = path.join(__dirname, '../.env.local');
    if (!fs.existsSync(envLocalPath)) {
      envIssues.push('Missing .env.local file');
    }
    
    // Check for .env.example file
    const envExamplePath = path.join(__dirname, '../.env.example');
    if (!fs.existsSync(envExamplePath)) {
      envWarnings.push('Missing .env.example file for documentation');
    }
    
    // Validate required environment variables
    Object.entries(REQUIRED_ENV_VARS).forEach(([key, config]) => {
      const value = process.env[key];
      
      if (config.required && !value) {
        envIssues.push(`Missing required environment variable: ${key} (${config.description})`);
      } else if (value) {
        // Validate format for specific variables
        if (key === 'FROM_EMAIL' || key === 'ADMIN_EMAIL') {
          if (!this.isValidEmail(value)) {
            envIssues.push(`Invalid email format for ${key}: ${value}`);
          }
        }
        
        if (key === 'GITHUB_TOKEN' && value.length < 20) {
          envWarnings.push(`GitHub token seems too short for ${key}`);
        }
        
        if (key === 'RESEND_API_KEY' && !value.startsWith('re_')) {
          envWarnings.push(`Resend API key format seems incorrect for ${key}`);
        }
      }
    });
    
    // Check for sensitive data in non-sensitive variables
    Object.entries(process.env).forEach(([key, value]) => {
      if (key.startsWith('NEXT_PUBLIC_') && value) {
        if (this.containsSensitiveData(value)) {
          envIssues.push(`Sensitive data detected in public environment variable: ${key}`);
        }
      }
    });
    
    this.issues.push(...envIssues);
    this.warnings.push(...envWarnings);
    
    return {
      passed: envIssues.length === 0,
      issues: envIssues,
      warnings: envWarnings
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  containsSensitiveData(value) {
    const sensitivePatterns = [
      /[a-zA-Z0-9]{32,}/,  // Long alphanumeric strings (likely tokens)
      /sk_[a-zA-Z0-9]+/,   // Stripe secret keys
      /pk_[a-zA-Z0-9]+/,   // Stripe public keys (still sensitive)
      /[A-Za-z0-9+/]{40,}={0,2}/, // Base64 encoded strings
      /password|secret|key|token/i // Sensitive keywords
    ];
    
    return sensitivePatterns.some(pattern => pattern.test(value));
  }

  validateVercelConfiguration() {
    console.log('⚙️ Validating Vercel configuration...');
    
    const vercelIssues = [];
    const vercelWarnings = [];
    
    // Check vercel.json file
    const vercelConfigPath = path.join(__dirname, '../vercel.json');
    if (!fs.existsSync(vercelConfigPath)) {
      vercelIssues.push('Missing vercel.json file');
      return {
        passed: false,
        issues: vercelIssues,
        warnings: vercelWarnings
      };
    }
    
    try {
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      
      // Validate functions configuration
      if (!vercelConfig.functions) {
        vercelWarnings.push('No functions configuration found in vercel.json');
      } else {
        Object.entries(VERCEL_CONFIG_REQUIREMENTS.functions).forEach(([func, config]) => {
          if (!vercelConfig.functions[func]) {
            vercelWarnings.push(`Missing function configuration for ${func}`);
          } else if (vercelConfig.functions[func].maxDuration !== config.maxDuration) {
            vercelWarnings.push(`Incorrect maxDuration for ${func}: expected ${config.maxDuration}, got ${vercelConfig.functions[func].maxDuration}`);
          }
        });
      }
      
      // Validate cron jobs
      if (!vercelConfig.crons) {
        vercelWarnings.push('No cron jobs configuration found in vercel.json');
      } else {
        VERCEL_CONFIG_REQUIREMENTS.crons.forEach(requiredCron => {
          const found = vercelConfig.crons.find(cron => cron.path === requiredCron.path);
          if (!found) {
            vercelWarnings.push(`Missing cron job for ${requiredCron.path}`);
          } else if (found.schedule !== requiredCron.schedule) {
            vercelWarnings.push(`Incorrect schedule for ${requiredCron.path}: expected ${requiredCron.schedule}, got ${found.schedule}`);
          }
        });
      }
      
    } catch (error) {
      vercelIssues.push(`Invalid vercel.json file: ${error.message}`);
    }
    
    this.issues.push(...vercelIssues);
    this.warnings.push(...vercelWarnings);
    
    return {
      passed: vercelIssues.length === 0,
      issues: vercelIssues,
      warnings: vercelWarnings
    };
  }

  validateNextJsConfiguration() {
    console.log('⚛️ Validating Next.js configuration...');
    
    const nextIssues = [];
    const nextWarnings = [];
    
    // Check next.config.mjs file
    const nextConfigPath = path.join(__dirname, '../next.config.mjs');
    if (!fs.existsSync(nextConfigPath)) {
      nextIssues.push('Missing next.config.mjs file');
      return {
        passed: false,
        issues: nextIssues,
        warnings: nextWarnings
      };
    }
    
    try {
      const configContent = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Check for essential security headers
      const requiredHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'Referrer-Policy'
      ];
      
      requiredHeaders.forEach(header => {
        if (!configContent.includes(header)) {
          nextIssues.push(`Missing security header: ${header}`);
        }
      });
      
      // Check for Sentry configuration
      if (!configContent.includes('withSentryConfig')) {
        nextWarnings.push('Sentry configuration not found in next.config.mjs');
      }
      
      // Check for image optimization
      if (!configContent.includes('images:')) {
        nextWarnings.push('Image optimization configuration not found');
      }
      
      // Check for compression
      if (!configContent.includes('compress: true')) {
        nextWarnings.push('Compression not enabled in Next.js config');
      }
      
      // Check for powered by header removal
      if (!configContent.includes('poweredByHeader: false')) {
        nextWarnings.push('X-Powered-By header not disabled');
      }
      
    } catch (error) {
      nextIssues.push(`Error reading next.config.mjs: ${error.message}`);
    }
    
    this.issues.push(...nextIssues);
    this.warnings.push(...nextWarnings);
    
    return {
      passed: nextIssues.length === 0,
      issues: nextIssues,
      warnings: nextWarnings
    };
  }

  validateBuildConfiguration() {
    console.log('🏗️ Validating build configuration...');
    
    const buildIssues = [];
    const buildWarnings = [];
    
    // Check package.json scripts
    const packageJsonPath = path.join(__dirname, '../package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      const requiredScripts = ['build', 'start', 'lint'];
      requiredScripts.forEach(script => {
        if (!packageJson.scripts[script]) {
          buildIssues.push(`Missing required script: ${script}`);
        }
      });
      
      // Check for audit scripts
      const auditScripts = ['audit:performance', 'audit:security'];
      auditScripts.forEach(script => {
        if (!packageJson.scripts[script]) {
          buildWarnings.push(`Missing audit script: ${script}`);
        }
      });
      
      // Check for test scripts
      const testScripts = ['test:e2e'];
      testScripts.forEach(script => {
        if (!packageJson.scripts[script]) {
          buildWarnings.push(`Missing test script: ${script}`);
        }
      });
    }
    
    // Check TypeScript configuration
    const tsConfigPath = path.join(__dirname, '../tsconfig.json');
    if (!fs.existsSync(tsConfigPath)) {
      buildIssues.push('Missing tsconfig.json file');
    } else {
      try {
        const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
        
        if (!tsConfig.compilerOptions?.strict) {
          buildWarnings.push('TypeScript strict mode not enabled');
        }
        
        if (!tsConfig.compilerOptions?.skipLibCheck) {
          buildWarnings.push('TypeScript skipLibCheck not enabled (may cause build issues)');
        }
        
      } catch (error) {
        buildIssues.push(`Invalid tsconfig.json: ${error.message}`);
      }
    }
    
    // Check ESLint configuration
    const eslintConfigPath = path.join(__dirname, '../.eslintrc.json');
    if (!fs.existsSync(eslintConfigPath)) {
      buildWarnings.push('Missing .eslintrc.json file');
    }
    
    // Check Prettier configuration
    const prettierConfigPath = path.join(__dirname, '../.prettierrc.json');
    if (!fs.existsSync(prettierConfigPath)) {
      buildWarnings.push('Missing .prettierrc.json file');
    }
    
    this.issues.push(...buildIssues);
    this.warnings.push(...buildWarnings);
    
    return {
      passed: buildIssues.length === 0,
      issues: buildIssues,
      warnings: buildWarnings
    };
  }

  validateDomainAndSSL() {
    console.log('🌐 Validating domain and SSL configuration...');
    
    const domainIssues = [];
    const domainWarnings = [];
    
    // Check if domain is configured
    const domain = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;
    if (!domain) {
      domainWarnings.push('No domain configured in environment variables');
    } else {
      // Check if domain uses HTTPS
      if (!domain.startsWith('https://')) {
        domainIssues.push('Domain should use HTTPS in production');
      }
      
      // Check domain format
      if (!domain.includes('.')) {
        domainWarnings.push('Domain format seems incorrect');
      }
    }
    
    // Check for custom domain configuration
    const vercelConfigPath = path.join(__dirname, '../vercel.json');
    if (fs.existsSync(vercelConfigPath)) {
      try {
        const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
        
        if (!vercelConfig.domains && !vercelConfig.alias) {
          domainWarnings.push('No custom domain configured in vercel.json');
        }
        
      } catch (error) {
        // Already handled in validateVercelConfiguration
      }
    }
    
    this.issues.push(...domainIssues);
    this.warnings.push(...domainWarnings);
    
    return {
      passed: domainIssues.length === 0,
      issues: domainIssues,
      warnings: domainWarnings
    };
  }

  testProductionBuild() {
    console.log('🚀 Testing production build...');
    
    const buildIssues = [];
    const buildWarnings = [];
    
    try {
      // Run build command
      console.log('  Running npm run build...');
      const buildOutput = execSync('npm run build', { 
        encoding: 'utf8',
        timeout: 300000 // 5 minutes
      });
      
      // Check for build warnings
      if (buildOutput.includes('Warning:')) {
        buildWarnings.push('Build completed with warnings');
      }
      
      // Check for build errors
      if (buildOutput.includes('Error:')) {
        buildIssues.push('Build completed with errors');
      }
      
      // Check if .next directory was created
      const nextDir = path.join(__dirname, '../.next');
      if (!fs.existsSync(nextDir)) {
        buildIssues.push('Build did not create .next directory');
      }
      
      console.log('  ✅ Build completed successfully');
      
    } catch (error) {
      buildIssues.push(`Build failed: ${error.message}`);
      console.log('  ❌ Build failed');
    }
    
    this.issues.push(...buildIssues);
    this.warnings.push(...buildWarnings);
    
    return {
      passed: buildIssues.length === 0,
      issues: buildIssues,
      warnings: buildWarnings
    };
  }

  generateProductionReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: this.issues.length,
        totalWarnings: this.warnings.length,
        readyForProduction: this.issues.length === 0
      },
      issues: this.issues,
      warnings: this.warnings,
      recommendations: this.generateRecommendations()
    };
    
    // Save detailed report
    const reportPath = path.join(this.reportDir, 'v1-production-config.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Generate recommendations based on issues
    this.issues.forEach(issue => {
      if (issue.includes('environment variable')) {
        recommendations.push({
          category: 'Environment Variables',
          priority: 'high',
          action: 'Configure missing environment variables in Vercel dashboard',
          details: issue
        });
      } else if (issue.includes('vercel.json')) {
        recommendations.push({
          category: 'Vercel Configuration',
          priority: 'high',
          action: 'Fix Vercel configuration file',
          details: issue
        });
      } else if (issue.includes('security header')) {
        recommendations.push({
          category: 'Security',
          priority: 'high',
          action: 'Add missing security headers to next.config.mjs',
          details: issue
        });
      } else if (issue.includes('build')) {
        recommendations.push({
          category: 'Build',
          priority: 'critical',
          action: 'Fix build configuration and dependencies',
          details: issue
        });
      }
    });
    
    // Generate recommendations based on warnings
    this.warnings.forEach(warning => {
      if (warning.includes('audit script')) {
        recommendations.push({
          category: 'Testing',
          priority: 'medium',
          action: 'Add missing audit scripts to package.json',
          details: warning
        });
      } else if (warning.includes('domain')) {
        recommendations.push({
          category: 'Domain Configuration',
          priority: 'medium',
          action: 'Configure custom domain in Vercel',
          details: warning
        });
      }
    });
    
    return recommendations;
  }

  printProductionReport(report) {
    console.log('\n🚀 V1 Production Configuration Report');
    console.log('====================================');
    
    console.log(`\n📊 Summary:`);
    console.log(`  Total Issues: ${report.summary.totalIssues}`);
    console.log(`  Total Warnings: ${report.summary.totalWarnings}`);
    console.log(`  Ready for Production: ${report.summary.readyForProduction ? '✅ YES' : '❌ NO'}`);
    
    if (report.issues.length > 0) {
      console.log(`\n🚨 Issues (Must Fix):`);
      report.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
    }
    
    if (report.warnings.length > 0) {
      console.log(`\n⚠️ Warnings (Recommended):`);
      report.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }
    
    if (report.recommendations.length > 0) {
      console.log(`\n💡 Recommendations:`);
      report.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.category} (${rec.priority} priority)`);
        console.log(`     Action: ${rec.action}`);
        console.log(`     Details: ${rec.details}`);
      });
    }
    
    console.log(`\n📁 Detailed report saved to: ${path.join(this.reportDir, 'v1-production-config.json')}`);
  }

  createEnvExample() {
    console.log('📝 Creating .env.example file...');
    
    const envExampleContent = Object.entries(REQUIRED_ENV_VARS)
      .map(([key, config]) => {
        const required = config.required ? '# REQUIRED' : '# OPTIONAL';
        const example = config.sensitive ? 'your-secret-key-here' : 'your-value-here';
        return `${required}\n# ${config.description}\n${key}=${example}\n`;
      })
      .join('\n');
    
    const envExamplePath = path.join(__dirname, '../.env.example');
    fs.writeFileSync(envExamplePath, envExampleContent);
    
    console.log('✅ Created .env.example file');
  }
}

// Main execution
async function main() {
  const validator = new ProductionConfigValidator();
  
  console.log('🚀 Starting V1 Production Configuration Validation...\n');
  
  // Run all validations
  const envResult = validator.validateEnvironmentVariables();
  const vercelResult = validator.validateVercelConfiguration();
  const nextResult = validator.validateNextJsConfiguration();
  const buildResult = validator.validateBuildConfiguration();
  const domainResult = validator.validateDomainAndSSL();
  
  // Test production build
  const buildTestResult = validator.testProductionBuild();
  
  // Create .env.example if it doesn't exist
  const envExamplePath = path.join(__dirname, '../.env.example');
  if (!fs.existsSync(envExamplePath)) {
    validator.createEnvExample();
  }
  
  // Generate and print report
  const report = validator.generateProductionReport();
  validator.printProductionReport(report);
  
  // Exit with error code if issues found
  if (!report.summary.readyForProduction) {
    console.log('\n❌ Production configuration has issues. Please fix them before deployment.');
    process.exit(1);
  }
  
  console.log('\n✅ Production configuration is ready!');
}

// Run the validation
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Production configuration validation failed:', error);
    process.exit(1);
  });
}

module.exports = { ProductionConfigValidator, REQUIRED_ENV_VARS, VERCEL_CONFIG_REQUIREMENTS }; 