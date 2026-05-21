# API Parcours Moniteur

A backend API for managing educational courses, points of interest (POIs), and itineraries with JWT authentication and interactive Swagger documentation.

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation & Getting Started](#-installation--getting-started)
- [Project Structure](#-project-structure)
- [Best Practices](#-best-practices)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🏗️ Architecture

### Overview

The application follows a **Next.js API Routes** architecture with clear separation between:

```
Frontend (React)
    ↓
Next.js API Routes (SSR / API)
    ↓
PostgreSQL via Pool (pg)
Supabase Auth
```

### Application Layers

1. **API Routes** (`/src/app/api/`) - HTTP entry points
2. **Utilities** (`/src/lib/`) - Reusable logic (DB, auth, Swagger)
3. **Frontend** (`/src/app/`) - React pages and layouts
4. **Tests** (`/tests/`) - Unit and integration tests

### Request Flow

```
HTTP Request
    ↓
API Route (route.ts)
    ↓
Parameter validation
    ↓
JWT Authentication (if required)
    ↓
Business logic + DB Query
    ↓
Standardized JSON Response
```

## 🛠️ Technologies

| Area               | Technology                      |
|--------------------|---------------------------------|
| **Runtime**        | Node.js 20+, Next.js 15.3+      |
| **Language**       | TypeScript 5+                   |
| **Database**       | PostgreSQL 12+, Supabase        |
| **Authentication** | Supabase Auth (Email/Password)  |
| **Authorization**  | JWT tokens via Supabase         |
| **DB Client**      | PostgreSQL (pg driver)          |
| **Frontend**       | React 19                        |
| **Testing**        | Vitest 3+, @testing-library     |
| **API Docs**       | Swagger/OpenAPI (swagger-jsdoc) |

## 📦 Installation & Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn
- Supabase account (for database and authentication)
- PostgreSQL 12+ (hosted on Supabase or locally)

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Database Connection (PostgreSQL)
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]?sslmode=require
```

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/API-Parcours-Moniteur.git
cd API-Parcours-Moniteur

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase/PostgreSQL credentials

# 4. Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production build
npm test             # Run tests
npm run test:ui      # Run tests with Vitest UI
npm run test:coverage # Test coverage report
```

## 📂 Project Structure

```
src/
├── app/
│   ├── api/                          # API Routes
│   │   ├── admin/                    # Admin endpoints
│   │   │   └── users/                # User management
│   │   ├── auth/                     # Authentication
│   │   │   ├── request-code/         # Request login code
│   │   │   ├── verify-code/          # Verify code
│   │   │   └── logout/               # Logout
│   │   ├── health/                   # Health check
│   │   ├── pois/                     # Points of Interest
│   │   │   └── [id]/                 # Specific POI endpoint
│   │   ├── lists/                    # Favorite lists
│   │   ├── itineraries/              # Routes/itineraries
│   │   ├── modification-requests/    # Modification requests
│   │   └── doc/                      # Swagger documentation
│   ├── doc/                          # Swagger docs page
│   │   ├── page.tsx                  # Swagger UI display
│   │   └── layout.tsx                # Doc layout
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page (optional)
│
├── lib/
│   ├── db.ts                         # PostgreSQL connection pool
│   ├── supabase.ts                   # Supabase client
│   ├── responses.ts                  # HTTP response utilities
│   ├── swagger.ts                    # Swagger configuration
│   ├── swagger-definitions.ts        # OpenAPI type definitions
│   └── swagger-endpoints.ts          # Endpoint documentation
│
tests/
├── api.test.ts                       # API route tests
├── setup.ts                          # Test configuration
└── ...

Configuration files:
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── vitest.config.ts                  # Vitest configuration
├── package.json                      # Dependencies and scripts
├── .env.local                        # Environment variables (not versioned)
└── .env.example                      # Environment template
```

## 📖 Main API Routes

### Authentication

```
POST   /api/auth/signup    Create a new account with email/password
```

**Signup** - POST `/api/auth/signup`
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```
Response: `{ "message": "Account created successfully", "user": {...} }`

### Users

```
GET    /api/users/me                Get current user profile
POST   /api/users/me/favorites/:poiId   Add POI to favorites
DELETE /api/users/me/favorites/:poiId   Remove POI from favorites
GET    /api/users/me/favorites      List favorite POIs

# Admin
GET    /api/admin/users             List all users
GET    /api/admin/users/:id         Get user details
PATCH  /api/admin/users/:id         Update user
DELETE /api/admin/users/:id         Delete user
```

### Points of Interest (POIs)

```
GET    /api/pois                    List all POIs
POST   /api/pois                    Create a POI
GET    /api/pois/:id                Get POI details
PATCH  /api/pois/:id                Update POI
DELETE /api/pois/:id                Delete POI

GET    /api/pois/:id/modification-requests  Get modification requests
```

### Lists

```
GET    /api/lists                   List all lists
POST   /api/lists                   Create a list
GET    /api/lists/:id               Get list details
PATCH  /api/lists/:id               Update list
DELETE /api/lists/:id               Delete list

POST   /api/lists/:id/pois/:poiId   Add POI to list
DELETE /api/lists/:id/pois/:poiId   Remove POI from list
```

### Itineraries

```
GET    /api/itineraries             List all itineraries
POST   /api/itineraries             Create itinerary
GET    /api/itineraries/:id         Get itinerary details
PATCH  /api/itineraries/:id         Update itinerary
DELETE /api/itineraries/:id         Delete itinerary

POST   /api/itineraries/:id/routing Calculate optimization
```

### System

```
GET    /api/health                  Check API health
GET    /api/doc                     Get OpenAPI JSON documentation
```

## ✅ Best Practices

### 1. Authentication & Security

- **Supabase Auth**: Account creation uses Supabase managed user accounts with email/password
- **Password Requirements**: Minimum 6 characters for security
- **Email Validation**: Proper email format validation on signup
- **HTTPS in production**: Always use HTTPS for credentials
- **Environment variables**: Never commit `.env.local`, use `.env.example` template

**Signup Flow:**
```
1. User provides email, password, and optional first_name/last_name
2. Server validates input (email format, password length)
3. User account created in Supabase Auth
4. User record created in PostgreSQL database
5. Returns user info and success message
```

### 2. API Route Structure

Each endpoint should follow this pattern:

```typescript
// src/app/api/[resource]/route.ts
export async function GET(req: Request) {
  try {
    // 1. Validate parameters
    // 2. Verify authentication (if required)
    // 3. Query the database
    // 4. Return standardized response
    
    return Response.json({ data: result }, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
```

### 3. Error Handling

- Use appropriate HTTP status codes (200, 400, 401, 403, 404, 500)
- Provide explicit error messages in JSON format
- Log server-side errors for debugging

### 4. Data Validation

```typescript
// Validate at route level
if (!id || typeof id !== 'string') {
  return Response.json(
    { error: 'Invalid ID parameter' },
    { status: 400 }
  )
}
```

### 5. Database

- **Use parameterized queries** to prevent SQL injection
- **Connection pooling**: Reuse connections via Pool (pg)
- **Error handling**: Catch and log database errors
- **Schema migrations**: Document schema changes

```typescript
// Good: parameterized query
result = await pool.query('SELECT * FROM users WHERE id = $1', [id])

// Bad: string concatenation
result = await pool.query(`SELECT * FROM users WHERE id = ${id}`)
```

### 6. Testing

- Write tests for critical routes
- Use mocks for Supabase and database
- Test error cases and edge cases
- Maintain coverage > 80%

```bash
npm run test:coverage  # Check coverage
```

### 7. Swagger/Documentation

- Document all endpoints in `swagger-definitions.ts`
- Include request/response schemas
- Update documentation after API changes

### 8. Code Quality

- **Clear naming**: Prefer `getUserById()` over `getUser()`
- **Strict types**: Use TypeScript, avoid `any`
- **No console.log in production**: Use a logging system
- **Explicit commits**: Clear, atomic commit messages

### 9. Performance

- Index frequently queried columns
- Limit returned data with pagination
- Use `LIMIT` and `OFFSET` for long lists
- Cache static responses if appropriate

### 10. Versioning

Consider API versioning for non-backward-compatible changes:

```
/api/v1/pois
/api/v2/pois
```

## 📚 API Documentation

Access the **interactive Swagger documentation**:

```
http://localhost:3000/doc
```

This page displays:
- All available endpoints
- Request parameters and body
- Response examples
- Possible error codes
- Required authentication

### Updating Documentation

1. Modify definitions in `src/lib/swagger-definitions.ts`
2. Update endpoints in `src/lib/swagger-endpoints.ts`
3. Restart server to see changes

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm run test:coverage

# GUI interface
npm run test:ui
```

### Test Structure

```typescript
// tests/api.test.ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('API Endpoints', () => {
  beforeEach(() => {
    // Setup before each test
  })

  it('should return health status', async () => {
    const res = await fetch('http://localhost:3000/api/health')
    expect(res.status).toBe(200)
  })
})
```

## 🚀 Deployment

### Deploy to Vercel (Recommended for Next.js)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Configure Vercel
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# 3. Deploy
vercel
```

### Production Environment Variables

Configure on Vercel/your platform:
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Production Build

```bash
npm run build  # Generates .next/
npm start      # Start server
```

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Guide](https://supabase.com/docs)
- [Swagger/OpenAPI](https://swagger.io/)

## 📝 License

Proprietary - All rights reserved

## 👥 Contributing

To contribute:

1. Create a branch (`git checkout -b feature/my-feature`)
2. Commit your changes (`git commit -m 'Add my-feature'`)
3. Push the branch (`git push origin feature/my-feature`)
4. Create a Pull Request

Ensure that:
- ✅ Tests pass
- ✅ Coverage > 80%
- ✅ Code follows best practices
- ✅ Documentation is up to date

---

**Questions?** Check the Swagger documentation: http://localhost:3000/doc
