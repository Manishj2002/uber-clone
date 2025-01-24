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