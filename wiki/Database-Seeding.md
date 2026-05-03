# Database Seeding Strategy - Expense Tracker API

We will use a custom seed script (`prisma/seed.ts`) to initialize data for local development and integration tests.

## Data to Seed

1. **Users:** Create a few test users with known passwords.
2. **Expenses:** Create a variety of expenses for each test user to support filtering and CRUD testing.

## Execution

Use `npx prisma db seed` to run the script. This should be integrated into the test setup to ensure a predictable environment.
