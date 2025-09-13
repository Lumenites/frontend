const plans = [
  { 
    id: 1, 
    name: "Basic Plan", 
    quota: "100GB", 
    quotaValue: 100,
    price: "$10", 
    priceValue: 10,
    features: ["100GB Storage", "Basic Analytics", "Email Support"],
    popular: false,
    bestValue: false
  },
  { 
    id: 2, 
    name: "Standard Plan", 
    quota: "200GB", 
    quotaValue: 200,
    price: "$20", 
    priceValue: 20,
    features: ["200GB Storage", "Advanced Analytics", "Priority Support", "API Access"],
    popular: true,
    bestValue: false
  },
  { 
    id: 3, 
    name: "Premium Plan", 
    quota: "500GB", 
    quotaValue: 500,
    price: "$40", 
    priceValue: 40,
    features: ["500GB Storage", "Premium Analytics", "24/7 Support", "API Access", "Custom Integrations"],
    popular: false,
    bestValue: true
  }
];

const currentSubscription = { 
  planId: 2, 
  planName: "Standard Plan",
  used: 120, 
  quota: 200,
  price: "$20",
  renewalDate: "2024-12-15",
  status: "active"
};

const offers = [
  { 
    id: 1, 
    code: "SAVE20", 
    description: "20% off Standard Plan", 
    discount: 20, 
    validTill: "30 Sept 2025",
    applicablePlan: 2
  },
  { 
    id: 2, 
    code: "UPGRADE15", 
    description: "15% off Premium Plan", 
    discount: 15, 
    validTill: "15 Oct 2024",
    applicablePlan: 3
  }
];

const notifications = [
  {
    id: 1,
    type: "renewal",
    title: "Plan Renewal Reminder",
    message: "Your Standard Plan will renew on December 15, 2024",
    priority: "high",
    dismissible: true
  },
  {
    id: 2,
    type: "offer",
    title: "Special Offer Available",
    message: "Get 20% off your next billing cycle with code SAVE20",
    priority: "medium",
    dismissible: true
  }
];

export { plans, currentSubscription, offers, notifications };
