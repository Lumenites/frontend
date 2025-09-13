# VR World Subscription Management System

A modern, responsive subscription management system with separate dashboards for Users and Admins, built with React and Tailwind CSS.

## Features

### User Dashboard
- Browse subscription plans with beautiful cards
- View current active subscription
- Subscription history table
- AI-powered recommendations
- Notification system for renewals and discounts
- Clean, modern UI with smooth animations

### Admin Dashboard
- Plan Management (CRUD operations)
- Analytics dashboard with charts and insights
- Discount management system
- User notification system
- Role-based access control

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- React Router
- Context API for state management
- React Icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to `http://localhost:5174` (or the port shown in terminal)

## Usage

### Demo Login
- **Email**: Any email (e.g., demo@example.com)
- **Password**: Any password (e.g., password123)
- **Role**: Select "User" or "Admin"

### User Access
1. Go to `/login`
2. Select "User" role
3. Enter any email/password
4. Access the user dashboard at `/dashboard`

### Admin Access
1. Go to `/login`
2. Select "Admin" role
3. Enter any email/password
4. Access the admin dashboard at `/admin`

## Features Overview

### User Dashboard Features
- **Current Plan Display**: Shows active subscription with status, features, and billing info
- **Plan Browsing**: Grid of subscription plans with pricing, features, and subscribe buttons
- **Subscription History**: Table showing all past and current subscriptions
- **AI Recommendations**: Smart suggestions based on usage patterns
- **Notifications**: System for renewal reminders and promotional offers

### Admin Dashboard Features
- **Plan Management**: Create, read, update, and delete subscription plans
- **Analytics**: Charts showing subscription metrics, plan popularity, and trends
- **Discount Management**: Add and manage promotional discounts
- **User Notifications**: Send notifications to different user groups

### Design Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Support**: Toggle between light and dark themes
- **Modern UI**: Clean, minimal design with smooth animations
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Micro-interactions**: Hover effects and smooth transitions

## Mock Data

The application uses mock data for demonstration purposes:
- **Sample Plans**: Basic ($9.99), Pro ($19.99), Premium ($39.99)
- **Mock Analytics**: Subscription statistics and trends
- **Demo User**: Pre-configured user account

## Customization

### Colors and Theme
The app uses a consistent color scheme defined in `tailwind.config.js`:
- Primary: Purple (#7C3AED)
- Secondary: Cyan (#06B6D4)
- Accent: Orange (#F97316)

### Adding New Features
1. Create new components in the appropriate directory
2. Update the navigation and routing
3. Test thoroughly across different screen sizes

## File Structure

```
src/
├── Components/
│   ├── Dashboard/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── CurrentPlan.jsx
│   │   ├── PlanGrid.jsx
│   │   ├── SubscriptionHistory.jsx
│   │   ├── Recommendations.jsx
│   │   ├── Notifications.jsx
│   │   └── Admin/
│   │       ├── PlanManagement.jsx
│   │       ├── Analytics.jsx
│   │       ├── DiscountManagement.jsx
│   │       └── UserNotifications.jsx
│   └── ... (existing components)
├── Pages/
│   ├── UserDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── api.js (with mock data)
└── App.jsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.