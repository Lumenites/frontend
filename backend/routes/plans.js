const express = require('express');
const Plan = require('../models/Plan');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/plans
// @desc    Get all active plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true })
      .sort({ sortOrder: 1, price: 1 })
      .select('name description price currency billingCycle features limits badges');

    res.json({
      plans: plans.map(plan => ({
        id: plan._id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle,
        quota: plan.limits.storage,
        features: plan.features,
        badges: plan.badges
      }))
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/plans/:id
// @desc    Get specific plan details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({
      plan: {
        id: plan._id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle,
        quota: plan.limits.storage,
        features: plan.features,
        badges: plan.badges
      }
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/plans/recommended
// @desc    Get recommended plans for user
// @access  Private
router.get('/recommended', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const currentPlanId = user.subscription.planId;

    // Get recommended plans (excluding current plan)
    const recommendedPlans = await Plan.find({
      isActive: true,
      _id: { $ne: currentPlanId }
    })
    .sort({ 'badges.popular': -1, 'badges.bestValue': -1, sortOrder: 1 })
    .limit(3)
    .select('name description price currency billingCycle features limits badges');

    res.json({
      plans: recommendedPlans.map(plan => ({
        id: plan._id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle,
        quota: plan.limits.storage,
        features: plan.features,
        badges: plan.badges
      }))
    });
  } catch (error) {
    console.error('Get recommended plans error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
