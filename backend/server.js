const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const plansRoutes = require('./routes/plans');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  
  // Initialize default data
  initializeDefaultData();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/plans', plansRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize default data
async function initializeDefaultData() {
  try {
    const Plan = require('./models/Plan');
    const Offer = require('./models/Offer');
    const Notification = require('./models/Notification');

    // Check if plans already exist
    const existingPlans = await Plan.countDocuments();
    if (existingPlans === 0) {
      console.log('📦 Initializing default plans...');
      
      const defaultPlans = [
        {
          name: 'Basic Plan',
          description: 'Perfect for small businesses getting started',
          price: 10,
          currency: 'USD',
          billingCycle: 'monthly',
          features: [
            { name: '100GB Storage', included: true },
            { name: 'Basic Analytics', included: true },
            { name: 'Email Support', included: true },
            { name: 'API Access', included: false },
            { name: 'Custom Integrations', included: false }
          ],
          limits: {
            storage: 100,
            users: 1,
            apiCalls: 1000
          },
          badges: {
            popular: false,
            bestValue: false,
            recommended: false
          },
          sortOrder: 1
        },
        {
          name: 'Standard Plan',
          description: 'Ideal for growing businesses with advanced needs',
          price: 20,
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
          sortOrder: 2
        },
        {
          name: 'Premium Plan',
          description: 'For enterprises requiring maximum features and support',
          price: 40,
          currency: 'USD',
          billingCycle: 'monthly',
          features: [
            { name: '500GB Storage', included: true },
            { name: 'Premium Analytics', included: true },
            { name: '24/7 Support', included: true },
            { name: 'API Access', included: true },
            { name: 'Custom Integrations', included: true }
          ],
          limits: {
            storage: 500,
            users: 50,
            apiCalls: 50000
          },
          badges: {
            popular: false,
            bestValue: true,
            recommended: true
          },
          sortOrder: 3
        }
      ];

      await Plan.insertMany(defaultPlans);
      console.log('✅ Default plans created');
    }

    // Check if offers already exist
    const existingOffers = await Offer.countDocuments();
    if (existingOffers === 0) {
      console.log('🎁 Initializing default offers...');
      
      const defaultOffers = [
        {
          code: 'SAVE20',
          name: '20% Off Standard Plan',
          description: 'Get 20% off your first month of the Standard Plan',
          discountType: 'percentage',
          discountValue: 20,
          validFrom: new Date(),
          validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
          usageLimit: 100,
          conditions: {
            minAmount: 0,
            newUsersOnly: false
          }
        },
        {
          code: 'UPGRADE15',
          name: '15% Off Premium Plan',
          description: 'Upgrade to Premium and save 15% on your first month',
          discountType: 'percentage',
          discountValue: 15,
          validFrom: new Date(),
          validTill: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
          usageLimit: 50,
          conditions: {
            minAmount: 0,
            newUsersOnly: false
          }
        }
      ];

      await Offer.insertMany(defaultOffers);
      console.log('✅ Default offers created');
    }

    console.log('🚀 Database initialization complete');
  } catch (error) {
    console.error('❌ Error initializing default data:', error);
  }
}

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
