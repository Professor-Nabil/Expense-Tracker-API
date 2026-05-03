# GEMINI.md - Context & Principles

## Project Philosophy

- **Layered Architecture:** Strict separation of concerns (Routes -> Controllers -> Services -> Database).
- **Test-Driven Development (TDD):** Every feature starts with a failing test.
- **Contract-First:** API schemas and contracts are defined before implementation.
- **Data Integrity:** PostgreSQL/MariaDB is the source of truth, enforced by Prisma schemas.
- **Security:** JWT-based auth, Argon2 password hashing, and input validation via Zod.
- **Time/Date:** All timestamps stored and handled in **UTC**.

## Core Development Workflow (Layered Build Strategy)

1. **Define Contract & Model:** Update `Model.md`, `API-Schema.md`, `Zod-Schema.md`.
2. **Database/Service Layer (Core Logic):**
    - Setup Prisma schema.
    - Write tests for Service logic (Unit/Integration).
    - Implement Service methods.
3. **Controller/Route Layer (API Layer):**
    - Write Integration tests for endpoints.
    - Implement Controller/Middleware.
4. **Verification:** Run E2E tests and verify integration.

## Principles for Gemini CLI

- **Be Direct:** No fluff.
- **TDD First:** Ask for/provide tests before implementation.
- **Terminal-First:** Assume a CLI/Tmux/Vim/Arch Linux workflow.
- **Documentation is Code:** Wiki files are the source of truth. Keep them updated.
