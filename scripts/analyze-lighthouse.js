const fs = require('fs');
const path = require('path');

// Read Lighthouse audit results
function readLighthouseResults() {
  const desktopPath = path.join('.taskmaster', 'reports', 'lighthouse-desktop.json');
  const mobilePath = path.join('.taskmaster', 'reports', 'lighthouse-mobile.json');
  
  const desktop = JSON.parse(fs.readFileSync(desktopPath, 'utf8'));
  const mobile = JSON.parse(fs.readFileSync(mobilePath, 'utf8'));
  
  return { desktop, mobile };
}

// Extract key metrics from Lighthouse results
function extractMetrics(auditResult) {
  const audits = auditResult.audits;
  const categories = auditResult.categories;
  
  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
    
    // Core Web Vitals
    fcp: Math.round(audits['first-contentful-paint'].numericValue),
    lcp: Math.round(audits['largest-contentful-paint'].numericValue),
    cls: parseFloat(audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    tbt: Math.round(audits['total-blocking-time'].numericValue),
    tti: Math.round(audits['interactive'].numericValue),
    si: Math.round(audits['speed-index'].numericValue),
    
    // Resource metrics
    totalByteWeight: Math.round(audits['total-byte-weight'].numericValue / 1024 / 1024 * 100) / 100, // MB
    domSize: audits['dom-size'].numericValue,
    
    // Additional metrics
    serverResponseTime: Math.round(audits['server-response-time'].numericValue),
    mainThreadWork: Math.round(audits['mainthread-work-breakdown'].numericValue),
    
    // Opportunities (potential savings)
    opportunities: {
      unusedCss: audits['unused-css-rules']?.details?.overallSavingsBytes || 0,
      unusedJs: audits['unused-javascript']?.details?.overallSavingsBytes || 0,
      renderBlocking: audits['render-blocking-resources']?.details?.overallSavingsMs || 0,
      imageOptimization: audits['uses-optimized-images']?.details?.overallSavingsBytes || 0,
      textCompression: audits['uses-text-compression']?.details?.overallSavingsBytes || 0
    }
  };
}

// Read baseline data
function readBaselineData() {
  try {
    const baselinePath = path.join('.taskmaster', 'reports', 'baseline-performance-report.json');
    return JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  } catch (error) {
    console.warn('Baseline data not found, skipping comparison');
    return null;
  }
}

// Calculate improvement percentages
function calculateImprovement(baseline, current, metric) {
  if (!baseline || baseline[metric] === undefined || current[metric] === undefined) {
    return null;
  }
  
  const baseValue = baseline[metric];
  const currentValue = current[metric];
  
  // For metrics where lower is better (like load times)
  const lowerIsBetter = ['fcp', 'lcp', 'tbt', 'tti', 'si', 'totalByteWeight', 'serverResponseTime', 'mainThreadWork'];
  
  if (lowerIsBetter.includes(metric)) {
    return Math.round(((baseValue - currentValue) / baseValue) * 100);
  } else {
    // For scores where higher is better
    return Math.round(((currentValue - baseValue) / baseValue) * 100);
  }
}

// Format metrics for display
function formatMetric(value, unit = '') {
  if (typeof value === 'number') {
    return `${value.toLocaleString()}${unit}`;
  }
  return value;
}

// Generate comprehensive report
function generateReport() {
  const { desktop, mobile } = readLighthouseResults();
  const baseline = readBaselineData();
  
  const desktopMetrics = extractMetrics(desktop);
  const mobileMetrics = extractMetrics(mobile);
  
  console.log('🚀 LIGHTHOUSE AUDIT RESULTS - POST-CLEANUP ANALYSIS');
  console.log('═'.repeat(60));
  
  // Performance Scores
  console.log('\n📊 PERFORMANCE SCORES');
  console.log('─'.repeat(30));
  console.log(`Desktop Performance: ${desktopMetrics.performance}/100`);
  console.log(`Mobile Performance:  ${mobileMetrics.performance}/100`);
  console.log(`Desktop Accessibility: ${desktopMetrics.accessibility}/100`);
  console.log(`Mobile Accessibility:  ${mobileMetrics.accessibility}/100`);
  console.log(`Desktop Best Practices: ${desktopMetrics.bestPractices}/100`);
  console.log(`Mobile Best Practices:  ${mobileMetrics.bestPractices}/100`);
  console.log(`Desktop SEO: ${desktopMetrics.seo}/100`);
  console.log(`Mobile SEO:  ${mobileMetrics.seo}/100`);
  
  // Core Web Vitals
  console.log('\n⚡ CORE WEB VITALS');
  console.log('─'.repeat(30));
  console.log('Desktop:');
  console.log(`  First Contentful Paint: ${formatMetric(desktopMetrics.fcp, 'ms')}`);
  console.log(`  Largest Contentful Paint: ${formatMetric(desktopMetrics.lcp, 'ms')}`);
  console.log(`  Cumulative Layout Shift: ${desktopMetrics.cls}`);
  console.log(`  Total Blocking Time: ${formatMetric(desktopMetrics.tbt, 'ms')}`);
  console.log(`  Time to Interactive: ${formatMetric(desktopMetrics.tti, 'ms')}`);
  console.log(`  Speed Index: ${formatMetric(desktopMetrics.si, 'ms')}`);
  
  console.log('\nMobile:');
  console.log(`  First Contentful Paint: ${formatMetric(mobileMetrics.fcp, 'ms')}`);
  console.log(`  Largest Contentful Paint: ${formatMetric(mobileMetrics.lcp, 'ms')}`);
  console.log(`  Cumulative Layout Shift: ${mobileMetrics.cls}`);
  console.log(`  Total Blocking Time: ${formatMetric(mobileMetrics.tbt, 'ms')}`);
  console.log(`  Time to Interactive: ${formatMetric(mobileMetrics.tti, 'ms')}`);
  console.log(`  Speed Index: ${formatMetric(mobileMetrics.si, 'ms')}`);
  
  // Resource Analysis
  console.log('\n📦 RESOURCE ANALYSIS');
  console.log('─'.repeat(30));
  console.log(`Desktop Total Bundle: ${formatMetric(desktopMetrics.totalByteWeight, ' MB')}`);
  console.log(`Mobile Total Bundle: ${formatMetric(mobileMetrics.totalByteWeight, ' MB')}`);
  console.log(`Desktop DOM Size: ${formatMetric(desktopMetrics.domSize, ' elements')}`);
  console.log(`Mobile DOM Size: ${formatMetric(mobileMetrics.domSize, ' elements')}`);
  console.log(`Desktop Server Response: ${formatMetric(desktopMetrics.serverResponseTime, 'ms')}`);
  console.log(`Mobile Server Response: ${formatMetric(mobileMetrics.serverResponseTime, 'ms')}`);
  
  // Optimization Opportunities
  console.log('\n🔧 OPTIMIZATION OPPORTUNITIES');
  console.log('─'.repeat(30));
  const desktopOpps = desktopMetrics.opportunities;
  console.log('Desktop:');
  if (desktopOpps.unusedCss > 0) console.log(`  Unused CSS: ${formatMetric(Math.round(desktopOpps.unusedCss / 1024), ' KB')}`);
  if (desktopOpps.unusedJs > 0) console.log(`  Unused JavaScript: ${formatMetric(Math.round(desktopOpps.unusedJs / 1024), ' KB')}`);
  if (desktopOpps.renderBlocking > 0) console.log(`  Render Blocking: ${formatMetric(desktopOpps.renderBlocking, 'ms')}`);
  if (desktopOpps.imageOptimization > 0) console.log(`  Image Optimization: ${formatMetric(Math.round(desktopOpps.imageOptimization / 1024), ' KB')}`);
  if (desktopOpps.textCompression > 0) console.log(`  Text Compression: ${formatMetric(Math.round(desktopOpps.textCompression / 1024), ' KB')}`);
  
  const mobileOpps = mobileMetrics.opportunities;
  console.log('\nMobile:');
  if (mobileOpps.unusedCss > 0) console.log(`  Unused CSS: ${formatMetric(Math.round(mobileOpps.unusedCss / 1024), ' KB')}`);
  if (mobileOpps.unusedJs > 0) console.log(`  Unused JavaScript: ${formatMetric(Math.round(mobileOpps.unusedJs / 1024), ' KB')}`);
  if (mobileOpps.renderBlocking > 0) console.log(`  Render Blocking: ${formatMetric(mobileOpps.renderBlocking, 'ms')}`);
  if (mobileOpps.imageOptimization > 0) console.log(`  Image Optimization: ${formatMetric(Math.round(mobileOpps.imageOptimization / 1024), ' KB')}`);
  if (mobileOpps.textCompression > 0) console.log(`  Text Compression: ${formatMetric(Math.round(mobileOpps.textCompression / 1024), ' KB')}`);
  
  // Baseline comparison if available
  if (baseline) {
    console.log('\n📈 IMPROVEMENT vs BASELINE');
    console.log('─'.repeat(30));
    
    // Note: For this comparison, we'll use our current post-cleanup metrics vs baseline
    const postCleanup = JSON.parse(fs.readFileSync(path.join('.taskmaster', 'reports', 'post-cleanup-performance-report.json'), 'utf8'));
    
    const buildTimeImprovement = calculateImprovement(baseline, postCleanup, 'buildTime');
    const bundleSizeImprovement = calculateImprovement(baseline, postCleanup, 'bundleSize');
    const dependencyImprovement = calculateImprovement(baseline, postCleanup, 'totalDependencies');
    
    if (buildTimeImprovement !== null) {
      console.log(`Build Time: ${buildTimeImprovement > 0 ? '+' : ''}${buildTimeImprovement}% (${baseline.buildTime}s → ${postCleanup.buildTime}s)`);
    }
    if (bundleSizeImprovement !== null) {
      console.log(`Bundle Size: ${bundleSizeImprovement > 0 ? '+' : ''}${bundleSizeImprovement}% (${(baseline.bundleSize / 1024 / 1024).toFixed(1)}MB → ${(postCleanup.bundleSize / 1024 / 1024).toFixed(1)}MB)`);
    }
    if (dependencyImprovement !== null) {
      console.log(`Dependencies: ${dependencyImprovement > 0 ? '+' : ''}${dependencyImprovement}% (${baseline.totalDependencies} → ${postCleanup.totalDependencies})`);
    }
  }
  
  // Save detailed results
  const lighthouseResults = {
    timestamp: new Date().toISOString(),
    desktop: desktopMetrics,
    mobile: mobileMetrics,
    summary: {
      overallPerformance: Math.round((desktopMetrics.performance + mobileMetrics.performance) / 2),
      overallAccessibility: Math.round((desktopMetrics.accessibility + mobileMetrics.accessibility) / 2),
      overallBestPractices: Math.round((desktopMetrics.bestPractices + mobileMetrics.bestPractices) / 2),
      overallSeo: Math.round((desktopMetrics.seo + mobileMetrics.seo) / 2),
      
      averageFcp: Math.round((desktopMetrics.fcp + mobileMetrics.fcp) / 2),
      averageLcp: Math.round((desktopMetrics.lcp + mobileMetrics.lcp) / 2),
      averageCls: parseFloat(((desktopMetrics.cls + mobileMetrics.cls) / 2).toFixed(3)),
      averageTbt: Math.round((desktopMetrics.tbt + mobileMetrics.tbt) / 2),
      
      totalBundleSize: Math.max(desktopMetrics.totalByteWeight, mobileMetrics.totalByteWeight),
      avgDomSize: Math.round((desktopMetrics.domSize + mobileMetrics.domSize) / 2)
    }
  };
  
  const outputPath = path.join('.taskmaster', 'reports', 'lighthouse-scores.json');
  fs.writeFileSync(outputPath, JSON.stringify(lighthouseResults, null, 2));
  
  console.log(`\n💾 Detailed results saved to: ${outputPath}`);
  console.log('\n✅ Lighthouse analysis complete!');
  
  return lighthouseResults;
}

// Run the analysis
if (require.main === module) {
  try {
    generateReport();
  } catch (error) {
    console.error('Error running Lighthouse analysis:', error);
    process.exit(1);
  }
}

module.exports = { generateReport, extractMetrics, readLighthouseResults }; 