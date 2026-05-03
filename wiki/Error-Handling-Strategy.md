# Error Handling Strategy - Expense Tracker API

All errors will be handled by a centralized middleware.

## Standard Error Response

```json
{
  "error": "Short error code",
  "details": "Detailed context or Zod validation errors"
}
```

## Strategy

1. **Validation Errors (400):** Catch Zod errors and map them to the standard response format.
2. **Auth Errors (401):** Handle invalid/missing tokens.
3. **Database Errors (500/409):** Handle Prisma errors (e.g., Unique constraint violation for emails -> 409 Conflict).
4. **Not Found (404):** Handle missing resources (e.g., updating an expense that doesn't exist).
5. **Global Catch:** A generic error handler at the end of the middleware chain to log the error and return a 500 status.
