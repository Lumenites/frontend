const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Sub Manager API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ User registered:', registerData.user.email);
      
      // Test login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ User logged in:', loginData.user.email);
        
        // Test dashboard with token
        console.log('\n4. Testing dashboard API...');
        const dashboardResponse = await fetch(`${API_BASE_URL}/dashboard/overview`, {
          headers: {
            'Authorization': `Bearer ${loginData.token}`
          }
        });
        
        if (dashboardResponse.ok) {
          const dashboardData = await dashboardResponse.json();
          console.log('✅ Dashboard data loaded successfully');
          console.log('   - Current plan:', dashboardData.currentSubscription.planName);
          console.log('   - Usage:', `${dashboardData.currentSubscription.used}GB / ${dashboardData.currentSubscription.quota}GB`);
          console.log('   - Offers available:', dashboardData.offers.length);
          console.log('   - Notifications:', dashboardData.notifications.length);
        } else {
          console.log('❌ Dashboard failed:', await dashboardResponse.text());
        }
        
        // Test plans API
        console.log('\n5. Testing plans API...');
        const plansResponse = await fetch(`${API_BASE_URL}/plans`);
        if (plansResponse.ok) {
          const plansData = await plansResponse.json();
          console.log('✅ Plans loaded:', plansData.plans.length, 'plans available');
        } else {
          console.log('❌ Plans failed:', await plansResponse.text());
        }
        
      } else {
        console.log('❌ Login failed:', await loginResponse.text());
      }
    } else {
      console.log('❌ Registration failed:', await registerResponse.text());
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
