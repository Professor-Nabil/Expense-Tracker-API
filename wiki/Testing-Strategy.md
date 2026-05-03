# Testing Strategy - Expense Tracker API

## Methodology
We follow a **Test-Driven Development (TDD)** approach. Every feature implementation must be preceded by corresponding tests to ensure correctness and prevent regressions.

## Testing Layers

### 1. Unit Tests (`tests/unit/`)
- **Focus:** Isolated business logic and utility functions (e.g., date filtering logic, input validation helpers).
- **Tool:** `vitest`
- **Goal:** Validate core algorithms in isolation without external dependencies (database/network).

### 2. Integration Tests (`tests/integration/`)
- **Focus:** API route handlers, database interactions, and middleware chains.
- **Tools:** `vitest`, `supertest`
- **Goal:** Ensure controllers, services, and the database work together correctly. Use a test-specific database or transactional rollbacks to ensure a clean state for each test.

### 3. End-to-End (E2E) Tests (`tests/e2e/`)
- **Focus:** Complete user workflows (e.g., Sign up -> Login -> Add Expense -> List Expenses).
- **Tool:** `vitest` (executing HTTP requests via `supertest`)
- **Goal:** Verify that the system meets user requirements from start to finish.

## Test Infrastructure
- **Database:** Use a separate PostgreSQL container (or schema) for testing to ensure isolation.
- **Seeding:** Use a dedicated seeding script to populate test data before running integration and E2E suites.
- **CI/CD:** All tests will be automatically triggered on push to ensure no regressions are introduced.

## Success Criteria
- **Coverage:** Aim for high branch coverage on business logic services.
- **Pass/Fail:** All tests must pass before any pull request is considered merge-ready.
- **Isolation:** Tests must be deterministic and run independently of each other.
