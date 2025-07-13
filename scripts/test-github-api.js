const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = `${BASE_URL}/api/github`;

async function testGitHubAPI() {
  console.log('🔍 Testing GitHub API Route...\n');
  
  try {
    // Test 1: Basic stats endpoint
    console.log('1. Testing basic stats endpoint...');
    const statsResponse = await fetch(`${API_ENDPOINT}?type=stats`);
    const statsData = await statsResponse.json();
    
    if (statsResponse.ok) {
      console.log('   ✅ Stats endpoint working');
      console.log(`   📊 Response time: ${statsData.processingTime}ms`);
      console.log(`   💾 Cached: ${statsData.cached ? 'Yes' : 'No'}`);
      if (statsData.data) {
        console.log(`   ⭐ Total stars: ${statsData.data.totalStars}`);
        console.log(`   📁 Top repos: ${statsData.data.topRepositories.length}`);
      }
    } else {
      console.log('   ❌ Stats endpoint failed:', statsData.error);
    }
    
    // Test 2: Cache behavior - request same endpoint again
    console.log('\n2. Testing cache behavior...');
    const cachedResponse = await fetch(`${API_ENDPOINT}?type=stats`);
    const cachedData = await cachedResponse.json();
    
    if (cachedResponse.ok) {
      console.log('   ✅ Second request successful');
      console.log(`   📊 Response time: ${cachedData.processingTime}ms`);
      console.log(`   💾 Cached: ${cachedData.cached ? 'Yes' : 'No'}`);
      
      if (cachedData.cached) {
        console.log('   🚀 Cache is working correctly!');
      } else {
        console.log('   ⚠️  Cache not used - check cache implementation');
      }
    } else {
      console.log('   ❌ Cached request failed:', cachedData.error);
    }
    
    // Test 3: User endpoint
    console.log('\n3. Testing user endpoint...');
    const userResponse = await fetch(`${API_ENDPOINT}?type=user`);
    const userData = await userResponse.json();
    
    if (userResponse.ok) {
      console.log('   ✅ User endpoint working');
      console.log(`   👤 User: ${userData.data.name} (@${userData.data.login})`);
      console.log(`   📊 Public repos: ${userData.data.public_repos}`);
      console.log(`   👥 Followers: ${userData.data.followers}`);
    } else {
      console.log('   ❌ User endpoint failed:', userData.error);
    }
    
    // Test 4: Repositories endpoint
    console.log('\n4. Testing repositories endpoint...');
    const reposResponse = await fetch(`${API_ENDPOINT}?type=repos&per_page=5`);
    const reposData = await reposResponse.json();
    
    if (reposResponse.ok) {
      console.log('   ✅ Repositories endpoint working');
      console.log(`   📁 Found ${reposData.data.length} repositories`);
      if (reposData.data.length > 0) {
        console.log('   📋 Top repositories:');
        reposData.data.slice(0, 3).forEach((repo, index) => {
          console.log(`      ${index + 1}. ${repo.name} (⭐ ${repo.stargazers_count})`);
        });
      }
    } else {
      console.log('   ❌ Repositories endpoint failed:', reposData.error);
    }
    
    // Test 5: Featured repositories endpoint
    console.log('\n5. Testing featured repositories endpoint...');
    const featuredResponse = await fetch(`${API_ENDPOINT}?type=featured&count=3`);
    const featuredData = await featuredResponse.json();
    
    if (featuredResponse.ok) {
      console.log('   ✅ Featured repositories endpoint working');
      console.log(`   🌟 Found ${featuredData.data.length} featured repositories`);
      if (featuredData.data.length > 0) {
        console.log('   📋 Featured repositories:');
        featuredData.data.forEach((repo, index) => {
          console.log(`      ${index + 1}. ${repo.name} (⭐ ${repo.stargazers_count}, 🍴 ${repo.forks_count})`);
        });
      }
    } else {
      console.log('   ❌ Featured repositories endpoint failed:', featuredData.error);
    }
    
    // Test 6: Rate limit endpoint
    console.log('\n6. Testing rate limit endpoint...');
    const rateLimitResponse = await fetch(`${API_ENDPOINT}?type=rateLimit`);
    const rateLimitData = await rateLimitResponse.json();
    
    if (rateLimitResponse.ok) {
      console.log('   ✅ Rate limit endpoint working');
      if (rateLimitData.data && rateLimitData.data.rate) {
        console.log(`   🔄 Rate limit: ${rateLimitData.data.rate.remaining}/${rateLimitData.data.rate.limit}`);
        console.log(`   ⏰ Reset time: ${new Date(rateLimitData.data.rate.reset * 1000).toLocaleString()}`);
      }
    } else {
      console.log('   ❌ Rate limit endpoint failed:', rateLimitData.error);
    }
    
    // Test 7: Error handling - invalid type
    console.log('\n7. Testing error handling...');
    const errorResponse = await fetch(`${API_ENDPOINT}?type=invalid`);
    const errorData = await errorResponse.json();
    
    if (errorResponse.status === 400) {
      console.log('   ✅ Error handling working correctly');
      console.log(`   📋 Valid types: ${errorData.validTypes.join(', ')}`);
    } else {
      console.log('   ❌ Error handling not working as expected');
    }
    
    // Test 8: Cache management (POST endpoints)
    console.log('\n8. Testing cache management...');
    
    // Get cache stats
    const cacheStatsResponse = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getCacheStats' })
    });
    const cacheStatsData = await cacheStatsResponse.json();
    
    if (cacheStatsResponse.ok) {
      console.log('   ✅ Cache stats endpoint working');
      console.log(`   💾 Total cache entries: ${cacheStatsData.totalEntries}`);
      if (cacheStatsData.entries.length > 0) {
        console.log('   📋 Cache entries:');
        cacheStatsData.entries.forEach((entry, index) => {
          const ageMinutes = Math.floor(entry.age / 60000);
          console.log(`      ${index + 1}. ${entry.key} (${ageMinutes}m old)`);
        });
      }
    } else {
      console.log('   ❌ Cache stats endpoint failed:', cacheStatsData.error);
    }
    
    // Test 9: Force refresh
    console.log('\n9. Testing force refresh...');
    const forceResponse = await fetch(`${API_ENDPOINT}?type=stats&force=true`);
    const forceData = await forceResponse.json();
    
    if (forceResponse.ok) {
      console.log('   ✅ Force refresh working');
      console.log(`   📊 Response time: ${forceData.processingTime}ms`);
      console.log(`   💾 Cached: ${forceData.cached ? 'Yes' : 'No'}`);
      
      if (!forceData.cached) {
        console.log('   🚀 Force refresh bypassed cache correctly!');
      } else {
        console.log('   ⚠️  Force refresh didn\'t bypass cache');
      }
    } else {
      console.log('   ❌ Force refresh failed:', forceData.error);
    }
    
    console.log('\n✅ GitHub API route testing completed successfully!');
    
  } catch (error) {
    console.error('\n❌ GitHub API route testing failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the Next.js development server is running:');
      console.log('   npm run dev');
    }
    
    process.exit(1);
  }
}

// Run the test
testGitHubAPI().catch(console.error); 