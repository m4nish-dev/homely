<div align="center">

# Homely

### Production-Grade Full-Stack Vacation Rental & Booking Platform

[![Vercel Production](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://homely-gilt.vercel.app)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)
[![JSON Web Tokens](https://img.shields.io/badge/JWT_Auth-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io)

<br/>

[**Live Demo**](https://homely-gilt.vercel.app) &nbsp;•&nbsp; [**Backend API**](https://homely-server-nine.vercel.app) &nbsp;•&nbsp; [**Architecture**](#system-architecture) &nbsp;•&nbsp; [**API Docs**](#api-reference) &nbsp;•&nbsp; [**Local Setup**](#local-development-setup)

<br/>

</div>

---

## Table of Contents

- [Architectural Overview](#architectural-overview)
- [System Architecture](#system-architecture)
- [End-to-End Dynamic Workflows](#end-to-end-dynamic-workflows)
  - [1. Authentication & Role-Based Access Control](#1-authentication--rbac-flow)
  - [2. Booking & Cryptographic Payment Lifecycle](#2-booking--cryptographic-payment-lifecycle)
  - [3. Favorites / Wishlist Synchronization](#3-favorites--wishlist-synchronization)
  - [4. Direct Mobile & Web Invoice Generation](#4-direct-mobile--web-invoice-generation)
- [Database Schema & Entity Relationship](#database-schema--entity-relationship)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Environment Configuration](#environment-configuration)
- [Local Development Setup](#local-development-setup)
- [API Reference](#api-reference)
- [Security & Production Hardening](#security--production-hardening)
- [License](#license)

---

## Architectural Overview

Homely utilizes a decoupled client-server architecture deployed on **Vercel Serverless Functions** with **MongoDB Atlas**:
- **Client Tier**: React 19 Single Page Application powered by Vite, utilizing responsive Vanilla CSS tokens, glassmorphism, and optimistic state updates.
- **Server Tier**: Express 5 application structured with RESTful design patterns, layered controllers, middlewares, and serverless-compatible stateless routing.
- **Data & Transactions**: MongoDB Atlas with native multi-document ACID transactions ensuring zero race conditions during reservation checkouts.
- **Third-Party Integrations**:
  - **Razorpay**: Order creation, client checkout SDK, SHA-256 webhook and client signature verification.
  - **Cloudinary**: Multi-image buffer streaming without filesystem storage.
  - **Nodemailer**: SMTP transactional emails with direct one-click public invoice URLs.

---

## System Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0284c7', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#0369a1', 'lineColor': '#0284c7'}}}%%
flowchart TB
    classDef clientNode fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#ffffff;
    classDef edgeNode fill:#1e293b,stroke:#475569,stroke-width:2px,color:#f8fafc;
    classDef serverNode fill:#059669,stroke:#047857,stroke-width:2px,color:#ffffff;
    classDef dbNode fill:#15803d,stroke:#166534,stroke-width:2px,color:#ffffff;
    classDef cloudNode fill:#4338ca,stroke:#3730a3,stroke-width:2px,color:#ffffff;
    classDef payNode fill:#0369a1,stroke:#075985,stroke-width:2px,color:#ffffff;
    classDef mailNode fill:#b45309,stroke:#92400e,stroke-width:2px,color:#ffffff;

    subgraph ClientLayer ["Client Layer (Vercel CDN Edge)"]
        SPA["React 19 SPA (Vite Engine)"]:::clientNode
        State["Global Contexts (AuthContext, ToastContext)"]:::clientNode
        Services["API Client (Axios Interceptors)"]:::clientNode
        SPA --> State
        State --> Services
    end

    subgraph GatewayLayer ["Edge Gateway & Routing"]
        Edge["Vercel Edge Network / SPA Rewrites"]:::edgeNode
        Sanitizer["CORS Runtime Sanitizer"]:::edgeNode
        Security["Helmet Security & Express Rate Limiter"]:::edgeNode
        Edge --> Sanitizer --> Security
    end

    subgraph ServerLayer ["Serverless Backend Layer (@vercel/node)"]
        App["Express 5 Entry Point"]:::serverNode
        Middlewares["JWT Authentication & RBAC Guards"]:::serverNode
        Controllers["Controllers: Auth, Properties, Bookings, Payments, Reviews"]:::serverNode
        App --> Middlewares --> Controllers
    end

    subgraph InfrastructureLayer ["Data Persistence & Cloud Services"]
        Atlas[("MongoDB Atlas (Mongoose Replica Set)")]:::dbNode
        Cloudinary["Cloudinary CDN (Buffer Media Stream)"]:::cloudNode
        Razorpay["Razorpay Gateway (HMAC Verification)"]:::payNode
        SMTP["Nodemailer SMTP (Transactional Mailer)"]:::mailNode
    end

    Services -->|"HTTPS REST API"| Edge
    Security --> App
    Controllers -->|"ACID Transactions"| Atlas
    Controllers -->|"Multi-part Uploads"| Cloudinary
    Controllers -->|"Order API & Signatures"| Razorpay
    Controllers -->|"HTML Confirmation Templates"| SMTP
```

---

## End-to-End Dynamic Workflows

### 1. Authentication & RBAC Flow

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#0284c7',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#0369a1',
    'actorBkg': '#0f172a',
    'actorBorder': '#38bdf8',
    'actorTextColor': '#ffffff',
    'actorLineColor': '#38bdf8',
    'signalColor': '#0284c7',
    'signalTextColor': '#0f172a',
    'labelBoxBkgColor': '#e0f2fe',
    'labelBoxBorderColor': '#0284c7',
    'labelTextColor': '#0369a1',
    'activationBorderColor': '#0284c7',
    'activationBkgColor': '#bae6fd',
    'sequenceNumberColor': '#ffffff'
  }
}}%%
sequenceDiagram
    autonumber
    actor User as User / Host / Admin
    participant Client as React App
    participant AuthAPI as Express Auth Router
    participant DB as MongoDB Atlas

    User->>Client: Enters credentials / OAuth
    Client->>AuthAPI: POST /api/auth/login
    AuthAPI->>DB: User.findOne({ email }).select('+password')
    DB-->>AuthAPI: User record (bcrypt hash)
    AuthAPI->>AuthAPI: bcrypt.compare(password, hash)
    alt Invalid Credentials
        AuthAPI-->>Client: 401 Unauthorized
        Client-->>User: Floating Toast Error
    else Valid Credentials
        AuthAPI->>AuthAPI: jwt.sign({ id, role }, JWT_SECRET)
        AuthAPI-->>Client: 200 OK + JWT Token + User Profile
        Client->>Client: localStorage.setItem('token', token)
        Client->>Client: Hydrate AuthContext State
        Client-->>User: Redirect to dashboard / requested route
    end
```

---

### 2. Booking & Cryptographic Payment Lifecycle

Homely employs MongoDB multi-document transactions to guarantee atomicity and prevent double-booking.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#059669',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#047857',
    'actorBkg': '#064e3b',
    'actorBorder': '#34d399',
    'actorTextColor': '#ffffff',
    'actorLineColor': '#34d399',
    'signalColor': '#059669',
    'signalTextColor': '#064e3b',
    'labelBoxBkgColor': '#d1fae5',
    'labelBoxBorderColor': '#059669',
    'labelTextColor': '#065f46',
    'activationBorderColor': '#059669',
    'activationBkgColor': '#a7f3d0',
    'sequenceNumberColor': '#ffffff'
  }
}}%%
sequenceDiagram
    autonumber
    actor Guest as Guest
    participant Client as React SPA
    participant Server as Express Server
    participant DB as MongoDB (Replica Set)
    participant Razorpay as Razorpay API

    Guest->>Client: Selects Dates & Clicks "Reserve Now"
    Client->>Server: POST /api/bookings { propertyId, checkIn, checkOut, guests }
    Server->>DB: startTransaction()
    Server->>DB: Property.isAvailable(checkIn, checkOut)
    alt Dates Conflict
        Server->>DB: abortTransaction()
        Server-->>Client: 409 Conflict: Dates Already Booked
        Client-->>Guest: Toast: "Dates no longer available"
    else Dates Available
        Server->>DB: Booking.create({ status: 'pending', paymentStatus: 'pending' })
        Server->>DB: commitTransaction()
        Server-->>Client: 201 Created + bookingId
    end

    Client->>Server: POST /api/payments/create-order { bookingId }
    Server->>Razorpay: razorpay.orders.create({ amount, currency: 'INR' })
    Razorpay-->>Server: orderId
    Server-->>Client: 200 OK { orderId, amount, key }

    Client->>Guest: Mounts Razorpay Checkout Modal
    Guest->>Razorpay: Submits UPI / Card Payment
    Razorpay-->>Client: Returns { razorpay_payment_id, razorpay_order_id, razorpay_signature }

    Client->>Server: POST /api/payments/verify { signature, ids }
    Server->>Server: crypto.createHmac('sha256').update(order_id + '|' + payment_id)
    alt Signature Valid
        Server->>DB: Payment.create({ status: 'paid' })
        Server->>DB: Booking.findByIdAndUpdate({ status: 'confirmed', paymentStatus: 'paid' })
        Server->>Server: Generate HTML Invoice Template
        Server-->>SMTP: Send Email with Direct Mobile Download Link
        Server-->>Client: 200 OK { success: true }
        Client-->>Guest: Redirect to /booking-success
    else Signature Invalid
        Server-->>Client: 400 Bad Request: Cryptographic verification failed
    end
```

---

### 3. Favorites / Wishlist Synchronization

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#e11d48',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#be123c',
    'actorBkg': '#881337',
    'actorBorder': '#fb7185',
    'actorTextColor': '#ffffff',
    'actorLineColor': '#fb7185',
    'signalColor': '#e11d48',
    'signalTextColor': '#881337',
    'labelBoxBkgColor': '#ffe4e6',
    'labelBoxBorderColor': '#e11d48',
    'labelTextColor': '#9f1239',
    'activationBorderColor': '#e11d48',
    'activationBkgColor': '#fecdd3',
    'sequenceNumberColor': '#ffffff'
  }
}}%%
sequenceDiagram
    autonumber
    actor User as User
    participant Card as PropertyCard / PopularStays
    participant Context as AuthContext & ToastContext
    participant API as User API Router
    participant DB as MongoDB Atlas

    User->>Card: Clicks Heart Icon on Card
    alt User Not Logged In
        Card->>Context: toast.warning("Please log in to save properties")
    else User Logged In
        Card->>Card: Optimistic UI toggle (Heart turns red)
        Card->>API: POST /api/users/favorites { propertyId }
        API->>DB: User.findByIdAndUpdate({ $addToSet: { favorites: propertyId } })
        DB-->>API: Updated user document
        API-->>Card: 200 OK { success: true, favorites }
        Card->>Context: Update user.favorites & toast.success("Saved to your wishlist!")
        Note over User,DB: Navigating to /favorites immediately renders the newly saved property
    end
```

---

### 4. Direct Mobile & Web Invoice Generation

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#0d9488',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#0f766e',
    'actorBkg': '#134e4a',
    'actorBorder': '#2dd4bf',
    'actorTextColor': '#ffffff',
    'actorLineColor': '#2dd4bf',
    'signalColor': '#0d9488',
    'signalTextColor': '#134e4a',
    'labelBoxBkgColor': '#ccfbf1',
    'labelBoxBorderColor': '#0d9488',
    'labelTextColor': '#115e59',
    'activationBorderColor': '#0d9488',
    'activationBkgColor': '#99f6e4',
    'sequenceNumberColor': '#ffffff'
  }
}}%%
sequenceDiagram
    autonumber
    actor User as Mobile or Desktop User
    participant Email as Email Client
    participant WebApp as Homely Client (/invoice/:bookingId)
    participant PublicAPI as Public Invoice API
    participant DB as MongoDB
    participant html2pdf as Browser html2pdf Engine

    User->>Email: Taps "Download PDF Invoice"
    Email->>WebApp: Navigates to /invoice/:bookingId?download=true
    Note over WebApp: No Authentication Cookie Required!
    WebApp->>PublicAPI: GET /api/bookings/public-invoice/:bookingId
    PublicAPI->>DB: Booking.findOne({ bookingId }).populate('property user')
    DB-->>PublicAPI: Booking data
    PublicAPI-->>WebApp: 200 OK { booking }
    WebApp->>WebApp: Renders Clean Responsive Invoice Document
    alt URL contains ?download=true
        WebApp->>html2pdf: Auto-trigger html2pdf().from(invoiceRef).save()
        html2pdf-->>User: File saved: Homely_Invoice_BK12345.pdf
    end
    User->>WebApp: Optional: Manual "Download PDF" or "Print" button
```

---

## Database Schema & Entity Relationship

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#0f172a',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#0284c7',
    'lineColor': '#0284c7',
    'tertiaryColor': '#f8fafc',
    'attributeBackgroundColorEven': '#f8fafc',
    'attributeBackgroundColorOdd': '#ffffff'
  }
}}%%
erDiagram
    USER ||--o{ PROPERTY : "hosts"
    USER ||--o{ BOOKING : "reserves"
    USER ||--o{ REVIEW : "writes"
    PROPERTY ||--o{ BOOKING : "has"
    PROPERTY ||--o{ REVIEW : "receives"
    BOOKING ||--|| PAYMENT : "settled_by"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role "user | host | admin"
        string phone
        string avatar_url
        ObjectId[] favorites FK
        date createdAt
    }

    PROPERTY {
        ObjectId _id PK
        ObjectId host FK
        string title
        string description
        number price
        string category "Hotels | Flats | Villas | Resorts | Cabins"
        object location "city, address, country, coordinates"
        number maxGuests
        string[] amenities
        object[] images "url, publicId"
        number rating
        number numReviews
        boolean isFeatured
        boolean isNewlyListed
        boolean isActive
    }

    BOOKING {
        ObjectId _id PK
        string bookingId UK "e.g. BK-98214"
        ObjectId user FK
        ObjectId property FK
        date checkIn
        date checkOut
        number nights
        number guests
        number pricePerNight
        number serviceFee
        number totalAmount
        string status "pending | confirmed | cancelled"
        string paymentStatus "pending | paid | refunded"
    }

    PAYMENT {
        ObjectId _id PK
        ObjectId booking FK
        ObjectId user FK
        string razorpayOrderId
        string razorpayPaymentId
        string razorpaySignature
        number amount
        string currency "INR"
        string status "created | paid | failed | refunded"
    }

    REVIEW {
        ObjectId _id PK
        ObjectId property FK
        ObjectId user FK
        number rating "1 to 5"
        string comment
        date createdAt
    }
```

---

## Key Features

| Domain | Capabilities |
|---|---|
| **Guest Experience** | Instant property search with category & price sorting, auto-playing image carousels, responsive modal lightbox, one-click wishlist toggling, and date calculation. |
| **Booking & Checkout** | Concurrency-safe double-booking prevention, Razorpay payments, automated transactional emails with booking confirmation details. |
| **Direct Invoicing** | Dedicated public invoice route (`/invoice/:id`) rendering printable receipts and client-side PDF generation (`html2pdf.js`) optimized for mobile devices without requiring sign-in. |
| **Host Ecosystem** | Become a Host upgrade flow, Host Dashboard for property creation with Cloudinary image streaming, listing management, and deletion confirm modals. |
| **Administration** | Admin Dashboard for user management (role assignments, user deletion), property visibility toggles, and system-wide revenue statistics. |
| **Modern UX/UI** | Zero browser alert/confirm popups (replaced with custom animated toasts and glassmorphic modals), CSS design system, and mobile-first layouts. |

---

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, Material Design)
- **PDF Generation**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
- **HTTP Client**: [Axios](https://axios-http.com/) with JWT authorization interceptors
- **Styling**: Modular CSS tokens, flex/grid layouts, glassmorphic UI components

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Payment Gateway**: [Razorpay Node SDK](https://razorpay.com/docs/)
- **Media CDN**: [Cloudinary SDK v2](https://cloudinary.com/documentation) + [Multer](https://github.com/expressjs/multer)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/) (Ethereal test fallback + SMTP)
- **Security**: [Helmet](https://helmetjs.github.io/), [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit), [bcryptjs](https://github.com/dcodeIO/bcrypt.js), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **Logging**: [Winston](https://github.com/winstonjs/winston) (Console in production/serverless; file rotation in local development)

---

## Project Directory Structure

```text
homely/
├── client/                           # React 19 Frontend SPA
│   ├── src/
│   │   ├── api/                      # Axios HTTP service abstraction
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── bookingService.js
│   │   │   ├── paymentService.js
│   │   │   ├── propertyService.js
│   │   │   └── userService.js
│   │   ├── components/               # Modular UI Components
│   │   │   ├── Footer/
│   │   │   ├── HeroBanner/
│   │   │   ├── Invoice/              # Formal Invoice Receipt Component
│   │   │   ├── Navbar/
│   │   │   ├── NewlyAddedProperties/
│   │   │   ├── PropertyListings/     # Popular Stays with carousel
│   │   │   └── SearchBar/
│   │   ├── context/                  # Global React Contexts
│   │   │   ├── AuthContext.jsx       # Session hydration & role state
│   │   │   ├── ToastContext.jsx      # In-App Toasts & Modal Confirms
│   │   │   └── Toast.css
│   │   ├── pages/                    # Route Views
│   │   │   ├── Admin/                # Admin Panel
│   │   │   ├── Booking/              # Razorpay checkout page
│   │   │   ├── BookingSuccess/       # Post-payment confirmation
│   │   │   ├── Favorites/            # Wishlist / Liked Properties
│   │   │   ├── Host/                 # Host Listing Dashboard
│   │   │   ├── MyBookings/           # User reservation history
│   │   │   ├── PropertyDetails/      # Detail view, reviews, date picker
│   │   │   ├── PublicInvoice/        # Direct Mobile & Web PDF Invoice
│   │   │   └── SearchResults/
│   │   ├── App.jsx                   # Central routing & modal coordination
│   │   └── main.jsx
│   ├── vercel.json                   # Frontend SPA rewrite rules
│   └── package.json
│
└── server/                           # Express 5 REST API Backend
    ├── config/                       # DB connection & Passport configuration
    ├── controllers/                  # Route business logic
    │   ├── adminController.js
    │   ├── authController.js
    │   ├── bookingController.js      # Transactions & public invoice
    │   ├── paymentController.js      # Razorpay order creation & HMAC check
    │   ├── propertyController.js
    │   ├── reviewController.js
    │   └── userController.js         # Profile, avatar, favorites
    ├── middleware/                   # Auth, Roles, Validation, Errors
    ├── models/                       # Mongoose Schemas (User, Property, etc.)
    ├── routes/                       # Express Route Handlers
    ├── utils/                        # Cloudinary, Email templates, Logger
    ├── server.js                     # Serverless entry point (exports app)
    ├── vercel.json                   # Serverless function configuration
    └── package.json
```

---

## Environment Configuration

### Backend Environment (`server/.env`)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/homely?retryWrites=true&w=majority
CLIENT_URL=https://homely-gilt.vercel.app

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
COOKIE_SECRET=your_cookie_signing_secret
SESSION_SECRET=your_session_secret

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_YourKeyId
RAZORPAY_KEY_SECRET=YourRazorpaySecret
RAZORPAY_WEBHOOK_SECRET=YourWebhookSecret

# Cloudinary CDN
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP Mail Server (Leave empty to use automated Ethereal test inbox)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FROM_NAME="Homely Reservations"
FROM_EMAIL=noreply@homely.com
```

### Frontend Environment (`client/.env`)

```env
VITE_API_URL=https://homely-server-nine.vercel.app/api
VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyId
```

---

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm installed
- Local MongoDB running with a Replica Set (required for transactions) or MongoDB Atlas connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/m4nish-dev/homely.git
cd homely
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env    # Fill in your environment variables
npm run seed            # Seeds 20+ real-world properties across India
npm run dev             # Starts backend on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev             # Starts frontend on http://localhost:5173
```

---

## API Reference

### Auth & User (`/api/auth`, `/api/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Private | Fetch logged-in user profile |
| `GET` | `/api/users/favorites` | Private | Fetch user's saved wishlist |
| `POST` | `/api/users/favorites` | Private | Save property to wishlist |
| `DELETE` | `/api/users/favorites/:id` | Private | Remove property from wishlist |
| `PUT` | `/api/users/become-host` | Private | Upgrade account role to `host` |

### Properties (`/api/properties`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/properties` | Public | List properties (filter by location, category, price) |
| `GET` | `/api/properties/:id` | Public | Fetch property details with reviews |
| `POST` | `/api/properties` | Host / Admin | Create listing with multi-image Cloudinary upload |
| `DELETE` | `/api/properties/:id` | Host / Admin | Delete property listing |

### Bookings & Payments (`/api/bookings`, `/api/payments`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/bookings/public-invoice/:id` | **Public** | Fetch booking invoice details for mobile/email links |
| `POST` | `/api/bookings` | Private | Create reservation with atomic availability check |
| `GET` | `/api/bookings/my-bookings` | Private | Retrieve current user's booking history |
| `POST` | `/api/payments/create-order` | Private | Initialize Razorpay payment order |
| `POST` | `/api/payments/verify` | Private | Verify HMAC-SHA256 signature and confirm booking |
| `POST` | `/api/payments/webhook` | Public | Server-to-server Razorpay webhook listener |

---

## Security & Production Hardening

- **Stateless Serverless Execution**: Server instance handles runtime buffering, exports standard Express app instance (`export default app`), and disables disk-based log writing in production to comply with read-only filesystems.
- **Strict Cryptographic Signatures**: Razorpay payments are validated via server-side HMAC-SHA256 hash checks (`crypto.createHmac`) prior to marking reservations as confirmed.
- **Cross-Origin Sanitization**: Runtime origin sanitization strips trailing slashes to prevent CORS mismatches between Vercel frontends and backends.
- **Database Safety**: Mongoose queries utilize parameterized inputs and `$addToSet` / `$pull` atomic modifiers to protect against injection and duplicate items.
- **Zero UI Disruption**: Eliminated browser modal blocks (`alert`, `confirm`) that exposed deployment domain strings, substituting an accessible, non-blocking toast notification stack.

---

## License

This project is licensed under the [ISC License](LICENSE).
Built for modern travel and vacation rental experiences.
