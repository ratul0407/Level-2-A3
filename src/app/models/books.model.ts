import { Model, model, Schema } from "mongoose";
import { BookCopies, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookCopies>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [1, "Copies must be of a positive value but got ${VALUE}"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.method("reduceCopies", async function (quantity: number) {
  this.copies -= quantity;
  if (this.copies == 0) {
    this.available = false;
  }
  await this.save();
});
export const Book = model<IBook>("Book", bookSchema);
