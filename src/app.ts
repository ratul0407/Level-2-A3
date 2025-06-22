import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/books.controller";

const app: Application = express();

app.use(express.json());
app.use("/api/books", bookRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management api");
});

export default app;
