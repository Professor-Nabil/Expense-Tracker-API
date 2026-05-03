# API Documentation - Expense Tracker API

## Authentication

### Sign Up

- **Feature:** Create a new user account
- **Inputs:** `email`, `password` (JSON body)
- **Outputs:** `userId`, `message`
- **Success:** 201 Created
- **Fail:** 400 Bad Request (Validation/Existing user)
- **Security:** None (Public)
- **Error Handling:** Validate input via Zod; handle unique constraint for email

### Login

- **Feature:** Authenticate user and receive JWT
- **Inputs:** `email`, `password` (JSON body)
- **Outputs:** `token` (JWT)
- **Success:** 200 OK
- **Fail:** 401 Unauthorized
- **Security:** None (Public)
- **Error Handling:** Check credentials; return 401 on failure

## Expenses

### List Expenses
- **Feature:** Get all expenses with optional filters
- **Inputs:** Query params: `filter` (week, month, 3months, custom), `startDate`, `endDate`, `limit`, `offset`
- **Outputs:** Array of expenses
- **Success:** 200 OK
- **Fail:** 400 Bad Request
- **Security:** Private (Bearer Token required)
- **Error Handling:** Validate filters; 401 if token invalid

### Add Expense

- **Feature:** Create a new expense entry
- **Inputs:** `title`, `amount`, `category`, `date` (JSON body)
- **Outputs:** Created expense object
- **Success:** 201 Created
- **Fail:** 400 Bad Request
- **Security:** Private (Bearer Token required)
- **Error Handling:** Validate fields; 401 if token invalid

### Update Expense

- **Feature:** Update an existing expense
- **Inputs:** `expenseId` (path), `title`, `amount`, `category`, `date` (body)
- **Outputs:** Updated expense object
- **Success:** 200 OK
- **Fail:** 400/404 Not Found
- **Security:** Private (Bearer Token required)
- **Error Handling:** Validate existence; authorize ownership; 401 if invalid

### Remove Expense

- **Feature:** Delete an expense
- **Inputs:** `expenseId` (path)
- **Outputs:** Success message
- **Success:** 200 OK
- **Fail:** 404 Not Found
- **Security:** Private (Bearer Token required)
- **Error Handling:** Validate existence; authorize ownership; 401 if invalid
