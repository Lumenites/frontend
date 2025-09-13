const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  subscription: {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'trial'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    renewalDate: {
      type: Date
    },
    usage: {
      storage: {
        used: {
          type: Number,
          default: 0
        },
        quota: {
          type: Number,
          default: 100
        }
      }
    }
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      renewal: {
        type: Boolean,
        default: true
      },
      offers: {
        type: Boolean,
        default: true
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Calculate usage percentage
userSchema.methods.getUsagePercentage = function() {
  if (this.subscription.usage.storage.quota === 0) return 0;
  return (this.subscription.usage.storage.used / this.subscription.usage.storage.quota) * 100;
};

module.exports = mongoose.model('User', userSchema);