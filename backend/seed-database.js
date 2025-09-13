const mongoose = require('mongoose');
const config = require('./config');

// Import models
const User = require('./models/User');
const Plan = require('./models/Plan');
const Offer = require('./models/Offer');
const Notification = require('./models/Notification');

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  seedDatabase();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await clearExistingData();

    // Create plans
    const plans = await createPlans();
    console.log(`✅ Created ${plans.length} plans`);

    // Create offers
    const offers = await createOffers();
    console.log(`✅ Created ${offers.length} offers`);

    // Create demo user
    const user = await createDemoUser();
    console.log(`✅ Created demo user: ${user.email}`);

    // Create notifications
    const notifications = await createNotifications(user._id);
    console.log(`✅ Created ${notifications.length} notifications`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Plans: ${plans.length}`);
    console.log(`- Offers: ${offers.length}`);
    console.log(`- Users: 1 (demo@example.com)`);
    console.log(`- Notifications: ${notifications.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function clearExistingData() {
  console.log('🧹 Clearing existing data...');
  await User.deleteMany({});
  await Plan.deleteMany({});
  await Offer.deleteMany({});
  await Notification.deleteMany({});
}

async function createPlans() {
  const plansData = [
    {
      name: 'Starter Plan',
      description: 'Perfect for individuals and small projects',
      price: 9,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        { name: '50GB Storage', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'API Access', included: false },
        { name: 'Custom Integrations', included: false }
      ],
      limits: {
        storage: 50,
        users: 1,
        apiCalls: 500
      },
      badges: {
        popular: false,
        bestValue: false,
        recommended: false
      },
      sortOrder: 1,
      isActive: true
    },
    {
      name: 'Professional Plan',
      description: 'Ideal for growing businesses and teams',
      price: 29,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        { name: '200GB Storage', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Priority Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Integrations', included: false }
      ],
      limits: {
        storage: 200,
        users: 5,
        apiCalls: 5000
      },
      badges: {
        popular: true,
        bestValue: false,
        recommended: true
      },
      sortOrder: 2,
      isActive: true
    },
    {
      name: 'Enterprise Plan',
      description: 'For large organizations with advanced needs',
      price: 99,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        { name: '1TB Storage', included: true },
        { name: 'Premium Analytics', included: true },
        { name: '24/7 Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Integrations', included: true }
      ],
      limits: {
        storage: 1000,
        users: 100,
        apiCalls: 50000
      },
      badges: {
        popular: false,
        bestValue: true,
        recommended: true
      },
      sortOrder: 3,
      isActive: true
    }
  ];

  return await Plan.insertMany(plansData);
}

async function createOffers() {
  const offersData = [
    {
      code: 'WELCOME20',
      name: 'Welcome Offer - 20% Off',
      description: 'Get 20% off your first month with any plan',
      discountType: 'percentage',
      discountValue: 20,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      conditions: {
        minAmount: 0,
        newUsersOnly: true
      }
    },
    {
      code: 'UPGRADE15',
      name: 'Upgrade Special - 15% Off',
      description: 'Upgrade to Professional or Enterprise and save 15%',
      discountType: 'percentage',
      discountValue: 15,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
      usageLimit: 50,
      usedCount: 0,
      isActive: true,
      conditions: {
        minAmount: 25,
        newUsersOnly: false
      }
    },
    {
      code: 'SAVE50',
      name: 'Annual Plan - 50% Off',
      description: 'Switch to annual billing and save 50%',
      discountType: 'percentage',
      discountValue: 50,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      usageLimit: 25,
      usedCount: 0,
      isActive: true,
      conditions: {
        minAmount: 0,
        newUsersOnly: false
      }
    }
  ];

  return await Offer.insertMany(offersData);
}

async function createDemoUser() {
  // Check if demo user already exists
  let user = await User.findOne({ email: 'demo@example.com' });
  
  if (user) {
    console.log('Demo user already exists, updating...');
    // Update existing user
    user.subscription = {
      planId: null,
      status: 'trial',
      startDate: new Date(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      usage: {
        storage: {
          used: 25,
          quota: 50
        }
      }
    };
    await user.save();
    return user;
  }

  // Create new demo user
  const userData = {
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123',
    role: 'user',
    subscription: {
      planId: null,
      status: 'trial',
      startDate: new Date(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      usage: {
        storage: {
          used: 25,
          quota: 50
        }
      }
    },
    preferences: {
      notifications: {
        email: true,
        renewal: true,
        offers: true
      }
    },
    isActive: true
  };

  return await User.create(userData);
}

async function createNotifications(userId) {
  const notificationsData = [
    {
      userId: userId,
      type: 'welcome',
      title: 'Welcome to Sub Manager! 🎉',
      message: 'You are now on a trial plan. Explore our features and upgrade when you\'re ready!',
      priority: 'medium',
      isDismissed: false,
      actionUrl: '/plans',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    },
    {
      userId: userId,
      type: 'offer',
      title: 'Special Offer Available! 💰',
      message: 'Use code WELCOME20 to get 20% off your first month with any plan.',
      priority: 'high',
      isDismissed: false,
      actionUrl: '/plans',
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
    },
    {
      userId: userId,
      type: 'usage',
      title: 'Storage Usage Update 📊',
      message: 'You\'ve used 50% of your storage quota. Consider upgrading for more space.',
      priority: 'medium',
      isDismissed: false,
      actionUrl: '/dashboard',
      expiresAt: null
    },
    {
      userId: userId,
      type: 'system',
      title: 'New Features Available! ✨',
      message: 'Check out our latest updates including improved analytics and better performance.',
      priority: 'low',
      isDismissed: false,
      actionUrl: '/features',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  ];

  return await Notification.insertMany(notificationsData);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
