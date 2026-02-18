# Restaurant Backend API

This is the backend for the Restaurant Website, built with Node.js, Express, and MongoDB.

## Features

- **Menu Management**: Create, Read, Update, Delete menu items.
- **Reservation System**: 
  - Validates opening hours.
  - Checks slot availability.
  - Viewing reservations (Admin only).
- **Opening Hours**: Configurable by Admin.
- **Blog System**: Manage blog posts.
- **Admin Authentication**: JWT-based protection for sensitive routes.

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/restaurant
    PORT=5000
    JWT_SECRET=your_super_secret_jwt_key
    ```

3.  **Run Server**
    ```bash
    npm run dev
    ```

## API Endpoints

### 1. Menu
- **GET** `/api/menu` - Fetch all menu items
- **POST** `/api/menu` - Add new item (Admin)
- **PUT** `/api/menu/:id` - Update item (Admin)
- **DELETE** `/api/menu/:id` - Delete item (Admin)

### 2. Reservations
- **POST** `/api/reservations` - Create a reservation
    - Body: `{ name, email, phone, date, time, partySize }`
- **GET** `/api/reservations` - View all reservations (Admin)

### 3. Opening Hours
- **GET** `/api/hours` - Get opening hours
- **POST** `/api/hours` - Update hours (Admin)
    - Body: `{ day, openTime, closeTime, isClosed }`

### 4. Blogs
- **GET** `/api/blogs` - Get all blog posts
- **GET** `/api/blogs/:id` - Get single blog post
- **POST** `/api/blogs` - Create blog post (Admin)
- **PUT** `/api/blogs/:id` - Update blog post (Admin)
- **DELETE** `/api/blogs/:id` - Delete blog post (Admin)

### 5. Admin Auth
- **POST** `/api/admin/login` - Login as Admin
    - Body: `{ username, password }`
    - Returns: JWT Token

## Default Admin User
On the first run, a default admin user is created:
- **Username**: `admin`
- **Password**: `password123`
