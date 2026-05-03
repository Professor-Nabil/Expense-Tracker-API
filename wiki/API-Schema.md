# API Schema - Expense Tracker API

All error responses follow this format:

```json
{
  "error": "Short error code/message",
  "details": "Detailed information (e.g., Zod field validation errors)"
}
```

## Authentication

### Sign Up

- **Request:**

  ```json
  { "email": "user@example.com", "password": "securePassword123" }
  ```

- **Response (201):**

  ```json
  { "userId": "uuid", "message": "User created successfully" }
  ```

### Login

- **Request:**

  ```json
  { "email": "user@example.com", "password": "securePassword123" }
  ```

- **Response (200):**

  ```json
  { "token": "jwt-string" }
  ```

## Expenses

### Add Expense

- **Request:**

  ```json
  {
    "title": "Lunch",
    "amount": 15.5,
    "category": "Leisure",
    "date": "2026-05-03T12:00:00Z"
  }
  ```

- **Response (201):**

  ```json
  {
    "id": "uuid",
    "title": "Lunch",
    "amount": 15.5,
    "category": "Leisure",
    "date": "..."
  }
  ```
