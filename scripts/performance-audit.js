const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// V1 pages to audit
const V1_PAGES = [
  '/',
  '/docs',
  '/docs/introduction',
  '/docs/getting-started',
  '/docs/api-basics',
  '/learning',
  '/learning/introduction-to-nextjs',
  '/learning/advanced-react-patterns',
  '/learning/typescript-best-practices',
  '/status'
];

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  bestPractices: 90,
  seo: 90,
  pwa: 70 // Lower threshold for PWA as it's not fully implemented
};

// Core Web Vitals thresholds
const CORE_WEB_VITALS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1   // Cumulative Layout Shift
};

class PerformanceAuditor {
  constructor() {
    this.results = [];
    this.reportDir = path.join(__dirname, '../.taskmaster/reports');
    this.ensureReportDir();
  }

  ensureReportDir() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  async runLighthouseAudit(url, pageName) {
    console.log(`🔍 Auditing ${pageName} (${url})...`);
    
    try {
      // Run Lighthouse CLI
      const command = `npx lighthouse ${url} --output=json --output-path=${this.reportDir}/lighthouse-${pageName.replace(/[^a-zA-Z0-9]/g, '-')}.json --chrome-flags="--headless" --preset=desktop`;
      
      const output = execSync(command, { 
        encoding: 'utf8',
        timeout: 60000 // 60 second timeout
      });
      
      // Read the generated report
      const reportPath = path.join(this.reportDir, `lighthouse-${pageName.replace(/[^a-zA-Z0-9]/g, '-')}.json`);
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      
      return this.parseReport(report, pageName, url);
    } catch (error) {
      console.error(`❌ Error auditing ${pageName}:`, error.message);
      return {
        pageName,
        url,
        error: error.message,
        passed: false
      };
    }
  }

  parseReport(report, pageName, url) {
    const categories = report.categories;
    const audits = report.audits;
    
    // Extract scores
    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
      pwa: categories.pwa ? Math.round(categories.pwa.score * 100) : 0
    };
    
    // Extract Core Web Vitals
    const coreWebVitals = {
      LCP: audits['largest-contentful-paint']?.numericValue || 0,
      FID: audits['max-potential-fid']?.numericValue || 0,
      CLS: audits['cumulative-layout-shift']?.numericValue || 0
    };
    
    // Check if thresholds are met
    const passed = {
      performance: scores.performance >= PERFORMANCE_THRESHOLDS.performance,
      accessibility: scores.accessibility >= PERFORMANCE_THRESHOLDS.accessibility,
      bestPractices: scores.bestPractices >= PERFORMANCE_THRESHOLDS.bestPractices,
      seo: scores.seo >= PERFORMANCE_THRESHOLDS.seo,
      pwa: scores.pwa >= PERFORMANCE_THRESHOLDS.pwa,
      LCP: coreWebVitals.LCP <= CORE_WEB_VITALS.LCP,
      FID: coreWebVitals.FID <= CORE_WEB_VITALS.FID,
      CLS: coreWebVitals.CLS <= CORE_WEB_VITALS.CLS
    };
    
    const allPassed = Object.values(passed).every(p => p);
    
    // Extract performance opportunities
    const opportunities = [];
    Object.keys(audits).forEach(key => {
      const audit = audits[key];
      if (audit.scoreDisplayMode === 'numeric' && audit.score < 1 && audit.details?.overallSavingsMs > 100) {
        opportunities.push({
          title: audit.title,
          description: audit.description,
          savings: audit.details.overallSavingsMs,
          score: audit.score
        });
      }
    });
    
    return {
      pageName,
      url,
      scores,
      coreWebVitals,
      passed,
      allPassed,
      opportunities: opportunities.slice(0, 5), // Top 5 opportunities
      timestamp: new Date().toISOString()
    };
  }

  async runBundleAnalysis() {
    console.log('📦 Analyzing bundle size...');
    
    try {
      // Run bundle analyzer
      execSync('npm run analyze', { encoding: 'utf8' });
      
      // Check if .next/analyze exists
      const analyzePath = path.join(__dirname, '../.next/analyze');
      if (fs.existsSync(analyzePath)) {
        const files = fs.readdirSync(analyzePath);
        const bundleInfo = files.map(file => {
          const filePath = path.join(analyzePath, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024)
          };
        });
        
        return {
          totalSize: bundleInfo.reduce((sum, file) => sum + file.size, 0),
          files: bundleInfo.sort((a, b) => b.size - a.size).slice(0, 10)
        };
      }
    } catch (error) {
      console.error('❌ Bundle analysis failed:', error.message);
    }
    
    return null;
  }

  async checkAPIPerformance() {
    console.log('🚀 Testing API performance...');
    
    const apiEndpoints = [
      '/api/health',
      '/api/contact',
      '/api/github',
      '/api/webhooks/revalidate-static'
    ];
    
    const results = [];
    
    for (const endpoint of apiEndpoints) {
      try {
        const start = Date.now();
        
        // Make a test request
        const response = await fetch(`http://localhost:3000${endpoint}`, {
          method: endpoint === '/api/contact' ? 'POST' : 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: endpoint === '/api/contact' ? JSON.stringify({
            fullName: 'Test User',
            email: 'test@example.com',
            projectType: 'web-development',
            budgetRange: '5000-10000',
            timeline: '1-2-months',
            projectDescription: 'Test',
            source: 'test'
          }) : undefined
        });
        
        const duration = Date.now() - start;
        
        results.push({
          endpoint,
          status: response.status,
          duration,
          passed: duration < 300 // 300ms threshold
        });
        
      } catch (error) {
        results.push({
          endpoint,
          error: error.message,
          passed: false
        });
      }
    }
    
    return results;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalPages: this.results.length,
        passedPages: this.results.filter(r => r.allPassed).length,
        averageScores: this.calculateAverageScores(),
        overallPassed: this.results.every(r => r.allPassed)
      },
      pages: this.results,
      recommendations: this.generateRecommendations()
    };
    
    // Save detailed report
    const reportPath = path.join(this.reportDir, 'v1-performance-audit.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  calculateAverageScores() {
    const totals = this.results.reduce((acc, result) => {
      acc.performance += result.scores.performance;
      acc.accessibility += result.scores.accessibility;
      acc.bestPractices += result.scores.bestPractices;
      acc.seo += result.scores.seo;
      acc.pwa += result.scores.pwa;
      return acc;
    }, { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, pwa: 0 });
    
    const count = this.results.length;
    return {
      performance: Math.round(totals.performance / count),
      accessibility: Math.round(totals.accessibility / count),
      bestPractices: Math.round(totals.bestPractices / count),
      seo: Math.round(totals.seo / count),
      pwa: Math.round(totals.pwa / count)
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Analyze common issues
    const commonIssues = {};
    this.results.forEach(result => {
      if (result.opportunities) {
        result.opportunities.forEach(opp => {
          if (!commonIssues[opp.title]) {
            commonIssues[opp.title] = { count: 0, totalSavings: 0 };
          }
          commonIssues[opp.title].count++;
          commonIssues[opp.title].totalSavings += opp.savings;
        });
      }
    });
    
    // Generate recommendations based on common issues
    Object.entries(commonIssues)
      .sort(([,a], [,b]) => b.totalSavings - a.totalSavings)
      .slice(0, 5)
      .forEach(([issue, data]) => {
        recommendations.push({
          title: issue,
          impact: data.totalSavings,
          affectedPages: data.count,
          priority: data.totalSavings > 1000 ? 'high' : data.totalSavings > 500 ? 'medium' : 'low'
        });
      });
    
    return recommendations;
  }

  printResults(report) {
    console.log('\n📊 V1 Performance Audit Results');
    console.log('================================');
    
    console.log(`\n📈 Summary:`);
    console.log(`  Total Pages: ${report.summary.totalPages}`);
    console.log(`  Passed Pages: ${report.summary.passedPages}/${report.summary.totalPages}`);
    console.log(`  Overall Status: ${report.summary.overallPassed ? '✅ PASSED' : '❌ FAILED'}`);
    
    console.log(`\n🎯 Average Scores:`);
    console.log(`  Performance: ${report.summary.averageScores.performance}/100`);
    console.log(`  Accessibility: ${report.summary.averageScores.accessibility}/100`);
    console.log(`  Best Practices: ${report.summary.averageScores.bestPractices}/100`);
    console.log(`  SEO: ${report.summary.averageScores.seo}/100`);
    console.log(`  PWA: ${report.summary.averageScores.pwa}/100`);
    
    console.log(`\n📋 Page Details:`);
    report.pages.forEach(page => {
      const status = page.allPassed ? '✅' : '❌';
      console.log(`  ${status} ${page.pageName} (${page.url})`);
      if (!page.allPassed) {
        console.log(`    Performance: ${page.scores.performance}/100`);
        console.log(`    Accessibility: ${page.scores.accessibility}/100`);
        console.log(`    Best Practices: ${page.scores.bestPractices}/100`);
        console.log(`    SEO: ${page.scores.seo}/100`);
      }
    });
    
    if (report.recommendations.length > 0) {
      console.log(`\n💡 Top Recommendations:`);
      report.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.title} (${rec.priority} priority)`);
        console.log(`     Impact: ${rec.impact}ms savings across ${rec.affectedPages} pages`);
      });
    }
    
    console.log(`\n📁 Detailed report saved to: ${path.join(this.reportDir, 'v1-performance-audit.json')}`);
  }
}

// Main execution
async function main() {
  const auditor = new PerformanceAuditor();
  
  console.log('🚀 Starting V1 Performance Audit...\n');
  
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
  
  // Run Lighthouse audits for each V1 page
  for (const page of V1_PAGES) {
    const pageName = page === '/' ? 'home' : page.replace(/\//g, '-').substring(1);
    const result = await auditor.runLighthouseAudit(`http://localhost:3000${page}`, pageName);
    auditor.results.push(result);
  }
  
  // Run bundle analysis
  const bundleAnalysis = await auditor.runBundleAnalysis();
  if (bundleAnalysis) {
    console.log(`\n📦 Bundle Analysis:`);
    console.log(`  Total Size: ${Math.round(bundleAnalysis.totalSize / 1024)} KB`);
    console.log(`  Largest Files:`);
    bundleAnalysis.files.slice(0, 5).forEach(file => {
      console.log(`    ${file.name}: ${file.sizeKB} KB`);
    });
  }
  
  // Test API performance
  const apiResults = await auditor.checkAPIPerformance();
  console.log(`\n🚀 API Performance:`);
  apiResults.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    console.log(`  ${status} ${result.endpoint}: ${result.duration || 'ERROR'}ms`);
  });
  
  // Generate and print report
  const report = auditor.generateReport();
  auditor.printResults(report);
  
  // Exit with error code if any audits failed
  if (!report.summary.overallPassed) {
    console.log('\n❌ Some performance audits failed. Please address the issues above.');
    process.exit(1);
  }
  
  console.log('\n✅ All performance audits passed!');
}

// Run the audit
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Performance audit failed:', error);
    process.exit(1);
  });
}

module.exports = { PerformanceAuditor, V1_PAGES, PERFORMANCE_THRESHOLDS, CORE_WEB_VITALS }; 