import express, { Request, Response } from "express";
import { Borrow } from "../models/borrows.models";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const borrow = await new Borrow(body);
    await borrow.save();
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't borrow the book",
      error: error,
    });
  }
});
