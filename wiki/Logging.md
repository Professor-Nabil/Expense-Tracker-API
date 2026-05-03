# Logging Strategy - Expense Tracker API

We will use **Pino** as the primary logging library for its speed and low overhead.

## Configuration

- **Development:** Pretty-print logs to terminal for readability.
- **Production:** JSON output for compatibility with log aggregation tools.

## Logging Levels

- `info`: Standard application flow (e.g., server started, route hit).
- `warn`: Expected issues (e.g., validation failure).
- `error`: Unexpected issues (e.g., database connection failure, unhandled exceptions).

## Request Logging

Use a middleware (like `pino-http`) to automatically log incoming requests and outgoing responses, including correlation IDs for tracing.
