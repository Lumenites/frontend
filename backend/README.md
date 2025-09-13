# Sub Manager Backend

A comprehensive backend API for the Sub Manager subscription management platform built with Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Subscription Management**: Complete CRUD operations for subscription plans
- **Dashboard API**: Real-time dashboard data with usage tracking
- **Offer System**: Dynamic offer codes with validation and usage tracking
- **Notification System**: User notifications with priority levels
- **MongoDB Integration**: Scalable database with proper indexing
- **Security**: Password hashing, CORS protection, and input validation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## Environment Variables

The application uses the following configuration (set in `config.js`):

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard data
- `POST /api/dashboard/switch-plan` - Switch subscription plan
- `POST /api/dashboard/cancel-subscription` - Cancel subscription
- `POST /api/dashboard/apply-offer` - Apply offer code
- `PUT /api/dashboard/dismiss-notification/:id` - Dismiss notification

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get specific plan
- `GET /api/plans/recommended` - Get recommended plans

### Health Check
- `GET /api/health` - Server health status

## Database Models

### User
- User authentication and profile data
- Subscription information
- Usage tracking
- Preferences

### Plan
- Subscription plan details
- Features and limits
- Pricing information
- Badges (popular, best value, etc.)

### Offer
- Discount codes and promotions
- Validity periods
- Usage limits
- Conditions

### Notification
- User notifications
- Priority levels
- Dismissal tracking
- Expiration dates

## Default Data

The application automatically initializes with:
- 3 default subscription plans (Basic, Standard, Premium)
- 2 sample offer codes
- Proper database indexing

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS protection
- Input validation with express-validator
- Helmet security headers
- MongoDB injection protection

## Error Handling

- Comprehensive error handling middleware
- Proper HTTP status codes
- Detailed error messages in development
- Generic error messages in production

## Development

The backend includes:
- Hot reloading with nodemon
- Comprehensive logging
- Error tracking
- Database connection monitoring

## Production Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure CORS for your domain
5. Use a process manager like PM2

## API Documentation

All endpoints return JSON responses with appropriate HTTP status codes. Authentication is required for protected routes using the `Authorization: Bearer <token>` header.
