# File Structure - Expense Tracker API

```text
/
├── prisma/               # Database schema and migrations
├── src/
│   ├── config/           # Environment variables, constants
│   ├── controllers/      # Request handlers (HTTP layer)
│   ├── middlewares/      # Authentication, error handling, validation
│   ├── routes/           # Express route definitions
│   ├── services/         # Business logic layer
│   ├── types/            # TypeScript interface/type definitions
│   ├── utils/            # Shared helper functions
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Entry point
├── tests/
│   ├── unit/             # Isolated unit tests
│   ├── integration/      # API route integration tests
│   └── e2e/              # Full feature end-to-end tests
├── wiki/                 # Project documentation
├── .env.example          # Environment variables template
├── eslint.config.mjs     # ESLint configuration
├── package.json
├── prettier.config.mjs   # Prettier configuration
├── tsconfig.json         # TypeScript configuration
└── vitest.config.ts      # Vitest configuration
```

## Architecture Pattern

- **Routes:** Define endpoints and map to Controllers.
- **Controllers:** Parse request input, validate, call Services, handle HTTP responses.
- **Services:** Execute business rules, interact with database via Prisma.
