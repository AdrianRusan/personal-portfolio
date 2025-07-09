const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cross-platform helper functions
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }
  
  if (fs.existsSync(dirPath)) {
    calculateSize(dirPath);
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

console.log('🔍 Running Build Verification...');

try {
  // Clean previous build
  console.log('📁 Cleaning previous build...');
  removeDirectory('.next');

  // Run build command
  console.log('🏗️  Building application...');
  const buildStart = Date.now();
  execSync('npm run build', { stdio: 'inherit' });
  const buildTime = (Date.now() - buildStart) / 1000;
  
  console.log(`⏱️  Build completed in ${buildTime} seconds`);
  
  // Check build time performance
  if (buildTime > 30) {
    console.warn(`⚠️  Build time (${buildTime}s) exceeds recommended 30s threshold`);
  }

  // Verify critical files exist
  console.log('📋 Verifying critical files...');
  const criticalFiles = [
    '.next/static',
    '.next/server',
    '.next/BUILD_ID',
    'public/favicon.ico',
    'public/site.webmanifest'
  ];

  let allFilesExist = true;
  criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing critical file: ${file}`);
      allFilesExist = false;
    } else {
      console.log(`✅ Found: ${file}`);
    }
  });

  if (!allFilesExist) {
    process.exit(1);
  }

  // Check bundle size
  console.log('📦 Analyzing bundle size...');
  try {
    const staticDir = path.join('.next', 'static');
    
    if (fs.existsSync('.next')) {
      const buildSize = getDirectorySize('.next');
      console.log(`📊 Build size: ${formatBytes(buildSize)}`);
      
      // Check if bundle analysis exists
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      if (packageJson.scripts && packageJson.scripts['analyze']) {
        console.log('📈 Bundle analyzer script available. Run "npm run analyze" for detailed analysis.');
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not analyze bundle size:', error.message);
  }

  // Verify Next.js pages
  console.log('📄 Verifying page generation...');
  const pagesManifest = path.join('.next', 'server', 'pages-manifest.json');
  const appManifest = path.join('.next', 'app-build-manifest.json');
  
  if (fs.existsSync(pagesManifest) || fs.existsSync(appManifest)) {
    console.log('✅ Page manifests generated successfully');
  } else {
    console.error('❌ Page manifests missing');
    process.exit(1);
  }

  // Check for TypeScript compilation
  console.log('🔧 Verifying TypeScript compilation...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('✅ TypeScript compilation successful');
  } catch (error) {
    console.error('❌ TypeScript compilation failed');
    console.error(error.stdout?.toString() || error.message);
    process.exit(1);
  }

  // Success message
  console.log('\n🎉 Build verification completed successfully!');
  console.log('✅ All critical files present');
  console.log('✅ TypeScript compilation passed');
  console.log('✅ Build completed without errors');
  
  if (buildTime <= 30) {
    console.log('✅ Build time within acceptable range');
  }

} catch (error) {
  console.error('❌ Build verification failed:', error.message);
  process.exit(1);
} 