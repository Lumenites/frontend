import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import {
  Menu, X, Search, Bell, User, Moon, Sun, BarChart3, 
  Activity, Settings, Users, TrendingUp, TrendingDown,
  Calendar, DollarSign, Award, AlertTriangle, CheckCircle,
  Clock, Eye, Edit, Trash2, Plus, Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  // Sample data
  const kpiData = [
    { label: 'Active Subscriptions', value: '2,847', change: '+12.5%', trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-400' },
    { label: 'Cancelled This Month', value: '129', change: '-8.2%', trend: 'down', icon: TrendingDown, color: 'from-red-500 to-pink-400' },
    { label: 'Monthly Revenue', value: '$48,392', change: '+23.1%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-emerald-400' },
    { label: 'Growth Rate', value: '18.7%', change: '+3.4%', trend: 'up', icon: TrendingUp, color: 'from-purple-500 to-violet-400' },
    { label: 'Most Popular Plan', value: 'Pro Plan', change: '67% users', trend: 'up', icon: Award, color: 'from-orange-500 to-yellow-400' }
  ];

  const subscriptionTrendData = [
    { month: 'Jan', active: 2200, cancelled: 180, new: 450 },
    { month: 'Feb', active: 2350, cancelled: 165, new: 380 },
    { month: 'Mar', active: 2480, cancelled: 142, new: 420 },
    { month: 'Apr', active: 2650, cancelled: 158, new: 485 },
    { month: 'May', active: 2720, cancelled: 134, new: 390 },
    { month: 'Jun', active: 2847, cancelled: 129, new: 467 },
    { month: 'July', active: 2807, cancelled: 100, new: 434 },
    { month: 'Aug', active: 2900, cancelled: 120, new: 433 },
    { month: 'Sept', active: 3007, cancelled: 119, new: 467 },
    { month: 'Oct', active: 2000, cancelled: 153, new: 478 },
    { month: 'Nov', active: 3678, cancelled: 138, new: 340 },
    { month: 'Dec', active: 3452, cancelled: 142, new: 391 }
  ];

  const planDistributionData = [
    { name: 'Basic Plan', value: 1138, color: '#3B82F6' },
    { name: 'Pro Plan', value: 1423, color: '#10B981' },
    { name: 'Enterprise', value: 286, color: '#8B5CF6' }
  ];

  const topPlansData = [
    { plan: 'Pro Plan', subscribers: 1423, revenue: 28460 },
    { plan: 'Basic Plan', subscribers: 1138, revenue: 11380 },
    { plan: 'Enterprise', subscribers: 286, revenue: 14300 },
    { plan: 'Premium', subscribers: 156, revenue: 9360 }
  ];

  const auditLogs = [
    { id: 1, action: 'Plan Updated', admin: 'John Smith', time: '2 hours ago', type: 'edit', details: 'Modified Pro Plan pricing' },
    { id: 2, action: 'User Subscription', admin: 'System', time: '3 hours ago', type: 'create', details: 'New Pro Plan subscription' },
    { id: 3, action: 'Plan Deleted', admin: 'Sarah Johnson', time: '5 hours ago', type: 'delete', details: 'Removed deprecated Starter Plan' },
    { id: 4, action: 'Settings Changed', admin: 'Mike Wilson', time: '1 day ago', type: 'settings', details: 'Updated billing frequency options' },
    { id: 5, action: 'Bulk Import', admin: 'Admin', time: '2 days ago', type: 'import', details: 'Imported 150 user subscriptions' }
  ];

  const aiInsights = [
    { type: 'warning', message: 'Pro Plan churn rate increased by 15% - consider price review', priority: 'high' },
    { type: 'success', message: 'Enterprise plan showing strong adoption in Q2', priority: 'medium' },
    { type: 'info', message: 'Suggest new mid-tier plan between Basic and Pro', priority: 'medium' },
    { type: 'warning', message: 'Weekend subscription activity 40% lower than weekdays', priority: 'low' }
  ];

  const sidebarItems = [
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'logs', label: 'Audit Logs', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getActionIcon = (type) => {
    switch(type) {
      case 'edit': return Edit;
      case 'create': return Plus;
      case 'delete': return Trash2;
      case 'settings': return Settings;
      case 'import': return Activity;
      default: return Eye;
    }
  };

  const getInsightIcon = (type) => {
    switch(type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Activity;
      default: return Activity;
    }
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-300`}>
      {/* Top Navbar */}
      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-lg border-white/20'} 
                     border-b border-opacity-20 shadow-lg sticky top-0 z-50`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 hover:bg-gray-700' : 'hover:bg-gray-100'} 
                        transition-colors`}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={18} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-cyan-600 bg-clip-text text-transparent">
                AdminPro
              </h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <input
                type="text"
                placeholder="Search analytics, logs, settings..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl border ${darkMode 
                  ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                  : 'bg-white/70 border-gray-200 focus:border-blue-500'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} 
                              transition-colors relative`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} 
                        transition-colors`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} 
                              transition-colors`}>
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>
      

      <div className="flex">
        
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/70 backdrop-blur-lg'} 
                        transition-all duration-300 border-r ${darkMode ? 'border-gray-700' : 'border-white/30'} 
                        min-h-screen shadow-xl`}>
          <div className="p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl mb-2 transition-all duration-200 
                            ${activeTab === item.id 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                              : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-white/50'} hover:shadow-md`}`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
        

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {activeTab === 'analytics' && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {kpiData.map((kpi, index) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                                                rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
                                                border ${darkMode ? 'border-gray-700' : 'border-white/30'} 
                                                hover:scale-105 group`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full 
                                        ${kpi.trend === 'up' 
                                          ? 'text-green-600 bg-green-100' 
                                          : 'text-red-600 bg-red-100'}`}>
                          {kpi.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{kpi.label}</p>
                    </div>
                  );
                })}
              </div>

              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
                <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                               rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Subscription Trends</h3>
                    <Filter size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer hover:text-blue-500`} />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
  <AreaChart data={subscriptionTrendData}>
    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
    <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
    <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
    <Tooltip 
      contentStyle={{
        backgroundColor: darkMode ? '#1F2937' : 'white',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      formatter={(value, name) => {
        const labels = {
          active: "Active Subscriptions",
          cancelled: "Cancelled",
          new: "New Subscriptions"
        };
        return [value, labels[name] || name];
      }}
      labelFormatter={(label) => `Month: ${label}`}
    />
    <Area type="monotone" dataKey="active" stackId="1" stroke="#3B82F6" fill="url(#activeGradient)" />
    <Area type="monotone" dataKey="new" stackId="1" stroke="#10B981" fill="url(#newGradient)" />
    <Area type="monotone" dataKey="cancelled" stackId="1" stroke="#EF4444" fill="url(#cancelledGradient)" />
    <defs>
      <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
      </linearGradient>
      <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
      </linearGradient>
      <linearGradient id="cancelledGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
      </linearGradient>
    </defs>
  </AreaChart>
</ResponsiveContainer>

                </div>
                

  
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                               rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
                  <h3 className="text-lg font-semibold mb-6">Plan Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={planDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {planDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {planDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Plans Performance */}
                <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                               rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
                  <h3 className="text-lg font-semibold mb-6">Top Plans Performance</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topPlansData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="plan" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1F2937' : 'white',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                      />
                      <Bar dataKey="subscribers" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.7}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* AI Insights */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                               rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <Activity className="mr-2" size={20} />
                    AI Insights
                  </h3>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => {
                      const Icon = getInsightIcon(insight.type);
                      return (
                        <div key={index} className={`p-4 rounded-xl border-l-4 
                                                   ${insight.type === 'warning' ? 
                                                     `border-yellow-500 ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}` : 
                                                     insight.type === 'success' ? 
                                                     `border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}` : 
                                                     `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}`}>
                          <div className="flex items-start space-x-3">
                            <Icon size={16} className={`mt-0.5 ${
                              insight.type === 'warning' ? 
                              `${darkMode ? 'text-yellow-400' : 'text-yellow-600'}` : 
                              insight.type === 'success' ? 
                              `${darkMode ? 'text-green-400' : 'text-green-600'}` : 
                              `${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                            }`} />
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {insight.message}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block
                                              ${insight.priority === 'high' ? 
                                                `${darkMode ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-800'}` :
                                                insight.priority === 'medium' ? 
                                                `${darkMode ? 'bg-yellow-900/40 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}` :
                                                `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}`}>
                                {insight.priority} priority
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          <button
      onClick={() => alert('See All Plans clicked')}
      className="w-full flex items-center space-x-3 p-3 rounded-xl mb-2 transition-all duration-200 
                 bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg hover:scale-105"
    >
      <Users size={20} />
      {sidebarOpen && <span className="font-medium">See All Plans</span>}
    </button>

          {activeTab === 'logs' && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                           rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Clock className="mr-2" size={20} />
                  Audit Logs
                </h3>
                <button className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                                  hover:shadow-lg transition-all duration-200`}>
                  Export Logs
                </button>
              </div>
              <div className="space-y-4">
                {auditLogs.map((log) => {
                  const Icon = getActionIcon(log.type);
                  return (
                    <div key={log.id} className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} 
                                                 transition-all duration-200 hover:shadow-md`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">{log.action}</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{log.details}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{log.admin}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{log.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm'} 
                           rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
              <h3 className="text-lg font-semibold flex items-center mb-6">
                <Settings className="mr-2" size={20} />
                System Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">General Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Dark Mode</span>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          darkMode ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          darkMode ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <button className="w-12 h-6 rounded-full bg-blue-600">
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-6 transition-transform duration-200"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto Backup</span>
                      <button className="w-12 h-6 rounded-full bg-gray-300">
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-0.5 transition-transform duration-200"></div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <div className="space-y-3">
                    <button className={`w-full p-3 text-left rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                      Change Password
                    </button>
                    <button className={`w-full p-3 text-left rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                      Two-Factor Authentication
                    </button>
                    <button className={`w-full p-3 text-left rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                      API Access Tokens
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
