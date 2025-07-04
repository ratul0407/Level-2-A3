import express, { Request, Response } from "express";
import { Borrow } from "../models/borrows.models";
import { Book } from "../models/books.model";
import { z } from "zod";

export const borrowRoutes = express.Router();

const zodBorrowSchema = z.object({
  book: z.string(),
  quantity: z.number(),
  dueDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});
borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = await zodBorrowSchema.parse(req.body);
    console.log(body);

    const book = await Book.findById(body.book);
    if (book) {
      if (book.copies < body.quantity) {
        res.status(400).json({
          success: false,
          message: `only ${book.copies} available cannot borrow ${body.quantity}`,
        });
      } else if (book.copies === body.quantity || book.copies > body.quantity) {
        const borrow = await new Borrow(body);
        await borrow.save();

        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrow,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow the book",
      error: error,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
            author: "$bookDetails.author",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Failed to load the borrow data",
      error,
    });
  }
});
