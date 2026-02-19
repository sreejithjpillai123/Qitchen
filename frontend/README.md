# Restaurant Frontend

This is the Next.js frontend for the Restaurant Website.
Deployed at : https://qitchen-frontend-vb0f.onrender.com
Admin at     : https://qitchen-frontend-vb0f.onrender.com/admin/dashboard

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Review `.env.local` to ensure the API URL matches your backend (default is `http://localhost:5000/api`).

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- **Public Views**:
  - **Home**: Welcome screen.
  - **Menu**: Displays items from backend.
  - **Reservations**: Form to book tables (validates against backend hours).
  - **Blog**: Read latest news.
  
- **Admin Panel** (`/admin/login`):
  - Login securely.
  - **Dashboard**: Overview.
  - **Menu Manager**: Add/Edit/Delete dishes.
  - **Reservation Viewer**: See all bookings.
  - **Hours Manager**: Configure opening times.
  - **Blog Manager**: Write and manage posts.

## Tech Stack
- Next.js 14+ (App Router)
- React
- Vanilla CSS (Global styles + Inline for components)
- Axios (API Communication)
