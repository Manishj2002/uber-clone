# API Documentation

## User Registration

### POST /users/register

#### Description
Register a new user in the system with their personal information.

#### Request Body
```json
{
  "fullname": {
    "firstname": "string",    // Required, min 3 characters
    "lastname": "string"      // Optional
  },
  "email": "string",         // Required, valid email format
  "password": "string"       // Required, min 6 characters
}
```

#### Validation Rules
- `fullname.firstname`: Minimum 3 characters
- `email`: Must be a valid email address format
- `password`: Minimum 6 characters
- Email must be unique in the system

#### Responses

| Status Code | Description | Response Body |
|------------|-------------|---------------|
| 201 | User successfully created | `{ "user": {...}, "token": "jwt_token" }` |
| 400 | Validation error or email exists | `{ "errors": [...] }` or `{ "error": "Email already exists" }` |
| 500 | Server error | `{ "error": "Server error" }` |

#### Example Success Response
```json
{
  "user": {
    "_id": "60d3b41f7c213e2570339fb1",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Response
```json
{
  "errors": [
    {
      "msg": "Enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}

```

## User Login

### POST /users/login

#### Description
Authenticate an existing user and receive an access token.

#### Request Body
```json
{
  "email": "string",    // Required, valid email format
  "password": "string"  // Required, min 6 characters
}
```

#### Validation Rules
- `email`: Must be a valid email address format
- `password`: Minimum 6 characters

#### Responses

| Status Code | Description | Response Body |
|------------|-------------|---------------|
| 200 | Login successful | `{ "user": {...}, "token": "jwt_token" }` |
| 400 | Validation error | `{ "errors": [...] }` |
| 401 | Invalid credentials | `{ "error": "Invalid credentials" }` |
| 500 | Server error | `{ "error": "Server error" }` |

#### Example Success Response
```json
{
  "user": {
    "_id": "60d3b41f7c213e2570339fb1",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Response
```json
{
  "error": "Invalid credentials"
}
```

## Get User Profile

### GET /users/profile

#### Description
Retrieve the authenticated user's profile information. Requires authentication token.

#### Headers
```
Authorization: Bearer <token>
```
or Token in cookies

#### Responses

| Status Code | Description | Response Body |
|------------|-------------|---------------|
| 200 | Profile retrieved successfully | User object |
| 401 | Not authenticated | `{ "error": "No token provided" }` or `{ "error": "Invalid token" }` |
| 404 | User not found | `{ "error": "User not found" }` |

#### Example Success Response
```json
{
  "_id": "60d3b41f7c213e2570339fb1",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## User Logout

### GET /users/logout

#### Description
Log out the currently authenticated user by invalidating their token. Requires authentication token.

#### Headers
```
Authorization: Bearer <token>
```
or Token in cookies

#### Responses

| Status Code | Description | Response Body |
|------------|-------------|---------------|
| 200 | Logout successful | `{ "message": "Logged out successfully" }` |
| 401 | Not authenticated | `{ "error": "No token provided" }` or `{ "error": "Invalid token" }` |
| 500 | Server error | `{ "error": "Server error" }` |

#### Example Success Response
```json
{
  "message": "Logged out successfully"
}
```

## Captain API Documentation

### POST /captains/register

#### Description
Register a new captain in the system with their personal and vehicle information.

#### Request Body
```json
{
  "fullname": {
    "firstName": "string",    // Required, min 3 characters
    "lastName": "string"      // Optional, min 3 characters if provided
  },
  "email": "string",         // Required, valid email format
  "password": "string",      // Required, min 6 characters
  "vehical": {
    "color": "string",       // Required, min 3 characters
    "plate": "string",       // Required, min 3 characters
    "capacity": "number",    // Required, min 1
    "vehicalType": "string"  // Required, enum: car|motorcycle|auto
  }
}
```

#### Validation Rules
- `fullname.firstName`: Minimum 3 characters
- `email`: Must be a valid email address format
- `password`: Minimum 6 characters
- `vehical.color`: Minimum 3 characters
- `vehical.plate`: Minimum 3 characters
- `vehical.capacity`: Minimum value of 1
- `vehical.vehicalType`: Must be one of: 'car', 'motorcycle', 'auto'
- Email must be unique in the system

#### Responses

| Status Code | Description | Response Body |
|------------|-------------|---------------|
| 201 | Captain successfully created | `{ "captain": {...}, "token": "jwt_token" }` |
| 400 | Validation error or email exists | `{ "errors": [...] }` |
| 500 | Server error | `{ "error": "Server error" }` |

#### Example Success Response
```json
{
  "captain": {
    "_id": "60d3b41f7c213e2570339fb1",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehical": {
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicalType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Response
```json
{
  "errors": [
    {
      "msg": "Vehicle color must be at least 3 characters long",
      "param": "vehical.color",
      "location": "body"
    }
  ]
}
```

