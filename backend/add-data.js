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
  addData();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function addData() {
  try {
    console.log('🌱 Adding data to database...');

    // Add more plans
    await addMorePlans();
    
    // Add more offers
    await addMoreOffers();
    
    // Add more notifications
    const user = await User.findOne({ email: 'demo@example.com' });
    if (user) {
      await addMoreNotifications(user._id);
    }

    console.log('🎉 Data added successfully!');

  } catch (error) {
    console.error('❌ Error adding data:', error);
  } finally {
    mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function addMorePlans() {
  const additionalPlans = [
    {
      name: 'Free Plan',
      description: 'Get started with our free plan',
      price: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        { name: '10GB Storage', included: true },
        { name: 'Basic Support', included: true },
        { name: 'Limited Analytics', included: true }
      ],
      limits: {
        storage: 10,
        users: 1,
        apiCalls: 100
      },
      badges: {
        popular: false,
        bestValue: false,
        recommended: false
      },
      sortOrder: 0,
      isActive: true
    },
    {
      name: 'Business Plan',
      description: 'Perfect for medium-sized businesses',
      price: 49,
      currency: 'USD',
      billingCycle: 'monthly',
      features: [
        { name: '500GB Storage', included: true },
        { name: 'Business Analytics', included: true },
        { name: 'Priority Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Team Collaboration', included: true }
      ],
      limits: {
        storage: 500,
        users: 25,
        apiCalls: 25000
      },
      badges: {
        popular: false,
        bestValue: false,
        recommended: true
      },
      sortOrder: 2.5,
      isActive: true
    }
  ];

  for (const planData of additionalPlans) {
    const existingPlan = await Plan.findOne({ name: planData.name });
    if (!existingPlan) {
      await Plan.create(planData);
      console.log(`✅ Added plan: ${planData.name}`);
    } else {
      console.log(`⚠️  Plan already exists: ${planData.name}`);
    }
  }
}

async function addMoreOffers() {
  const additionalOffers = [
    {
      code: 'SUMMER2024',
      name: 'Summer Special - 30% Off',
      description: 'Limited time summer offer - 30% off all plans',
      discountType: 'percentage',
      discountValue: 30,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
      usageLimit: 200,
      usedCount: 0,
      isActive: true,
      conditions: {
        minAmount: 0,
        newUsersOnly: false
      }
    },
    {
      code: 'TEAM10',
      name: 'Team Discount - 10% Off',
      description: 'Special pricing for teams of 5 or more',
      discountType: 'percentage',
      discountValue: 10,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days
      usageLimit: 50,
      usedCount: 0,
      isActive: true,
      conditions: {
        minAmount: 100,
        newUsersOnly: false
      }
    }
  ];

  for (const offerData of additionalOffers) {
    const existingOffer = await Offer.findOne({ code: offerData.code });
    if (!existingOffer) {
      await Offer.create(offerData);
      console.log(`✅ Added offer: ${offerData.code}`);
    } else {
      console.log(`⚠️  Offer already exists: ${offerData.code}`);
    }
  }
}

async function addMoreNotifications(userId) {
  const additionalNotifications = [
    {
      userId: userId,
      type: 'feature',
      title: 'New Dashboard Available! 🚀',
      message: 'Check out our redesigned dashboard with better insights and analytics.',
      priority: 'medium',
      isDismissed: false,
      actionUrl: '/dashboard',
      expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days
    },
    {
      userId: userId,
      type: 'security',
      title: 'Security Update 🔒',
      message: 'We\'ve enhanced our security measures. Your data is now even more protected.',
      priority: 'high',
      isDismissed: false,
      actionUrl: '/security',
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days
    }
  ];

  for (const notifData of additionalNotifications) {
    const existingNotif = await Notification.findOne({ 
      userId: userId, 
      title: notifData.title 
    });
    if (!existingNotif) {
      await Notification.create(notifData);
      console.log(`✅ Added notification: ${notifData.title}`);
    } else {
      console.log(`⚠️  Notification already exists: ${notifData.title}`);
    }
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
