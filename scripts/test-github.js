const { getGitHubRepos, getGitHubUser, getGitHubStats, getFeaturedRepos, isGitHubConfigured } = require('../lib/github.ts');

async function testGitHubIntegration() {
  console.log('🔍 Testing GitHub Integration...\n');
  
  // Check configuration
  console.log('1. Checking GitHub configuration...');
  const isConfigured = isGitHubConfigured();
  console.log(`   GitHub configured: ${isConfigured ? '✅' : '❌'}`);
  
  if (!isConfigured) {
    console.log('   ⚠️  GitHub token not configured. Some features may be limited.');
  }
  
  try {
    // Test user data
    console.log('\n2. Fetching GitHub user data...');
    const user = await getGitHubUser();
    if (user) {
      console.log(`   ✅ User: ${user.name} (@${user.login})`);
      console.log(`   📊 Public repos: ${user.public_repos}`);
      console.log(`   👥 Followers: ${user.followers}`);
      console.log(`   🔗 Profile: ${user.html_url}`);
    } else {
      console.log('   ❌ Failed to fetch user data');
    }
    
    // Test repositories
    console.log('\n3. Fetching GitHub repositories...');
    const repos = await getGitHubRepos({ per_page: 10 });
    console.log(`   ✅ Found ${repos.length} repositories`);
    
    if (repos.length > 0) {
      console.log('   📁 Top repositories:');
      repos.slice(0, 3).forEach((repo, index) => {
        console.log(`      ${index + 1}. ${repo.name} (⭐ ${repo.stargazers_count})`);
        console.log(`         ${repo.description || 'No description'}`);
        console.log(`         Language: ${repo.language || 'Unknown'}`);
      });
    }
    
    // Test featured repos
    console.log('\n4. Fetching featured repositories...');
    const featured = await getFeaturedRepos(3);
    console.log(`   ✅ Found ${featured.length} featured repositories`);
    
    if (featured.length > 0) {
      console.log('   🌟 Featured repositories:');
      featured.forEach((repo, index) => {
        console.log(`      ${index + 1}. ${repo.name} (⭐ ${repo.stargazers_count}, 🍴 ${repo.forks_count})`);
      });
    }
    
    // Test comprehensive stats
    console.log('\n5. Fetching comprehensive GitHub stats...');
    const stats = await getGitHubStats();
    if (stats) {
      console.log(`   ✅ Total stars: ${stats.totalStars}`);
      console.log(`   ✅ Total forks: ${stats.totalForks}`);
      console.log(`   ✅ Top repositories: ${stats.topRepositories.length}`);
      
      if (Object.keys(stats.languageStats).length > 0) {
        console.log('   🔤 Language breakdown:');
        Object.entries(stats.languageStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .forEach(([lang, count]) => {
            console.log(`      ${lang}: ${count} repositories`);
          });
      }
    } else {
      console.log('   ❌ Failed to fetch comprehensive stats');
    }
    
    console.log('\n✅ GitHub integration test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ GitHub integration test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testGitHubIntegration().catch(console.error); 