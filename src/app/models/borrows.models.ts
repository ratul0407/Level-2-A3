import { Model, model, Schema } from "mongoose";
import { BorrowQuantity, IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow, Model<IBorrow>, BorrowQuantity>(
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

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
