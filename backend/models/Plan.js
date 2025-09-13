const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  features: [{
    name: {
      type: String,
      required: true
    },
    included: {
      type: Boolean,
      default: true
    }
  }],
  limits: {
    storage: {
      type: Number,
      required: true
    },
    users: {
      type: Number,
      default: 1
    },
    apiCalls: {
      type: Number,
      default: 1000
    }
  },
  badges: {
    popular: {
      type: Boolean,
      default: false
    },
    bestValue: {
      type: Boolean,
      default: false
    },
    recommended: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
