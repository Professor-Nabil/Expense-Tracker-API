# Data Models - Expense Tracker API

## User

- `id`: UUID (Primary Key)
- `email`: String (Unique, Indexed)
- `password`: String (Hashed)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Expense

- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key, references User.id)
- `title`: String
- `amount`: Decimal
- `category`: Enum (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others)
- `date`: DateTime
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Relationships

- A `User` has many `Expenses` (One-to-Many).
- An `Expense` belongs to one `User` (Many-to-One).
