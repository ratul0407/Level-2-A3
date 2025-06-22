# 📖 Assignment: Library Management API with Express, TypeScript & MongoDB

This is library management api built with express, typescript and mongoose.
There are two api collection where you can manupulate the data, books and borrow collection.

# Books Collection

In the books collection there are basically 5 endpoints where you can hit to get some data.

## GET `api/books`

you can see all the data on all the available books on this route. You can also filter, sort or limit the data as you wish.

## POST `api/books/`

in this route you can add your own book data. But the book you are adding must strictly follow this structure. It must have these fields `title`, `author`, `genre`, `isbn`, `description`, `copies`, `available`. Note that there are 6 specified genre `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`.

## GET `/api/books/:bookId`

by hitting onto this route you can get a single book data by querying it with the bookId.

## PUT `/api/books/:bookId`

you can query a book using it's id and then update the book's data.

## DELETE `/api/books/:bookId`

you can delete any book you want using it's id.

# Borrow Collection

## POST `/api/borrow`

You can borrow a book by specifying the bookId in a book property with quantity and dueDate. something like this -

```javascript
{
    "book" :"6857f19a715daaeb449c4cca",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
}
```

But before you borrow the book the api will check if there is any copy available of the book. If the available copies matches your quantity then you would be able borrow it and the `quantity` property for that specific book will be updated accordingly. And if you borrow all the available copies of that book then the book's `available` property will be set to `false`.

## GET `/api/borrow`

This route returns the summary of the borrowed books like the totalQuantity borrowed for each book with their title and isbn number.
