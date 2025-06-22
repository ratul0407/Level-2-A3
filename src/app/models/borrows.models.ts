import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.post("save", async function () {
  const book = await Book.findById(this.book);
  if (book) {
    book.copies -= this.quantity;
    if (book.copies == 0) {
      book.available = false;
    }
  }
  await book?.save();
});
export const Borrow = model<IBorrow>("Borrow", borrowSchema);
