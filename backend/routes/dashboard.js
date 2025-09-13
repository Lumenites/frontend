const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Offer = require('../models/Offer');
const Notification = require('../models/Notification');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/dashboard/overview
// @desc    Get dashboard overview data
// @access  Public
router.get('/overview', async (req, res) => {
  try {
    // Check if database is connected
    const isDbConnected = mongoose.connection.readyState === 1;
    
    if (!isDbConnected) {
      console.log('Database not connected, returning demo data');
      return res.json({
        currentSubscription: {
          planId: null,
          planName: 'Trial Plan',
          price: 0,
          used: 45,
          quota: 100,
          usagePercentage: 45.0,
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: 'active'
        },
        recommendedPlans: [
          {
            id: '1',
            name: 'Basic Plan',
            price: 10,
            quota: 100,
            features: [
              { name: '100GB Storage', included: true },
              { name: 'Basic Analytics', included: true },
              { name: 'Email Support', included: true }
            ],
            badges: { popular: false, bestValue: false }
          },
          {
            id: '2',
            name: 'Standard Plan',
            price: 20,
            quota: 200,
            features: [
              { name: '200GB Storage', included: true },
              { name: 'Advanced Analytics', included: true },
              { name: 'Priority Support', included: true }
            ],
            badges: { popular: true, bestValue: false }
          },
          {
            id: '3',
            name: 'Premium Plan',
            price: 40,
            quota: 500,
            features: [
              { name: '500GB Storage', included: true },
              { name: 'Premium Analytics', included: true },
              { name: '24/7 Support', included: true }
            ],
            badges: { popular: false, bestValue: true }
          }
        ],
        offers: [
          {
            id: '1',
            code: 'SAVE20',
            name: '20% Off Standard Plan',
            description: 'Get 20% off your first month of the Standard Plan',
            discountType: 'percentage',
            discountValue: 20,
            validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          },
          {
            id: '2',
            code: 'UPGRADE15',
            name: '15% Off Premium Plan',
            description: 'Upgrade to Premium and save 15% on your first month',
            discountType: 'percentage',
            discountValue: 15,
            validTill: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          }
        ],
        notifications: [
          {
            id: '1',
            type: 'system',
            title: 'Welcome to Sub Manager!',
            message: 'You are currently on a trial plan. Upgrade to unlock more features.',
            priority: 'medium',
            actionUrl: '/plans',
            createdAt: new Date()
          }
        ]
      });
    }

    console.log('Database connected, fetching real data...');

    // Get or create a demo user
    let user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      console.log('Creating demo user...');
      // Create a demo user if none exists
      user = new User({
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        subscription: {
          planId: null,
          status: 'trial',
          startDate: new Date(),
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          usage: {
            storage: {
              used: 45,
              quota: 100
            }
          }
        }
      });
      await user.save();
      console.log('Demo user created successfully');
    }

    // Get current plan details
    let currentPlan;
    if (user.subscription.planId) {
      currentPlan = await Plan.findById(user.subscription.planId);
    }
    
    if (!currentPlan) {
      currentPlan = {
        _id: null,
        name: 'Trial Plan',
        price: 0,
        features: [
          { name: '100GB Storage', included: true },
          { name: 'Basic Analytics', included: true },
          { name: 'Email Support', included: true }
        ],
        limits: {
          storage: 100,
          users: 1,
          apiCalls: 1000
        },
        badges: {}
      };
    }

    // Calculate usage percentage
    const usagePercentage = user.getUsagePercentage();

    // Get active offers
    const offers = await Offer.find({
      isActive: true,
      validFrom: { $lte: new Date() },
      validTill: { $gte: new Date() }
    }).sort({ createdAt: -1 }).limit(3);

    // Get notifications for the demo user
    const notifications = await Notification.find({
      userId: user._id,
      isDismissed: false,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    }).sort({ priority: -1, createdAt: -1 }).limit(5);

    // Get all available plans (excluding current plan) for upgrade/downgrade
    const allPlans = await Plan.find({
      isActive: true,
      _id: { $ne: user.subscription.planId }
    })
    .sort({ price: 1, sortOrder: 1 })
    .select('name price features limits badges');

    // Get recommended plans (top 3 for display)
    const recommendedPlans = allPlans
      .sort((a, b) => {
        // Sort by badges first, then by price
        if (a.badges.popular && !b.badges.popular) return -1;
        if (!a.badges.popular && b.badges.popular) return 1;
        if (a.badges.bestValue && !b.badges.bestValue) return -1;
        if (!a.badges.bestValue && b.badges.bestValue) return 1;
        return a.price - b.price;
      })
      .slice(0, 3);

    console.log('Sending real database data to frontend...');
    
    res.json({
      currentSubscription: {
        planId: user.subscription.planId?._id || null,
        planName: currentPlan.name,
        price: currentPlan.price,
        used: user.subscription.usage.storage.used,
        quota: user.subscription.usage.storage.quota,
        usagePercentage: Math.round(usagePercentage * 100) / 100,
        renewalDate: user.subscription.renewalDate,
        status: user.subscription.status
      },
      recommendedPlans: recommendedPlans.map(plan => ({
        id: plan._id,
        name: plan.name,
        price: plan.price,
        quota: plan.limits.storage,
        features: plan.features,
        badges: plan.badges
      })),
      allPlans: allPlans.map(plan => ({
        id: plan._id,
        name: plan.name,
        price: plan.price,
        quota: plan.limits.storage,
        features: plan.features,
        badges: plan.badges
      })),
      offers: offers.map(offer => ({
        id: offer._id,
        code: offer.code,
        name: offer.name,
        description: offer.description,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        validTill: offer.validTill
      })),
      notifications: notifications.map(notif => ({
        id: notif._id,
        type: notif.type,
        title: notif.title,
        message: notif.message,
        priority: notif.priority,
        actionUrl: notif.actionUrl,
        createdAt: notif.createdAt
      }))
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    
    // Return demo data on error as fallback
    res.json({
      currentSubscription: {
        planId: null,
        planName: 'Trial Plan',
        price: 0,
        used: 45,
        quota: 100,
        usagePercentage: 45.0,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
        recommendedPlans: [
          {
            id: '1',
            name: 'Basic Plan',
            price: 10,
            quota: 100,
            features: [
              { name: '100GB Storage', included: true },
              { name: 'Basic Analytics', included: true },
              { name: 'Email Support', included: true }
            ],
            badges: { popular: false, bestValue: false }
          },
          {
            id: '2',
            name: 'Standard Plan',
            price: 20,
            quota: 200,
            features: [
              { name: '200GB Storage', included: true },
              { name: 'Advanced Analytics', included: true },
              { name: 'Priority Support', included: true }
            ],
            badges: { popular: true, bestValue: false }
          }
        ],
        allPlans: [
          {
            id: '1',
            name: 'Basic Plan',
            price: 10,
            quota: 100,
            features: [
              { name: '100GB Storage', included: true },
              { name: 'Basic Analytics', included: true },
              { name: 'Email Support', included: true }
            ],
            badges: { popular: false, bestValue: false }
          },
          {
            id: '2',
            name: 'Standard Plan',
            price: 20,
            quota: 200,
            features: [
              { name: '200GB Storage', included: true },
              { name: 'Advanced Analytics', included: true },
              { name: 'Priority Support', included: true }
            ],
            badges: { popular: true, bestValue: false }
          }
        ],
      offers: [
        {
          id: '1',
          code: 'SAVE20',
          name: '20% Off Standard Plan',
          description: 'Get 20% off your first month of the Standard Plan',
          discountType: 'percentage',
          discountValue: 20,
          validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        }
      ],
      notifications: [
        {
          id: '1',
          type: 'system',
          title: 'Welcome to Sub Manager!',
          message: 'You are currently on a trial plan. Upgrade to unlock more features.',
          priority: 'medium',
          actionUrl: '/plans',
          createdAt: new Date()
        }
      ]
    });
  }
});

// @route   POST /api/dashboard/switch-plan
// @desc    Switch user's subscription plan
// @access  Public (using demo user)
router.post('/switch-plan', async (req, res) => {
  try {
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({ message: 'Plan ID is required' });
    }

    // Find the demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify plan exists
    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Plan not found or inactive' });
    }

    // Update user subscription
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        'subscription.planId': planId,
        'subscription.status': 'active',
        'subscription.usage.storage.quota': plan.limits.storage,
        // Adjust used storage if it exceeds the new quota
        'subscription.usage.storage.used': Math.min(user.subscription.usage.storage.used, plan.limits.storage),
        'subscription.renewalDate': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      },
      { new: true }
    ).populate('subscription.planId', 'name price features limits badges');

    // Create notification
    await Notification.create({
      userId: user._id,
      type: 'system',
      title: 'Plan Updated',
      message: `Successfully switched to ${plan.name}`,
      priority: 'medium'
    });

    res.json({
      message: 'Plan switched successfully',
      subscription: updatedUser.subscription
    });
  } catch (error) {
    console.error('Switch plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/dashboard/cancel-subscription
// @desc    Cancel user's subscription
// @access  Public (using demo user)
router.post('/cancel-subscription', async (req, res) => {
  try {
    // Find the demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user subscription status
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        'subscription.status': 'cancelled'
      },
      { new: true }
    );

    // Create notification
    await Notification.create({
      userId: user._id,
      type: 'system',
      title: 'Subscription Cancelled',
      message: 'Your subscription has been cancelled. You will retain access until the end of your current billing period.',
      priority: 'high'
    });

    res.json({
      message: 'Subscription cancelled successfully',
      subscription: updatedUser.subscription
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/dashboard/reactivate-subscription
// @desc    Reactivate user's subscription
// @access  Public (using demo user)
router.post('/reactivate-subscription', async (req, res) => {
  try {
    console.log('Reactivate subscription endpoint called');
    
    // Find the demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found, updating subscription status...');

    // Update user subscription status
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        'subscription.status': 'active'
      },
      { new: true }
    );

    console.log('Subscription updated, creating notification...');

    // Create notification
    await Notification.create({
      userId: user._id,
      type: 'system',
      title: 'Subscription Reactivated',
      message: 'Your subscription has been reactivated successfully!',
      priority: 'medium'
    });

    console.log('Reactivate subscription successful');

    res.json({
      message: 'Subscription reactivated successfully',
      subscription: updatedUser.subscription
    });
  } catch (error) {
    console.error('Reactivate subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/dashboard/apply-offer
// @desc    Apply an offer code
// @access  Public (using demo user)
router.post('/apply-offer', async (req, res) => {
  try {
    const { offerCode } = req.body;

    if (!offerCode) {
      return res.status(400).json({ message: 'Offer code is required' });
    }

    // Find the demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const offer = await Offer.findOne({ 
      code: offerCode.toUpperCase(),
      isActive: true
    });

    if (!offer) {
      return res.status(404).json({ message: 'Invalid offer code' });
    }

    if (!offer.isValid()) {
      return res.status(400).json({ message: 'Offer code has expired or reached usage limit' });
    }

    // Check if user is eligible
    if (offer.conditions.newUsersOnly && user.subscription.status !== 'trial') {
      return res.status(400).json({ message: 'This offer is only for new users' });
    }

    // Increment usage count
    offer.usedCount += 1;
    await offer.save();

    // Create notification
    await Notification.create({
      userId: user._id,
      type: 'offer',
      title: 'Offer Applied',
      message: `Successfully applied offer ${offer.code}. ${offer.discountValue}${offer.discountType === 'percentage' ? '%' : '$'} discount will be applied to your next billing.`,
      priority: 'medium',
      metadata: { offerId: offer._id }
    });

    res.json({
      message: 'Offer applied successfully',
      offer: {
        code: offer.code,
        name: offer.name,
        discountType: offer.discountType,
        discountValue: offer.discountValue
      }
    });
  } catch (error) {
    console.error('Apply offer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/dashboard/dismiss-notification/:id
// @desc    Dismiss a notification
// @access  Public (using demo user)
router.put('/dismiss-notification/:id', async (req, res) => {
  try {
    // Find the demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notification = await Notification.findOneAndUpdate(
      { 
        _id: req.params.id, 
        userId: user._id 
      },
      { isDismissed: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification dismissed successfully' });
  } catch (error) {
    console.error('Dismiss notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
