# Technology Stack - Expense Tracker API

To build a robust, maintainable, and test-driven backend, the following technology stack will be used:

### Core Language & Runtime

- **Runtime:** Node.js (v22.x LTS - Active LTS)
- **Language:** TypeScript (v5.x)

### Frameworks & Libraries

- **API Framework:** Express.js (v4.x)
- **Validation:** Zod (v3.x) - For schema definition and request validation.

### Database & Data Access

- **Database:** MariaDB (v10.x) - Relational database for structured data.
- **ORM:** Prisma (v6.x) - For type-safe database interaction.

### Authentication & Security

- **Authentication:** JSON Web Tokens (jsonwebtoken v9.x)
- **Password Hashing:** Argon2 (v0.40.x) - Recommended for secure password hashing.

### Testing

- **Test Runner:** Vitest (v3.x) - Integrated, fast testing framework.
- **Mocking/Utilities:** Supertest (v7.x) - For integration testing of Express routes.

### Tooling & Quality

- **Package Manager:** npm
- **Linting & Formatting:** ESLint (v9.x) + Prettier (v3.x)
- **Development Utility:** tsx (v4.x) - For running TypeScript files directly during development.
