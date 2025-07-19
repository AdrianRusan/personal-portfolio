#!/usr/bin/env node

/**
 * Test script for email sequences functionality
 * This script tests the email sequence automation system
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Email Sequences Functionality...\n');

// Test 1: Check if email sequences API route exists
console.log('1. Checking email sequences API route...');
const emailSequencesRoute = path.join(__dirname, '../app/api/cron/email-sequences/route.ts');
if (fs.existsSync(emailSequencesRoute)) {
  console.log('   ✅ Email sequences API route exists');
} else {
  console.log('   ❌ Email sequences API route missing');
  process.exit(1);
}

// Test 2: Check if email sequences library exists
console.log('\n2. Checking email sequences library...');
const emailSequencesLib = path.join(__dirname, '../lib/email-sequences.ts');
if (fs.existsSync(emailSequencesLib)) {
  console.log('   ✅ Email sequences library exists');
} else {
  console.log('   ❌ Email sequences library missing');
  process.exit(1);
}

// Test 3: Check if follow-up email template exists
console.log('\n3. Checking follow-up email template...');
const followUpEmailTemplate = path.join(__dirname, '../emails/FollowUpEmail.tsx');
if (fs.existsSync(followUpEmailTemplate)) {
  console.log('   ✅ Follow-up email template exists');
} else {
  console.log('   ❌ Follow-up email template missing');
  process.exit(1);
}

// Test 4: Check vercel.json configuration
console.log('\n4. Checking Vercel cron configuration...');
const vercelConfig = path.join(__dirname, '../vercel.json');
if (fs.existsSync(vercelConfig)) {
  const config = JSON.parse(fs.readFileSync(vercelConfig, 'utf8'));
  
  // Check if email sequences cron job is configured
  const emailSequencesCron = config.crons?.find(cron => 
    cron.path === '/api/cron/email-sequences'
  );
  
  if (emailSequencesCron) {
    console.log('   ✅ Email sequences cron job configured');
    console.log(`   📅 Schedule: ${emailSequencesCron.schedule}`);
  } else {
    console.log('   ❌ Email sequences cron job not configured');
    process.exit(1);
  }
  
  // Check if function timeout is configured
  const functionConfig = config.functions?.['app/api/cron/email-sequences/route.ts'];
  if (functionConfig) {
    console.log(`   ⏱️  Max duration: ${functionConfig.maxDuration}s`);
  }
} else {
  console.log('   ❌ vercel.json not found');
  process.exit(1);
}

// Test 5: Check if contact form integration is present
console.log('\n5. Checking contact form integration...');
const contactAction = path.join(__dirname, '../app/actions/contact.ts');
if (fs.existsSync(contactAction)) {
  const contactContent = fs.readFileSync(contactAction, 'utf8');
  if (contactContent.includes('addToEmailSequence')) {
    console.log('   ✅ Contact form integrated with email sequences');
  } else {
    console.log('   ❌ Contact form not integrated with email sequences');
    process.exit(1);
  }
} else {
  console.log('   ❌ Contact action file not found');
  process.exit(1);
}

// Test 6: Check if webhook handler exists
console.log('\n6. Checking static content revalidation webhook...');
const webhookHandler = path.join(__dirname, '../app/api/webhooks/revalidate-static/route.ts');
if (fs.existsSync(webhookHandler)) {
  console.log('   ✅ Static content revalidation webhook exists');
} else {
  console.log('   ❌ Static content revalidation webhook missing');
  process.exit(1);
}

// Test 7: Try to build the project
console.log('\n7. Testing build...');
try {
  console.log('   Building project...');
  execSync('npm run build', { stdio: 'pipe', cwd: path.join(__dirname, '..') });
  console.log('   ✅ Build successful');
} catch (error) {
  console.log('   ❌ Build failed');
  console.log('   Error:', error.message);
  process.exit(1);
}

console.log('\n🎉 All email sequences tests passed!');
console.log('\n📋 Summary:');
console.log('   • Email sequences API route: ✅');
console.log('   • Email sequences library: ✅');
console.log('   • Follow-up email template: ✅');
console.log('   • Vercel cron configuration: ✅');
console.log('   • Contact form integration: ✅');
console.log('   • Static content webhook: ✅');
console.log('   • Build test: ✅');

console.log('\n🚀 Next steps:');
console.log('   1. Deploy to Vercel');
console.log('   2. Check Vercel dashboard for cron jobs');
console.log('   3. Test contact form submission');
console.log('   4. Verify email sequences are created');
console.log('   5. Test webhook endpoint manually');
console.log('   6. Wait for scheduled cron job execution');

console.log('\n💡 Manual testing commands:');
console.log('   • Test email sequences: curl -X POST http://localhost:3000/api/cron/email-sequences');
console.log('   • Test webhook: curl -X POST http://localhost:3000/api/webhooks/revalidate-static');
console.log('   • Check sequence stats: curl http://localhost:3000/api/cron/email-sequences'); 