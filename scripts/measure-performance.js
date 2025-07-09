const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function getCurrentTimestamp() {
  return new Date().toISOString();
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function measureBuildTime() {
  console.log('🏗️  Measuring build time...');
  const startTime = Date.now();
  
  try {
    const buildOutput = execSync('npm run build', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    const endTime = Date.now();
    const buildTimeMs = endTime - startTime;
    const buildTimeSeconds = (buildTimeMs / 1000).toFixed(2);
    
    console.log(`✅ Build completed in ${buildTimeSeconds}s`);
    
    return {
      buildTime: `${buildTimeSeconds}s`,
      buildTimeMs: buildTimeMs,
      status: 'success',
      buildOutput: buildOutput
    };
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    return {
      buildTime: null,
      buildTimeMs: null,
      status: 'failed',
      error: error.message
    };
  }
}

function analyzeBundleSize() {
  console.log('📦 Analyzing bundle size...');
  
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.log('❌ .next directory not found');
    return { error: '.next directory not found' };
  }

  function getDirectorySize(dirPath) {
    let totalSize = 0;
    let fileCount = 0;

    function calculateSize(currentPath) {
      const stats = fs.statSync(currentPath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => {
          calculateSize(path.join(currentPath, file));
        });
      } else {
        totalSize += stats.size;
        fileCount++;
      }
    }

    calculateSize(dirPath);
    return { totalSize, fileCount };
  }

  const { totalSize, fileCount } = getDirectorySize(nextDir);
  
  // Get main route bundle size from build output
  let mainRouteSize = null;
  let firstLoadJS = null;
  
  try {
    const buildOutputFile = path.join(nextDir, 'build-manifest.json');
    if (fs.existsSync(buildOutputFile)) {
      // Try to extract route information from Next.js build
      console.log('📊 Extracting route information...');
    }
  } catch (error) {
    console.log('⚠️  Could not extract detailed route information');
  }

  console.log(`✅ Total bundle size: ${formatBytes(totalSize)} (${fileCount} files)`);
  
  return {
    totalBuildSize: formatBytes(totalSize),
    totalSizeBytes: totalSize,
    fileCount: fileCount
  };
}

function countDependencies() {
  console.log('📋 Counting dependencies...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return { error: 'package.json not found' };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const prodDeps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};
  
  console.log(`✅ Dependencies: ${Object.keys(prodDeps).length} production, ${Object.keys(devDeps).length} development`);
  
  return {
    production: Object.keys(prodDeps).length,
    development: Object.keys(devDeps).length,
    total: Object.keys(prodDeps).length + Object.keys(devDeps).length,
    productionDeps: prodDeps,
    developmentDeps: devDeps
  };
}

function analyzeSourceCode() {
  console.log('📁 Analyzing source code...');
  
  const srcDirs = ['app', 'components', 'lib', 'hooks', '__tests__', 'e2e'];
  let totalFiles = 0;
  let totalSize = 0;
  const fileTypes = {
    components: 0,
    pages: 0,
    utilities: 0,
    tests: 0,
    other: 0
  };

  srcDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      function analyzeDirectory(currentPath) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => {
          const filePath = path.join(currentPath, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            analyzeDirectory(filePath);
          } else if (file.match(/\.(tsx?|jsx?|css|md)$/)) {
            totalFiles++;
            totalSize += stats.size;
            
            if (file.includes('.test.') || file.includes('.spec.') || currentPath.includes('__tests__') || currentPath.includes('e2e')) {
              fileTypes.tests++;
            } else if (currentPath.includes('components')) {
              fileTypes.components++;
            } else if (currentPath.includes('app') && (file.includes('page.') || file.includes('layout.'))) {
              fileTypes.pages++;
            } else if (currentPath.includes('lib') || currentPath.includes('utils') || currentPath.includes('hooks')) {
              fileTypes.utilities++;
            } else {
              fileTypes.other++;
            }
          }
        });
      }
      analyzeDirectory(dirPath);
    }
  });

  console.log(`✅ Source code: ${totalFiles} files, ${formatBytes(totalSize)}`);
  
  return {
    totalFiles,
    totalSize: formatBytes(totalSize),
    ...fileTypes
  };
}

async function main() {
  console.log('🚀 Starting comprehensive performance measurement...\n');
  
  const report = {
    timestamp: getCurrentTimestamp(),
    buildMetrics: {},
    bundleAnalysis: {},
    dependencies: {},
    sourceAnalysis: {},
    improvements: {},
    errors: []
  };

  try {
    // Measure build time
    report.buildMetrics = measureBuildTime();
    
    // Analyze bundle size
    report.bundleAnalysis = analyzeBundleSize();
    
    // Count dependencies
    report.dependencies = countDependencies();
    
    // Analyze source code
    report.sourceAnalysis = analyzeSourceCode();
    
    // Save report
    const reportsDir = path.join(process.cwd(), '.taskmaster', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = path.join(reportsDir, 'post-cleanup-performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n✅ Performance report saved to: ${reportPath}`);
    console.log('\n📊 SUMMARY:');
    console.log(`   Build Time: ${report.buildMetrics.buildTime}`);
    console.log(`   Bundle Size: ${report.bundleAnalysis.totalBuildSize}`);
    console.log(`   Dependencies: ${report.dependencies.total} total`);
    console.log(`   Source Files: ${report.sourceAnalysis.totalFiles} files`);
    
  } catch (error) {
    console.error('❌ Error during performance measurement:', error);
    report.errors.push(error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main }; 
console.log('📄 Detailed report available at: .taskmaster/reports/baseline-performance-report.json'); 