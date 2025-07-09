#!/usr/bin/env node

/**
 * Comprehensive Security Check Script for Next.js Portfolio
 * Implements 2024 security best practices for static portfolio sites
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔐 Starting Comprehensive Security Assessment...\n');

// Initialize results object for tracking security checks
const results = {
  dependencyAudit: { passed: false, details: [] },
  securityHeaders: { passed: false, details: [] },
  environmentVariables: { passed: false, details: [] },
  codeSecurityPatterns: { passed: false, details: [] },
  externalLinksValidation: { passed: false, details: [] }
};

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function logStep(message) {
  console.log(`${colors.blue}📋 ${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

// 1. Dependency Security Audit
function checkDependencyVulnerabilities() {
  logStep('Checking dependency vulnerabilities...');
  
  try {
    // Run npm audit with JSON output for detailed analysis
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
    const auditData = JSON.parse(auditResult);
    
    const highVulns = auditData.vulnerabilities ? 
      Object.values(auditData.vulnerabilities).filter(vuln => 
        vuln.severity === 'high' || vuln.severity === 'critical'
      ) : [];
    
    if (highVulns.length === 0) {
      logSuccess('No high or critical severity vulnerabilities found');
      results.dependencyAudit.passed = true;
      results.dependencyAudit.details.push('All dependencies passed security audit');
    } else {
      logError(`Found ${highVulns.length} high/critical vulnerabilities`);
      highVulns.forEach(vuln => {
        results.dependencyAudit.details.push(`${vuln.name}: ${vuln.severity} - ${vuln.title}`);
      });
    }
  } catch (error) {
    if (error.status === 1) {
      logWarning('npm audit found vulnerabilities, checking severity...');
      try {
        const auditResult = execSync('npm audit --audit-level=high --json', { encoding: 'utf8' });
        logSuccess('No high or critical vulnerabilities (only low/moderate found)');
        results.dependencyAudit.passed = true;
        results.dependencyAudit.details.push('Only low/moderate severity vulnerabilities found');
      } catch (highLevelError) {
        logError('High or critical vulnerabilities detected');
        results.dependencyAudit.details.push('High/critical vulnerabilities found - run npm audit for details');
      }
    } else {
      logError('Failed to run dependency audit');
      results.dependencyAudit.details.push(`Audit failed: ${error.message}`);
    }
  }
}

// 2. Security Headers Validation
function validateSecurityHeaders() {
  logStep('Validating security headers configuration...');
  
  try {
    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Check for essential security headers
    const requiredHeaders = [
      'X-Content-Type-Options',
      'X-Frame-Options', 
      'X-XSS-Protection',
      'Referrer-Policy',
      'Content-Security-Policy'
    ];
    
    const missingHeaders = requiredHeaders.filter(header => 
      !configContent.includes(header)
    );
    
    if (missingHeaders.length === 0) {
      logSuccess('All essential security headers configured');
      results.securityHeaders.passed = true;
      results.securityHeaders.details.push('All required headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, CSP');
      
      // Validate CSP configuration
      if (configContent.includes('Content-Security-Policy')) {
        logInfo('CSP detected - validating configuration...');
        
        // Check for common CSP directives
        const cspDirectives = [
          'default-src',
          'script-src', 
          'style-src',
          'img-src',
          'connect-src'
        ];
        
        const foundDirectives = cspDirectives.filter(directive =>
          configContent.includes(directive)
        );
        
        results.securityHeaders.details.push(`CSP directives found: ${foundDirectives.join(', ')}`);
        
        // Check for analytics domains in CSP
        if (configContent.includes('vercel-scripts.com') && configContent.includes('vercel-insights.com')) {
          logSuccess('Analytics domains properly whitelisted in CSP');
          results.securityHeaders.details.push('Vercel Analytics domains properly configured in CSP');
        } else {
          logWarning('Verify analytics domains are properly whitelisted in CSP');
        }
      }
    } else {
      logError(`Missing security headers: ${missingHeaders.join(', ')}`);
      results.securityHeaders.details.push(`Missing headers: ${missingHeaders.join(', ')}`);
    }
  } catch (error) {
    logError('Failed to validate security headers configuration');
    results.securityHeaders.details.push(`Header validation failed: ${error.message}`);
  }
}

// 3. Environment Variables Security
function checkEnvironmentVariables() {
  logStep('Checking environment variable security...');
  
  try {
    // Check for .env files
    const envFiles = ['.env', '.env.local', '.env.production', '.env.development'];
    const foundEnvFiles = envFiles.filter(file => 
      fs.existsSync(path.join(process.cwd(), file))
    );
    
    if (foundEnvFiles.length > 0) {
      logInfo(`Found environment files: ${foundEnvFiles.join(', ')}`);
      results.environmentVariables.details.push(`Environment files: ${foundEnvFiles.join(', ')}`);
      
      // Check if .env files are in .gitignore
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        
        if (gitignoreContent.includes('.env') || gitignoreContent.includes('.env.local')) {
          logSuccess('Environment files properly ignored in git');
          results.environmentVariables.details.push('Environment files properly gitignored');
        } else {
          logWarning('Ensure .env files are added to .gitignore');
          results.environmentVariables.details.push('Warning: Check .env files are gitignored');
        }
      }
    }
    
    // Check for NEXT_PUBLIC_ prefix pattern in code
    const configPath = path.join(process.cwd(), 'config/environment.ts');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Look for proper environment variable handling
      if (configContent.includes('process.env.NEXT_PUBLIC_')) {
        logSuccess('Proper client-side environment variable handling detected');
        results.environmentVariables.details.push('NEXT_PUBLIC_ prefix pattern used correctly');
      }
      
      if (configContent.includes('validateEnvironment')) {
        logSuccess('Environment validation function detected');
        results.environmentVariables.details.push('Environment validation implemented');
      }
      
      results.environmentVariables.passed = true;
    } else {
      logWarning('No environment configuration file found');
      results.environmentVariables.passed = true; // Not required
      results.environmentVariables.details.push('No environment config file (acceptable for simple portfolios)');
    }
  } catch (error) {
    logError('Failed to check environment variables');
    results.environmentVariables.details.push(`Environment check failed: ${error.message}`);
  }
}

// 4. Code Security Pattern Analysis
function analyzeCodeSecurity() {
  logStep('Analyzing code for security patterns...');
  
  try {
    // Check for dangerouslySetInnerHTML usage
    const srcPath = path.join(process.cwd(), 'components');
    const appPath = path.join(process.cwd(), 'app');
    
    let dangerousHTMLFound = false;
    let noopenerIssues = false;
    
    function scanDirectory(dirPath) {
      if (!fs.existsSync(dirPath)) return;
      
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      
      files.forEach(file => {
        if (file.isDirectory()) {
          scanDirectory(path.join(dirPath, file.name));
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
          const filePath = path.join(dirPath, file.name);
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for dangerouslySetInnerHTML
          if (content.includes('dangerouslySetInnerHTML')) {
            // Check if it's in layout.tsx with security comment (documented exception)
            if (file.name === 'layout.tsx' && content.includes('Security Note:')) {
              results.codeSecurityPatterns.details.push(`dangerouslySetInnerHTML found in ${file.name} (documented safe usage for JSON-LD)`);
            } else {
              dangerousHTMLFound = true;
              results.codeSecurityPatterns.details.push(`dangerouslySetInnerHTML found in ${file.name} (requires review)`);
            }
          }
          
          // Check for external links without noopener/noreferrer
          const linkMatches = content.match(/<a[^>]*target=["']_blank["'][^>]*>/g);
          if (linkMatches) {
            linkMatches.forEach(link => {
              if (!link.includes('rel=') || 
                  (!link.includes('noopener') && !link.includes('noreferrer'))) {
                noopenerIssues = true;
                results.codeSecurityPatterns.details.push(`External link without noopener/noreferrer in ${file.name}`);
              }
            });
          }
        }
      });
    }
    
    scanDirectory(srcPath);
    scanDirectory(appPath);
    
    if (!dangerousHTMLFound) {
      logSuccess('No dangerouslySetInnerHTML usage found');
      results.codeSecurityPatterns.details.push('No dangerous HTML injection patterns');
    } else {
      logWarning('dangerouslySetInnerHTML usage detected - ensure content is sanitized');
    }
    
    if (!noopenerIssues) {
      logSuccess('External links properly secured with noopener/noreferrer');
      results.codeSecurityPatterns.details.push('External links properly secured');
    } else {
      logWarning('Some external links missing security attributes');
    }
    
    // Check overall security pattern compliance
    results.codeSecurityPatterns.passed = !dangerousHTMLFound && !noopenerIssues;
    
  } catch (error) {
    logError('Failed to analyze code security patterns');
    results.codeSecurityPatterns.details.push(`Code analysis failed: ${error.message}`);
  }
}

// 5. External Links and Content Validation
function validateExternalContent() {
  logStep('Validating external content and links...');
  
  try {
    const dataPath = path.join(process.cwd(), 'data/index.ts');
    
    if (fs.existsSync(dataPath)) {
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      
      // Extract URLs from the data file
      const urlMatches = dataContent.match(/https?:\/\/[^\s"']+/g);
      
      if (urlMatches) {
        logInfo(`Found ${urlMatches.length} external URLs in data configuration`);
        results.externalLinksValidation.details.push(`${urlMatches.length} external URLs detected`);
        
        // Check for secure (HTTPS) links
        const httpLinks = urlMatches.filter(url => url.startsWith('http://'));
        const httpsLinks = urlMatches.filter(url => url.startsWith('https://'));
        
        if (httpLinks.length === 0) {
          logSuccess('All external links use HTTPS');
          results.externalLinksValidation.details.push('All external links are HTTPS secured');
        } else {
          logWarning(`Found ${httpLinks.length} insecure HTTP links`);
          results.externalLinksValidation.details.push(`${httpLinks.length} HTTP links found (consider upgrading to HTTPS)`);
        }
        
        // Check for known safe domains
        const trustedDomains = [
          'github.com',
          'linkedin.com', 
          'vercel.com',
          'utfs.io',
          'fonts.googleapis.com',
          'fonts.gstatic.com'
        ];
        
        const suspiciousDomains = urlMatches.filter(url => {
          const domain = url.replace(/https?:\/\//, '').split('/')[0];
          return !trustedDomains.some(trusted => domain.includes(trusted));
        });
        
        if (suspiciousDomains.length === 0) {
          logSuccess('All external domains are recognized/trusted');
          results.externalLinksValidation.details.push('All domains verified as trusted');
        } else {
          logInfo(`External domains to verify: ${suspiciousDomains.length}`);
          results.externalLinksValidation.details.push('External domains present (manual verification recommended)');
        }
      }
      
      results.externalLinksValidation.passed = true;
    } else {
      logWarning('No data configuration file found');
      results.externalLinksValidation.passed = true;
      results.externalLinksValidation.details.push('No external data configuration found');
    }
  } catch (error) {
    logError('Failed to validate external content');
    results.externalLinksValidation.details.push(`External content validation failed: ${error.message}`);
  }
}

// 6. Generate Vulnerability Report
function generateVulnerabilityReport() {
  logStep('Generating comprehensive vulnerability report...');
  
  try {
    const reportData = {
      timestamp: new Date().toISOString(),
      projectName: 'Personal Portfolio',
      scanType: 'Comprehensive Security Assessment',
      results: results,
      recommendations: [],
      summary: {
        totalChecks: Object.keys(results).length,
        passedChecks: Object.values(results).filter(r => r.passed).length,
        overallStatus: 'unknown'
      }
    };
    
    // Calculate overall security status
    const passRate = reportData.summary.passedChecks / reportData.summary.totalChecks;
    if (passRate >= 0.8) {
      reportData.summary.overallStatus = 'excellent';
    } else if (passRate >= 0.6) {
      reportData.summary.overallStatus = 'good';
    } else if (passRate >= 0.4) {
      reportData.summary.overallStatus = 'needs_improvement';
    } else {
      reportData.summary.overallStatus = 'critical';
    }
    
    // Generate recommendations
    if (!results.dependencyAudit.passed) {
      reportData.recommendations.push('Run npm audit --fix to resolve dependency vulnerabilities');
      reportData.recommendations.push('Consider using Dependabot for automated dependency updates');
    }
    
    if (!results.securityHeaders.passed) {
      reportData.recommendations.push('Configure missing security headers in next.config.mjs');
      reportData.recommendations.push('Test headers using tools like securityheaders.com');
    }
    
    if (!results.codeSecurityPatterns.passed) {
      reportData.recommendations.push('Review and secure code patterns flagged in the analysis');
      reportData.recommendations.push('Consider adding ESLint security rules');
    }
    
    // Always recommend external validation
    reportData.recommendations.push('Validate deployment with external tools:');
    reportData.recommendations.push('- Mozilla Observatory: https://observatory.mozilla.org/');
    reportData.recommendations.push('- SecurityHeaders.com: https://securityheaders.com/');
    reportData.recommendations.push('- SSL Labs: https://www.ssllabs.com/ssltest/');
    
    // Save report
    const reportsDir = path.join(process.cwd(), '.taskmaster/reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = path.join(reportsDir, 'security-assessment-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    logSuccess(`Security report generated: ${reportPath}`);
    
    return reportData;
  } catch (error) {
    logError('Failed to generate vulnerability report');
    console.error(`Report generation failed: ${error.message}`);
    return null;
  }
}

// 7. Display Summary
function displaySummary(reportData) {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bold}🔐 SECURITY ASSESSMENT SUMMARY${colors.reset}`);
  console.log('='.repeat(60));
  
  const { summary } = reportData;
  
  // Overall status
  const statusColor = summary.overallStatus === 'excellent' ? colors.green :
                     summary.overallStatus === 'good' ? colors.yellow :
                     summary.overallStatus === 'needs_improvement' ? colors.yellow : colors.red;
  
  console.log(`${colors.bold}Overall Security Status:${colors.reset} ${statusColor}${summary.overallStatus.toUpperCase()}${colors.reset}`);
  console.log(`${colors.bold}Checks Passed:${colors.reset} ${summary.passedChecks}/${summary.totalChecks}`);
  console.log(`${colors.bold}Pass Rate:${colors.reset} ${Math.round((summary.passedChecks / summary.totalChecks) * 100)}%\n`);
  
  // Detailed results
  Object.entries(results).forEach(([category, result]) => {
    const icon = result.passed ? '✅' : '❌';
    const categoryName = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    console.log(`${icon} ${colors.bold}${categoryName}${colors.reset}`);
    result.details.forEach(detail => {
      console.log(`   └─ ${detail}`);
    });
    console.log('');
  });
  
  // Recommendations
  if (reportData.recommendations.length > 0) {
    console.log(`${colors.bold}📝 RECOMMENDATIONS:${colors.reset}`);
    reportData.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
    console.log('');
  }
  
  console.log(`${colors.bold}📊 Report Location:${colors.reset} .taskmaster/reports/security-assessment-report.json`);
  console.log('='.repeat(60));
  
  // Exit with appropriate code
  const exitCode = summary.overallStatus === 'critical' ? 1 : 0;
  if (exitCode !== 0) {
    console.log(`${colors.red}❌ Security assessment failed. Address critical issues before deployment.${colors.reset}`);
  } else {
    console.log(`${colors.green}✅ Security assessment completed successfully.${colors.reset}`);
  }
  
  return exitCode;
}

// Main execution
async function runSecurityAssessment() {
  try {
    checkDependencyVulnerabilities();
    validateSecurityHeaders();
    checkEnvironmentVariables();
    analyzeCodeSecurity();
    validateExternalContent();
    const reportData = generateVulnerabilityReport();
    
    if (reportData) {
      const exitCode = displaySummary(reportData);
      process.exit(exitCode);
    } else {
      logError('Security assessment failed to complete');
      process.exit(1);
    }
  } catch (error) {
    logError(`Security assessment failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the assessment
runSecurityAssessment(); 