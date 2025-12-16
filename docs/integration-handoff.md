# Backend Integration Handoff Guide

This document provides comprehensive guidance for the backend team to integrate real API endpoints into the Unify Agentic AI platform. The frontend is fully functional with mock API responses and is ready for backend integration.

## 🎯 What's Been Shipped

The following sections are complete and ready for backend integration:

- ✅ **Authentication Flow** (Login, Forgot Password, Verify OTP, Reset Password)
- ✅ **Dashboard** (Metrics and Features)
- ✅ **Feature Store** (Transformations, Views, Services)

## 📁 Project Structure

```
src/
├── lib/api/               # Mock API service layer (REPLACE WITH REAL APIS)
│   ├── client.js          # Base API client with mock functionality
│   ├── auth.js            # Authentication endpoints
│   ├── dashboard.js       # Dashboard metrics and features
│   ├── transformations.js # Feature transformations CRUD
│   ├── feature-views.js   # Feature views CRUD
│   └── feature-services.js # Feature services CRUD
├── contexts/
│   └── auth-context.jsx   # Global auth state management
├── types/                 # JSDoc type definitions
│   ├── auth.js
│   ├── dashboard.js
│   ├── transformations.js
│   ├── feature-views.js
│   └── feature-services.js
└── app/
    ├── (auth)/           # Authentication pages
    ├── dashboard/        # Main dashboard
    └── feature-store/    # Feature store pages
```

## 🔧 Environment Variables

### Required Variables

Add these to your `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
NEXT_PUBLIC_SESSION_TIMEOUT=3600000
```

### For Production

Update `NEXT_PUBLIC_API_BASE_URL` to point to your production API server.

## 🔐 Authentication System

### How It Works (Current Implementation)

1. User submits login credentials
2. Mock API returns a token and user object
3. Token is stored in `localStorage`
4. `AuthContext` provides global auth state
5. Protected routes check auth status
6. Logout clears token and redirects to login

### Files Involved

- **Context Provider**: `src/contexts/auth-context.jsx`
- **API Service**: `src/lib/api/auth.js`
- **Login Page**: `src/app/(auth)/login/page.jsx`
- **Forgot Password Flow**: `src/app/(auth)/forgot-password/*`

### API Endpoints to Implement

#### 1. POST `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.png"
  }
}
```

#### 2. POST `/api/auth/logout`

**Request:**
```json
{
  "token": "current-jwt-token"
}
```

**Response:**
```json
{
  "success": true
}
```

#### 3. POST `/api/auth/forgot-password`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

#### 4. POST `/api/auth/verify-otp`

**Request:**
```json
{
  "email": "user@example.com",
  "code": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified"
}
```

#### 5. POST `/api/auth/reset-password`

**Request:**
```json
{
  "email": "user@example.com",
  "code": "1234",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### 6. GET `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "avatar": "https://example.com/avatar.png"
}
```

### Where to Replace Mock API

**File**: `src/lib/api/auth.js`

Look for comments starting with:
```javascript
// TODO: Backend team - Replace with actual API call:
```

Example replacement:
```javascript
// BEFORE (Mock):
export async function login(email, password, rememberMe = false) {
  const mockResponse = { token: "mock-token", user: {...} };
  return apiCall("/auth/login", { method: "POST" }, mockResponse);
}

// AFTER (Real API):
export async function login(email, password, rememberMe = false) {
  const response = await fetch(`${API_CONFIG.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}
```

## 📊 Dashboard Integration

### API Endpoints

#### 1. GET `/api/dashboard/metrics`

**Response:**
```json
[
  {
    "label": "Active Models",
    "value": "24",
    "change": 12,
    "trend": [18, 19, 19, 20, 21, 22, 23, 24]
  },
  {
    "label": "Use Cases",
    "value": "12",
    "change": 3,
    "trend": [8, 9, 9, 10, 10, 11, 11, 12]
  }
  // ... 14 more metrics (16 total)
]
```

**Metrics Expected**:
- Active Models
- Use Cases
- Predictions Today
- Model Accuracy
- Feature Views
- Feature Services
- Total Features
- Transformations
- Data Sources
- Total Tables
- Data Quality Score
- Records Processed
- Active Agents
- Agent Interactions
- Knowledge Bases
- Active Workflows

#### 2. GET `/api/dashboard/features`

**Response:**
```json
{
  "dataEngineering": [
    {
      "icon": "DataIngestionIcon2",
      "title": "Data Ingestion",
      "description": "Import and process data...",
      "href": "/data-engineering/data-ingestion"
    }
  ],
  "featureStore": [...],
  "aiStudio": [...],
  "agentStudio": [...],
  "workflowBuilder": [...]
}
```

### Where to Replace

**File**: `src/lib/api/dashboard.js`

**Page**: `src/app/dashboard/page.js`

## 🏪 Feature Store Integration

### Feature Transformations

#### GET `/api/transformations`

**Query Parameters:**
- `search` (optional): Search by name/description
- `tags` (optional): Filter by tags (comma-separated)
- `sortBy` (optional): `asc` or `desc`
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
[
  {
    "id": 1,
    "name": "Calculate Age from DOB",
    "icon": "FeatureTransformationIcon",
    "description": "Calculates age in years from date of birth",
    "tags": ["demographics", "age"],
    "inputParams": [
      {
        "name": "column",
        "type": "string",
        "required": "Yes",
        "description": "Column to encode"
      }
    ],
    "codeExamples": "def calculate_age(dob):\n    ...",
    "lastUpdated": "2 Hours Ago",
    "createdAt": "2024-01-12",
    "variant": "light"
  }
]
```

#### GET `/api/transformations/stats`

**Response:**
```json
{
  "totalTransformations": "04",
  "activeTransformations": "04",
  "transformationTypes": "07"
}
```

#### GET `/api/transformations/:id`

**Response:** Single transformation object

#### POST `/api/transformations`

**Request:**
```json
{
  "name": "Transformation Name",
  "description": "Description",
  "tags": ["tag1", "tag2"],
  "inputParams": [...],
  "codeExamples": "..."
}
```

#### PUT `/api/transformations/:id`

**Request:** Same as POST

#### DELETE `/api/transformations/:id`

**Response:**
```json
{
  "success": true
}
```

### Feature Views

Similar structure to transformations with these endpoints:

- `GET /api/feature-views`
- `GET /api/feature-views/stats`
- `GET /api/feature-views/:id`
- `POST /api/feature-views`
- `PUT /api/feature-views/:id`
- `DELETE /api/feature-views/:id`
- `GET /api/tables` (for table selection)

**Feature View Object:**
```json
{
  "id": 1,
  "name": "Policyholder Demographics",
  "icon": "FeatureViewsIcon",
  "description": "Demographic features...",
  "tags": ["demographics", "policyholder"],
  "featureNo": "18",
  "lastUpdated": "2 days Ago",
  "tablesCount": "2",
  "createdAt": "2025-11-18",
  "variant": "light"
}
```

### Feature Services

Similar structure with these endpoints:

- `GET /api/feature-services`
- `GET /api/feature-services/stats`
- `GET /api/feature-services/:id`
- `POST /api/feature-services`
- `PUT /api/feature-services/:id`
- `DELETE /api/feature-services/:id`

**Feature Service Object:**
```json
{
  "id": 1,
  "name": "Claims Fraud Detection Service",
  "icon": "FeatureServicesIcon",
  "description": "Demographic features...",
  "tags": ["demographics", "policyholder"],
  "featureNo": "64",
  "lastUpdated": "2 days Ago",
  "viewsCount": "2",
  "createdAt": "2025-11-18",
  "variant": "light"
}
```

### Where to Replace

**Files**:
- `src/lib/api/transformations.js`
- `src/lib/api/feature-views.js`
- `src/lib/api/feature-services.js`

**Pages**:
- `src/app/feature-store/feature-transformations/page.jsx`
- `src/app/feature-store/feature-views/page.jsx`
- `src/app/feature-store/feature-services/page.jsx`

## 🛠️ Step-by-Step Integration Guide

### Step 1: Set Up Environment

1. Copy `.env.example` to `.env.local`
2. Update `NEXT_PUBLIC_API_BASE_URL` to your API server
3. Ensure CORS is enabled on your API for the Next.js dev server

### Step 2: Replace Mock APIs (One at a Time)

#### For Each API File:

1. **Open the API file** (e.g., `src/lib/api/auth.js`)
2. **Find TODO comments** that mark where to replace mock code
3. **Replace `apiCall()` with real `fetch()`**:

```javascript
// Replace this pattern:
return apiCall("/endpoint", { method: "POST" }, mockData);

// With this pattern:
const response = await fetch(`${API_CONFIG.baseUrl}/endpoint`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAuthToken()}`,
  },
  body: JSON.stringify(data),
});

if (!response.ok) {
  throw new Error(`API Error: ${response.status}`);
}

return await response.json();
```

4. **Test the endpoint** in the UI
5. **Move to next endpoint**

### Step 3: Update Base Client (Optional)

You can update `src/lib/api/client.js` to handle authentication and error responses globally:

```javascript
export async function apiCall(endpoint, options = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return await response.json();
}
```

Then all API functions can use this simplified pattern:
```javascript
export async function login(email, password, rememberMe) {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, rememberMe }),
  });
}
```

### Step 4: Testing Checklist

- [ ] Login flow works end-to-end
- [ ] Logout clears session and redirects
- [ ] Forgot password sends OTP
- [ ] OTP verification works
- [ ] Password reset works
- [ ] Dashboard loads metrics and features
- [ ] Feature transformations page loads data
- [ ] Feature views page loads data
- [ ] Feature services page loads data
- [ ] Loading states appear during API calls
- [ ] Error messages display when APIs fail
- [ ] Token persists across page refreshes
- [ ] Protected routes redirect to login when not authenticated

## 🔍 Finding All Mock API Calls

Search for these patterns in the codebase:

```bash
# Find all TODO comments for backend team
grep -r "TODO: Backend team" src/lib/api/

# Find all apiCall usages (mock API calls)
grep -r "apiCall(" src/lib/api/

# Find all mock data arrays
grep -r "MOCK_" src/lib/api/
```

## 📝 Data Structure Notes

### Important Field Types

- **IDs**: Always numeric (not strings)
- **Dates**: ISO 8601 format (`2025-11-18`)
- **Icons**: Component references (frontend handles rendering)
- **Tags**: Arrays of strings
- **Timestamps**: Relative strings ("2 hours ago") or ISO dates

### Consistent Response Format

All API responses should follow this pattern:

**Success:**
```json
{
  "data": {...},
  "message": "Optional success message"
}
```

**Error:**
```json
{
  "error": true,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## 🚨 Error Handling

The frontend handles these error scenarios:

1. **Network errors**: "Failed to connect to server"
2. **401 Unauthorized**: Redirects to login
3. **403 Forbidden**: Shows permission error
4. **404 Not Found**: Shows "Resource not found"
5. **500 Server Error**: Shows "Server error, please try again"

Make sure your API returns appropriate HTTP status codes.

## 🔒 Security Considerations

### Authentication Token

- Stored in `localStorage` with key from `NEXT_PUBLIC_AUTH_TOKEN_KEY`
- Sent in `Authorization: Bearer {token}` header
- Should be JWT with expiration
- Frontend will handle token refresh if you provide a refresh endpoint

### Sensitive Data

- Never log user passwords or tokens
- Use HTTPS in production
- Implement rate limiting on auth endpoints
- Add CSRF protection if using cookies

## 📞 Support & Questions

### Quick Reference

| What | Where |
|------|-------|
| Mock API definitions | `src/lib/api/*.js` |
| Type definitions | `src/types/*.js` |
| Auth context | `src/contexts/auth-context.jsx` |
| Environment config | `.env.local` |
| API base URL | `NEXT_PUBLIC_API_BASE_URL` |

### Common Issues

**Issue**: API calls fail with CORS error
**Solution**: Enable CORS on backend for Next.js dev server origin

**Issue**: Token not being sent
**Solution**: Check `getAuthToken()` in `src/lib/api/client.js`

**Issue**: Data structure mismatch
**Solution**: Compare response with type definitions in `src/types/`

**Issue**: Loading state not showing
**Solution**: Ensure API delay is sufficient or add artificial delay for testing

## 📚 Additional Resources

- **Type Definitions**: All expected data structures are documented with JSDoc in `src/types/`
- **Mock Data**: Reference mock data in each API file for exact structure
- **Component Props**: Check component files to see what data they expect

## ✅ Integration Completion Checklist

- [ ] Environment variables configured
- [ ] Authentication endpoints implemented
- [ ] Dashboard endpoints implemented
- [ ] Feature transformations endpoints implemented
- [ ] Feature views endpoints implemented
- [ ] Feature services endpoints implemented
- [ ] Token-based authentication working
- [ ] Error responses properly formatted
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] All mock API calls replaced
- [ ] End-to-end testing completed
- [ ] Production environment configured
- [ ] Security review completed

---

**Last Updated**: December 2025
**Frontend Version**: Next.js 15.5.7
**Contact**: Frontend team for any clarifications
