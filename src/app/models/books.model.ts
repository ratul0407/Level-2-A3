import { model, Schema } from "mongoose";
import { BookMethods, BookModel, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, BookModel, BookMethods>(
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
      min: 0,
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

bookSchema.method("updateAvailable", function () {
  console.log("I was here", this.copies === 0, this.copies);
  if (this.copies === 0) {
    this.available = false;
    console.log(this.available);
  } else if (this.copies > 0) {
    this.available = true;
    console.log("I was here", this.available);
  }
  return this.save();
});
export const Book = model<IBook, BookModel>("Book", bookSchema);
