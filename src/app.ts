import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrows.controller";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
``;
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management api");
});

export default app;
