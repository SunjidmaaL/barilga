/**
 * Strapi Service Status Checker
 * 
 * Энэ script Strapi service-ийн status-ийг шалгана.
 * 
 * Usage: node check-strapi-status.js
 */

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://effortless-luck-023aebe70f.strapiapp.com';

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

async function checkEndpoint(url, description) {
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    let statusColor = 'green';
    if (response.status >= 500) statusColor = 'red';
    else if (response.status >= 400) statusColor = 'yellow';
    
    log(`✓ ${description}`, statusColor);
    log(`  URL: ${url}`, 'blue');
    log(`  Status: ${response.status} ${response.statusText}`, statusColor);
    log(`  Response Time: ${responseTime}ms`, responseTime > 5000 ? 'yellow' : 'green');
    
    if (response.ok) {
      try {
        const data = await response.json();
        const preview = JSON.stringify(data).substring(0, 100);
        log(`  Response: ${preview}...`, 'green');
      } catch (e) {
        log(`  Response: (non-JSON)`, 'yellow');
      }
    }
    
    return { success: response.ok, status: response.status, responseTime, url };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    log(`✗ ${description}`, 'red');
    log(`  URL: ${url}`, 'blue');
    log(`  Error: ${error.message}`, 'red');
    log(`  Response Time: ${responseTime}ms`, 'red');
    return { success: false, error: error.message, responseTime, url };
  }
}

async function main() {
  logSection('Strapi Service Status Checker');
  log(`Checking: ${API_URL}`, 'blue');
  log(`Time: ${new Date().toISOString()}`, 'blue');
  
  const results = [];
  
  logSection('1. Root API');
  results.push(await checkEndpoint(`${API_URL}/api`, 'Root API'));
  
  logSection('2. News API');
  results.push(await checkEndpoint(`${API_URL}/api/news2`, 'News API'));
  
  logSection('3. Trainings API');
  results.push(await checkEndpoint(`${API_URL}/api/trainings`, 'Trainings API'));
  
  logSection('4. Admin Panel');
  results.push(await checkEndpoint(`${API_URL}/admin`, 'Admin Panel'));
  
  logSection('Summary');
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  log(`Total: ${totalCount}`, 'blue');
  log(`Success: ${successCount}`, successCount === totalCount ? 'green' : 'yellow');
  log(`Failed: ${totalCount - successCount}`, successCount === totalCount ? 'green' : 'red');
  
  const avgTime = results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length;
  log(`Avg Response: ${Math.round(avgTime)}ms`, avgTime > 5000 ? 'yellow' : 'green');
  
  logSection('Recommendations');
  
  if (successCount === 0) {
    log('❌ Strapi service is not responding', 'red');
    log('   → Strapi dashboard руу орох: https://cloud.strapi.io', 'yellow');
    log('   → Service restart хийх', 'yellow');
    log('   → 5-10 минут хүлээх (cold start)', 'yellow');
  } else if (successCount < totalCount) {
    log('⚠️  Some endpoints failed', 'yellow');
    log('   → Permissions шалгах', 'yellow');
    log('   → Content types шалгах', 'yellow');
  } else if (avgTime > 10000) {
    log('⚠️  Slow response times', 'yellow');
    log('   → Cold start mode байж магадгүй', 'yellow');
    log('   → Paid plan upgrade хийх', 'yellow');
  } else {
    log('✅ Strapi service is healthy!', 'green');
  }
  
  console.log('\n');
}

main().catch(error => {
  log(`\nFatal Error: ${error.message}`, 'red');
  process.exit(1);
});
