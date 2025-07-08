# Book Library Backend

This is the backend API for the Book Library application. It provides endpoints for managing books in a MongoDB database.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB account (using MongoDB Atlas)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
```
cd standalone/backend
```
3. Install dependencies:
```
npm install
```

## Configuration

The MongoDB connection string is configured in `src/config/database.js`. Update this file with your own MongoDB connection string if needed.

## Running the Application

To start the server in development mode:

```
npm run dev
```

To start the server in production mode:

```
npm start
```

The server will run on http://localhost:3001 by default.

## API Endpoints

- `GET /api/books` - Get all books (with optional query parameters for filtering)
- `GET /api/book/:bookID` - Get a specific book by ID
- `POST /api/book/create` - Create a new book
- `PATCH /api/book/:bookID` - Update a book
- `DELETE /api/book/:bookID` - Delete a book

## Book Schema

```javascript
{
  title: String,       // required
  author: String,      // required
  status: String,      // "read" or "unread", default: "unread"
  description: String, // required
  date: String         // optional
}
``` 