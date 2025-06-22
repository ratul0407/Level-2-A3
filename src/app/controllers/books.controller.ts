import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const bookRoutes = express.Router();

//post a new book
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await new Book(body);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

//get all books
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    let allBooks = Book.find(query);
    if (sortBy) {
      const sortDirection = sort === "desc" ? -1 : 1;
      allBooks = allBooks.sort({ [sortBy as string]: sortDirection });
    }
    if (limit) {
      const parsedLimit = parseInt(limit as string, 10);
      if (!isNaN(parsedLimit)) {
        allBooks = allBooks.limit(parsedLimit);
      }
    }

    const books = await allBooks;

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to retrieve the books", error });
  }
});
//get a specific book by it's id
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve the book",
      error: error,
    });
  }
});

//update a specific book using it's id
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't update the book",
      error,
    });
  }
});
//delete a specific book using it's id
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't delete the specified book",
      error: error,
    });
  }
});
