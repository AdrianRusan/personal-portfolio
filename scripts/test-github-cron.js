#!/usr/bin/env node

/**
 * Test script for GitHub Sync Cron Job
 * Tests the cron job endpoint functionality
 */

const { config } = require('dotenv');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Load environment variables
config({ path: '.env.local' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const CRON_ENDPOINT = '/api/cron/github-sync';

/**
 * Make HTTP request
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 30000
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

/**
 * Test cron job endpoint
 */
async function testCronJob() {
  console.log('🔄 Testing GitHub Sync Cron Job...\n');
  
  try {
    // Test GET request (info endpoint)
    console.log('📋 Testing GET request (info)...');
    const getResponse = await makeRequest(`${BASE_URL}${CRON_ENDPOINT}`);
    console.log(`Status: ${getResponse.status}`);
    console.log(`Response:`, JSON.stringify(getResponse.data, null, 2));
    console.log();

    // Test POST request (actual sync)
    console.log('🔄 Testing POST request (sync)...');
    const postResponse = await makeRequest(`${BASE_URL}${CRON_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRON_SECRET || 'dev-secret'}`
      }
    });
    
    console.log(`Status: ${postResponse.status}`);
    console.log(`Response:`, JSON.stringify(postResponse.data, null, 2));
    
    if (postResponse.status === 200 && postResponse.data.success) {
      console.log('✅ Cron job test successful!');
      console.log(`Duration: ${postResponse.data.duration}`);
      console.log(`Revalidated paths: ${postResponse.data.revalidatedPaths.join(', ')}`);
    } else {
      console.log('❌ Cron job test failed!');
      console.log('Response:', postResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

/**
 * Test GitHub data after sync
 */
async function testGitHubData() {
  console.log('\n🔍 Testing GitHub data after sync...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/github?type=stats`);
    console.log(`GitHub API Status: ${response.status}`);
    
    if (response.status === 200) {
      console.log('✅ GitHub data accessible after sync');
      console.log(`User: ${response.data.user?.name || 'N/A'}`);
      console.log(`Total Stars: ${response.data.totalStars || 0}`);
      console.log(`Total Repos: ${response.data.user?.public_repos || 0}`);
    } else {
      console.log('⚠️  GitHub data not accessible:', response.data);
    }
  } catch (error) {
    console.error('❌ GitHub data test failed:', error.message);
  }
}

/**
 * Main test function
 */
async function main() {
  console.log('🚀 GitHub Sync Cron Job Test\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Endpoint: ${CRON_ENDPOINT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}\n`);
  
  await testCronJob();
  await testGitHubData();
  
  console.log('\n✅ All tests completed!');
}

// Run tests
if (require.main === module) {
  main().catch(console.error);
} 