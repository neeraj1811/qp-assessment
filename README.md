# Grocery Booking API

A Node.js REST API for managing grocery items and orders.

## Features

- Admin functionality for managing grocery inventory
- User functionality for viewing and ordering groceries
- CRUD operations for grocery items
- Order management system
- API documentation with Swagger UI

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker
- Swagger UI

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file and add:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string of your database
DB_NAME_DEV= grocery_booking_db
DB_MIN_POOL_SIZE_DEV=2
DB_MAX_POOL_SIZE_DEV=10
DB_USERNAME_DEV=yourusername
DB_PASSWORD_DEV= yourpassword
DB_HOST_DEV= cluser host

```

4. Start the server:
```bash
# For DEV environment (using MongoDB Atlas)
npm start
```

## API Documentation

API documentation is available through Swagger UI at:
```
http://localhost:3030/api-docs
```

## API Endpoints

### Authentication (Not implemented yet - Will be added with JWT/OAuth)
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### Admin Routes
- POST /v1/admin/add-items - Add new grocery item
- PUT /v1/admin/update-items/:id - Update grocery item
- DELETE /v1/admin/delete-items/:id - Delete grocery item
- PATCH /v1/admin/patch-items/:ids - View all grocery items
- GET /v1/admin/get-items - View all orders

### User Routes
- POST /v1/orders/:userId - Create new order
- GET /v1/orders/:userId - View user orders

## Docker Support

Build and run with Docker:
```bash
docker build -t grocery-api .
docker run -p 3000:3000 grocery-api
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.