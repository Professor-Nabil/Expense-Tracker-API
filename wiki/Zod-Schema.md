# Zod Schemas - Expense Tracker API

```typescript
import { z } from "zod";

// Authentication
export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Expenses
export const ExpenseSchema = z.object({
  title: z.string().min(1),
  amount: z.number().positive(),
  category: z.enum([
    "Groceries",
    "Leisure",
    "Electronics",
    "Utilities",
    "Clothing",
    "Health",
    "Others",
  ]),
  date: z.string().datetime(), // ISO string in UTC
});

export const UpdateExpenseSchema = ExpenseSchema.partial();
```
