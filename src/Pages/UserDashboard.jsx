import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { plans, currentSubscription, offers, notifications } from "../utils/dummyData";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [dismissedNotifications, setDismissedNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const currentPlan = plans.find(plan => plan.id === currentSubscription.planId);
  const usagePercentage = (currentSubscription.used / currentSubscription.quota) * 100;

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleUpgrade = () => {
    navigate("/plans");
  };

  const handleDowngrade = () => {
    navigate("/plans");
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    showToastNotification("Subscription cancelled successfully");
  };

  const handleRenew = () => {
    showToastNotification("Plan renewed successfully! New billing date: January 15, 2025");
  };

  const handleSwitchPlan = (planId) => {
    const plan = plans.find(p => p.id === planId);
    showToastNotification(`Switched to ${plan.name} successfully!`);
  };

  const handleApplyOffer = (offer) => {
    showToastNotification(`Offer ${offer.code} applied successfully! ${offer.discount}% discount will be applied to your next billing.`);
  };

  const dismissNotification = (notificationId) => {
    setDismissedNotifications([...dismissedNotifications, notificationId]);
  };

  const activeNotifications = notifications.filter(notif => !dismissedNotifications.includes(notif.id));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white duration-300">
      <Navbar />
      <div className="h-16" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Notifications Banner */}
        {activeNotifications.length > 0 && (
          <div className="mb-6">
            {activeNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg mb-3 ${
                  notification.priority === 'high' 
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                    : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">
                      {notification.title}
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  {notification.dismissible && (
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Your Current Plan
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {currentPlan.name}
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-2">
                    {currentPlan.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentPlan.quota} storage included
                  </p>
                </div>
                
                <div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Storage Used</span>
                      <span>{currentSubscription.used}GB / {currentSubscription.quota}GB</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          usagePercentage > 90 ? 'bg-red-500' : 
                          usagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${usagePercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {usagePercentage.toFixed(1)}% used
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Renews on {new Date(currentSubscription.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={handleUpgrade}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  Upgrade
                </button>
                <button
                  onClick={handleDowngrade}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  Downgrade
                </button>
                <button
                  onClick={handleRenew}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Renew
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Recommended for You
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {plans
                  .filter(plan => plan.id !== currentSubscription.planId)
                  .slice(0, 2)
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {plan.name}
                        </h3>
                        {plan.popular && (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        {plan.bestValue && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                            Best Value
                          </span>
                        )}
                      </div>
                      
                      <p className="text-2xl font-bold text-primary mb-2">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {plan.quota} storage
                      </p>
                      
                      <button
                        onClick={() => handleSwitchPlan(plan.id)}
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                      >
                        Switch to this Plan
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Offers Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Active Offers
              </h2>
              
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {offer.code}
                      </h3>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                        {offer.discount}% OFF
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {offer.description}
                    </p>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      Valid till {offer.validTill}
                    </p>
                    
                    <button
                      onClick={() => handleApplyOffer(offer)}
                      className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 text-sm"
                    >
                      Apply Offer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Cancel Subscription
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to cancel your subscription? You will lose access to all premium features at the end of your current billing period.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300"
              >
                Keep Subscription
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {toastMessage}
        </div>
      )}
    </main>
  );
};

export default UserDashboard;
