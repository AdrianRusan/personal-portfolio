const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Security test configurations
const SECURITY_TESTS = {
  // OWASP Top 10 tests
  xss: {
    payloads: [
      '<script>alert("XSS")</script>',
      '"><script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '<img src=x onerror=alert("XSS")>',
      '<svg onload=alert("XSS")>',
      '${alert("XSS")}',
      '{{alert("XSS")}}',
      '<iframe src="javascript:alert(\'XSS\')"></iframe>'
    ]
  },
  sqlInjection: {
    payloads: [
      "'; DROP TABLE users; --",
      "' OR '1'='1",
      "' UNION SELECT * FROM users --",
      "admin'--",
      "admin' #",
      "admin'/*",
      "' OR 1=1--",
      "' OR 'a'='a",
      "') OR ('1'='1"
    ]
  },
  commandInjection: {
    payloads: [
      '; ls -la',
      '| whoami',
      '&& cat /etc/passwd',
      '`whoami`',
      '$(whoami)',
      '; rm -rf /',
      '| ping -c 1 127.0.0.1',
      '&& curl http://malicious.com'
    ]
  },
  pathTraversal: {
    payloads: [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32\\drivers\\etc\\hosts',
      '....//....//....//etc/passwd',
      '%2e%2e%2f%2e%2e%2f%2e%2e%2f%65%74%63%2f%70%61%73%73%77%64',
      '..%252f..%252f..%252fetc%252fpasswd',
      '..%c0%af..%c0%af..%c0%afetc%c0%afpasswd'
    ]
  }
};

// API endpoints to test
const API_ENDPOINTS = [
  {
    path: '/api/contact',
    method: 'POST',
    requiresAuth: false,
    hasFileUpload: false,
    expectedFields: ['fullName', 'email', 'projectType', 'budgetRange', 'timeline', 'projectDescription', 'source']
  },
  {
    path: '/api/github',
    method: 'GET',
    requiresAuth: false,
    hasFileUpload: false,
    expectedFields: []
  },
  {
    path: '/api/health',
    method: 'GET',
    requiresAuth: false,
    hasFileUpload: false,
    expectedFields: []
  },
  {
    path: '/api/webhooks/revalidate-static',
    method: 'POST',
    requiresAuth: true,
    hasFileUpload: false,
    expectedFields: []
  }
];

class SecurityAuditor {
  constructor() {
    this.results = [];
    this.vulnerabilities = [];
    this.reportDir = path.join(__dirname, '../.taskmaster/reports');
    this.ensureReportDir();
  }

  ensureReportDir() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  async runDependencyAudit() {
    console.log('🔍 Running dependency vulnerability scan...');
    
    try {
      // Run npm audit
      const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
      const auditData = JSON.parse(auditResult);
      
      const vulnerabilities = [];
      if (auditData.vulnerabilities) {
        Object.entries(auditData.vulnerabilities).forEach(([pkg, vuln]) => {
          if (vuln.severity === 'high' || vuln.severity === 'critical') {
            vulnerabilities.push({
              package: pkg,
              severity: vuln.severity,
              title: vuln.title,
              url: vuln.url,
              fixAvailable: vuln.fixAvailable
            });
          }
        });
      }
      
      return {
        passed: vulnerabilities.length === 0,
        vulnerabilities,
        totalVulnerabilities: auditData.metadata?.vulnerabilities?.total || 0,
        highSeverity: auditData.metadata?.vulnerabilities?.high || 0,
        criticalSeverity: auditData.metadata?.vulnerabilities?.critical || 0
      };
      
    } catch (error) {
      console.error('❌ Dependency audit failed:', error.message);
      return {
        passed: false,
        error: error.message,
        vulnerabilities: []
      };
    }
  }

  async testAPIEndpointSecurity(endpoint) {
    console.log(`🔒 Testing security for ${endpoint.method} ${endpoint.path}...`);
    
    const results = {
      endpoint: endpoint.path,
      method: endpoint.method,
      tests: [],
      passed: true
    };

    // Test rate limiting
    const rateLimitResult = await this.testRateLimit(endpoint);
    results.tests.push(rateLimitResult);
    if (!rateLimitResult.passed) results.passed = false;

    // Test input validation
    const inputValidationResult = await this.testInputValidation(endpoint);
    results.tests.push(inputValidationResult);
    if (!inputValidationResult.passed) results.passed = false;

    // Test XSS protection
    const xssResult = await this.testXSSProtection(endpoint);
    results.tests.push(xssResult);
    if (!xssResult.passed) results.passed = false;

    // Test SQL injection (if applicable)
    if (endpoint.expectedFields.length > 0) {
      const sqlResult = await this.testSQLInjection(endpoint);
      results.tests.push(sqlResult);
      if (!sqlResult.passed) results.passed = false;
    }

    // Test authentication bypass
    if (endpoint.requiresAuth) {
      const authResult = await this.testAuthenticationBypass(endpoint);
      results.tests.push(authResult);
      if (!authResult.passed) results.passed = false;
    }

    // Test CORS headers
    const corsResult = await this.testCORSHeaders(endpoint);
    results.tests.push(corsResult);
    if (!corsResult.passed) results.passed = false;

    return results;
  }

  async testRateLimit(endpoint) {
    const testName = 'Rate Limiting';
    try {
      const requests = [];
      const testData = this.generateTestData(endpoint);
      
      // Send 20 rapid requests
      for (let i = 0; i < 20; i++) {
        const promise = fetch(`http://localhost:3000${endpoint.path}`, {
          method: endpoint.method,
          headers: { 'Content-Type': 'application/json' },
          body: endpoint.method === 'POST' ? JSON.stringify(testData) : undefined
        });
        requests.push(promise);
      }
      
      const responses = await Promise.all(requests);
      const rateLimited = responses.some(r => r.status === 429);
      
      return {
        name: testName,
        passed: rateLimited, // Should be rate limited
        message: rateLimited ? 'Rate limiting is working' : 'No rate limiting detected',
        details: `Sent 20 rapid requests, ${responses.filter(r => r.status === 429).length} were rate limited`
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `Rate limit test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  async testInputValidation(endpoint) {
    const testName = 'Input Validation';
    try {
      const maliciousPayloads = [
        ...SECURITY_TESTS.xss.payloads,
        ...SECURITY_TESTS.commandInjection.payloads
      ];
      
      let vulnerabilityFound = false;
      const testResults = [];
      
      for (const payload of maliciousPayloads.slice(0, 5)) { // Test first 5 payloads
        const testData = this.generateTestData(endpoint, payload);
        
        const response = await fetch(`http://localhost:3000${endpoint.path}`, {
          method: endpoint.method,
          headers: { 'Content-Type': 'application/json' },
          body: endpoint.method === 'POST' ? JSON.stringify(testData) : undefined
        });
        
        const responseText = await response.text();
        
        // Check if payload is reflected in response (potential XSS)
        if (responseText.includes(payload)) {
          vulnerabilityFound = true;
          testResults.push(`Payload reflected: ${payload}`);
        }
        
        // Check if server error occurred (potential injection)
        if (response.status >= 500) {
          testResults.push(`Server error with payload: ${payload}`);
        }
      }
      
      return {
        name: testName,
        passed: !vulnerabilityFound,
        message: vulnerabilityFound ? 'Input validation vulnerabilities found' : 'Input validation is working',
        details: testResults.join(', ')
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `Input validation test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  async testXSSProtection(endpoint) {
    const testName = 'XSS Protection';
    try {
      const xssPayloads = SECURITY_TESTS.xss.payloads.slice(0, 3);
      let vulnerabilityFound = false;
      const testResults = [];
      
      for (const payload of xssPayloads) {
        const testData = this.generateTestData(endpoint, payload);
        
        const response = await fetch(`http://localhost:3000${endpoint.path}`, {
          method: endpoint.method,
          headers: { 'Content-Type': 'application/json' },
          body: endpoint.method === 'POST' ? JSON.stringify(testData) : undefined
        });
        
        const responseText = await response.text();
        const contentType = response.headers.get('content-type');
        
        // Check for XSS vulnerabilities
        if (responseText.includes(payload) && contentType?.includes('text/html')) {
          vulnerabilityFound = true;
          testResults.push(`XSS payload reflected: ${payload}`);
        }
        
        // Check for proper content type
        if (contentType && !contentType.includes('application/json') && endpoint.path.startsWith('/api/')) {
          testResults.push(`Unexpected content type: ${contentType}`);
        }
      }
      
      return {
        name: testName,
        passed: !vulnerabilityFound,
        message: vulnerabilityFound ? 'XSS vulnerabilities found' : 'XSS protection is working',
        details: testResults.join(', ')
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `XSS protection test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  async testSQLInjection(endpoint) {
    const testName = 'SQL Injection Protection';
    try {
      const sqlPayloads = SECURITY_TESTS.sqlInjection.payloads.slice(0, 3);
      let vulnerabilityFound = false;
      const testResults = [];
      
      for (const payload of sqlPayloads) {
        const testData = this.generateTestData(endpoint, payload);
        
        const response = await fetch(`http://localhost:3000${endpoint.path}`, {
          method: endpoint.method,
          headers: { 'Content-Type': 'application/json' },
          body: endpoint.method === 'POST' ? JSON.stringify(testData) : undefined
        });
        
        const responseText = await response.text();
        
        // Check for SQL error messages
        const sqlErrors = ['sql', 'mysql', 'postgresql', 'sqlite', 'syntax error', 'database'];
        const hasError = sqlErrors.some(error => responseText.toLowerCase().includes(error));
        
        if (hasError) {
          vulnerabilityFound = true;
          testResults.push(`SQL error detected with payload: ${payload}`);
        }
        
        // Check for unexpected successful responses
        if (response.status === 200 && payload.includes('DROP TABLE')) {
          testResults.push(`Dangerous SQL payload accepted: ${payload}`);
        }
      }
      
      return {
        name: testName,
        passed: !vulnerabilityFound,
        message: vulnerabilityFound ? 'SQL injection vulnerabilities found' : 'SQL injection protection is working',
        details: testResults.join(', ')
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `SQL injection test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  async testAuthenticationBypass(endpoint) {
    const testName = 'Authentication Bypass';
    try {
      // Test without authentication
      const response = await fetch(`http://localhost:3000${endpoint.path}`, {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
        body: endpoint.method === 'POST' ? JSON.stringify({}) : undefined
      });
      
      const shouldBeUnauthorized = response.status === 401 || response.status === 403;
      
      return {
        name: testName,
        passed: shouldBeUnauthorized,
        message: shouldBeUnauthorized ? 'Authentication is properly enforced' : 'Authentication bypass detected',
        details: `Response status: ${response.status}`
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `Authentication test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  async testCORSHeaders(endpoint) {
    const testName = 'CORS Headers';
    try {
      const response = await fetch(`http://localhost:3000${endpoint.path}`, {
        method: 'OPTIONS',
        headers: { 
          'Origin': 'http://malicious.com',
          'Access-Control-Request-Method': endpoint.method
        }
      });
      
      const corsHeaders = {
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers')
      };
      
      // Check for overly permissive CORS
      const allowsAllOrigins = corsHeaders['access-control-allow-origin'] === '*';
      const allowsMaliciousOrigin = corsHeaders['access-control-allow-origin'] === 'http://malicious.com';
      
      const isSecure = !allowsAllOrigins && !allowsMaliciousOrigin;
      
      return {
        name: testName,
        passed: isSecure,
        message: isSecure ? 'CORS headers are properly configured' : 'CORS headers are too permissive',
        details: JSON.stringify(corsHeaders, null, 2)
      };
      
    } catch (error) {
      return {
        name: testName,
        passed: false,
        message: `CORS test failed: ${error.message}`,
        details: error.stack
      };
    }
  }

  generateTestData(endpoint, maliciousPayload = null) {
    const testData = {};
    
    endpoint.expectedFields.forEach(field => {
      switch (field) {
        case 'fullName':
          testData[field] = maliciousPayload || 'Test User';
          break;
        case 'email':
          testData[field] = maliciousPayload || 'test@example.com';
          break;
        case 'projectType':
          testData[field] = maliciousPayload || 'web-development';
          break;
        case 'budgetRange':
          testData[field] = maliciousPayload || '5000-10000';
          break;
        case 'timeline':
          testData[field] = maliciousPayload || '1-2-months';
          break;
        case 'projectDescription':
          testData[field] = maliciousPayload || 'Test project description';
          break;
        case 'source':
          testData[field] = maliciousPayload || 'test';
          break;
        default:
          testData[field] = maliciousPayload || 'test';
      }
    });
    
    return testData;
  }

  async checkSecurityHeaders() {
    console.log('🛡️ Checking security headers...');
    
    try {
      const response = await fetch('http://localhost:3000/');
      const headers = response.headers;
      
      const securityHeaders = {
        'x-frame-options': headers.get('x-frame-options'),
        'x-content-type-options': headers.get('x-content-type-options'),
        'x-xss-protection': headers.get('x-xss-protection'),
        'strict-transport-security': headers.get('strict-transport-security'),
        'content-security-policy': headers.get('content-security-policy'),
        'referrer-policy': headers.get('referrer-policy')
      };
      
      const recommendations = [];
      
      if (!securityHeaders['x-frame-options']) {
        recommendations.push('Add X-Frame-Options header to prevent clickjacking');
      }
      
      if (!securityHeaders['x-content-type-options']) {
        recommendations.push('Add X-Content-Type-Options: nosniff header');
      }
      
      if (!securityHeaders['content-security-policy']) {
        recommendations.push('Add Content-Security-Policy header');
      }
      
      if (!securityHeaders['referrer-policy']) {
        recommendations.push('Add Referrer-Policy header');
      }
      
      return {
        passed: recommendations.length === 0,
        headers: securityHeaders,
        recommendations
      };
      
    } catch (error) {
      return {
        passed: false,
        error: error.message,
        headers: {},
        recommendations: ['Unable to check security headers']
      };
    }
  }

  async checkEnvironmentVariables() {
    console.log('🔐 Checking environment variable security...');
    
    const sensitivePatterns = [
      'password',
      'secret',
      'key',
      'token',
      'auth',
      'api_key',
      'private'
    ];
    
    const issues = [];
    
    // Check if .env files are properly gitignored
    const gitignorePath = path.join(__dirname, '../.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      if (!gitignoreContent.includes('.env')) {
        issues.push('.env files are not properly gitignored');
      }
    } else {
      issues.push('.gitignore file not found');
    }
    
    // Check for hardcoded secrets in source code
    const sourceFiles = this.getSourceFiles();
    const hardcodedSecrets = [];
    
    sourceFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      sensitivePatterns.forEach(pattern => {
        const regex = new RegExp(`${pattern}.*=.*['"][^'"]{8,}['"]`, 'gi');
        const matches = content.match(regex);
        if (matches) {
          hardcodedSecrets.push({ file, matches });
        }
      });
    });
    
    if (hardcodedSecrets.length > 0) {
      issues.push(`Potential hardcoded secrets found in ${hardcodedSecrets.length} files`);
    }
    
    return {
      passed: issues.length === 0,
      issues,
      hardcodedSecrets: hardcodedSecrets.length
    };
  }

  getSourceFiles() {
    const files = [];
    const extensions = ['.js', '.ts', '.jsx', '.tsx'];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      });
    };
    
    scanDirectory(path.join(__dirname, '..'));
    return files.slice(0, 50); // Limit to first 50 files
  }

  generateSecurityReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.results.length,
        passedTests: this.results.filter(r => r.passed).length,
        vulnerabilities: this.vulnerabilities.length,
        overallPassed: this.results.every(r => r.passed) && this.vulnerabilities.length === 0
      },
      results: this.results,
      vulnerabilities: this.vulnerabilities,
      recommendations: this.generateSecurityRecommendations()
    };
    
    // Save detailed report
    const reportPath = path.join(this.reportDir, 'v1-security-audit.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  generateSecurityRecommendations() {
    const recommendations = [];
    
    // Analyze results and generate recommendations
    this.results.forEach(result => {
      if (!result.passed) {
        result.tests?.forEach(test => {
          if (!test.passed) {
            recommendations.push({
              category: 'API Security',
              endpoint: result.endpoint,
              issue: test.name,
              severity: this.getSeverity(test.name),
              recommendation: this.getRecommendation(test.name)
            });
          }
        });
      }
    });
    
    return recommendations;
  }

  getSeverity(testName) {
    const highSeverity = ['SQL Injection Protection', 'XSS Protection', 'Authentication Bypass'];
    const mediumSeverity = ['Input Validation', 'CORS Headers'];
    const lowSeverity = ['Rate Limiting'];
    
    if (highSeverity.includes(testName)) return 'high';
    if (mediumSeverity.includes(testName)) return 'medium';
    if (lowSeverity.includes(testName)) return 'low';
    return 'medium';
  }

  getRecommendation(testName) {
    const recommendations = {
      'SQL Injection Protection': 'Use parameterized queries and input validation',
      'XSS Protection': 'Implement proper output encoding and CSP headers',
      'Authentication Bypass': 'Implement proper authentication middleware',
      'Input Validation': 'Use schema validation (Zod) for all inputs',
      'CORS Headers': 'Configure CORS to allow only trusted origins',
      'Rate Limiting': 'Implement rate limiting middleware'
    };
    
    return recommendations[testName] || 'Review and fix the security issue';
  }

  printSecurityReport(report) {
    console.log('\n🔒 V1 Security Audit Results');
    console.log('============================');
    
    console.log(`\n📊 Summary:`);
    console.log(`  Total Tests: ${report.summary.totalTests}`);
    console.log(`  Passed Tests: ${report.summary.passedTests}/${report.summary.totalTests}`);
    console.log(`  Vulnerabilities: ${report.summary.vulnerabilities}`);
    console.log(`  Overall Status: ${report.summary.overallPassed ? '✅ SECURE' : '❌ VULNERABILITIES FOUND'}`);
    
    if (report.vulnerabilities.length > 0) {
      console.log(`\n🚨 Vulnerabilities:`);
      report.vulnerabilities.forEach(vuln => {
        console.log(`  ❌ ${vuln.package}: ${vuln.title} (${vuln.severity})`);
      });
    }
    
    if (report.recommendations.length > 0) {
      console.log(`\n💡 Security Recommendations:`);
      report.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.issue} (${rec.severity} severity)`);
        console.log(`     Endpoint: ${rec.endpoint}`);
        console.log(`     Fix: ${rec.recommendation}`);
      });
    }
    
    console.log(`\n📁 Detailed report saved to: ${path.join(this.reportDir, 'v1-security-audit.json')}`);
  }
}

// Main execution
async function main() {
  const auditor = new SecurityAuditor();
  
  console.log('🔒 Starting V1 Security Audit...\n');
  
  // Check if dev server is running
  try {
    const response = await fetch('http://localhost:3000');
    if (!response.ok) {
      throw new Error('Dev server not accessible');
    }
  } catch (error) {
    console.error('❌ Development server is not running. Please start it with: npm run dev');
    process.exit(1);
  }
  
  // Run dependency audit
  const depAudit = await auditor.runDependencyAudit();
  auditor.results.push({
    name: 'Dependency Audit',
    passed: depAudit.passed,
    details: depAudit
  });
  
  if (depAudit.vulnerabilities) {
    auditor.vulnerabilities.push(...depAudit.vulnerabilities);
  }
  
  // Test API endpoint security
  for (const endpoint of API_ENDPOINTS) {
    const result = await auditor.testAPIEndpointSecurity(endpoint);
    auditor.results.push(result);
  }
  
  // Check security headers
  const headersResult = await auditor.checkSecurityHeaders();
  auditor.results.push({
    name: 'Security Headers',
    passed: headersResult.passed,
    details: headersResult
  });
  
  // Check environment variables
  const envResult = await auditor.checkEnvironmentVariables();
  auditor.results.push({
    name: 'Environment Variables',
    passed: envResult.passed,
    details: envResult
  });
  
  // Generate and print report
  const report = auditor.generateSecurityReport();
  auditor.printSecurityReport(report);
  
  // Exit with error code if vulnerabilities found
  if (!report.summary.overallPassed) {
    console.log('\n❌ Security vulnerabilities found. Please address the issues above.');
    process.exit(1);
  }
  
  console.log('\n✅ Security audit passed!');
}

// Run the audit
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Security audit failed:', error);
    process.exit(1);
  });
}

module.exports = { SecurityAuditor, SECURITY_TESTS, API_ENDPOINTS }; 