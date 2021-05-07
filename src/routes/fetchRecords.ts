import express, { Router, Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { Data } from "./calculate";

const router: Router = express.Router();
const databasePath = path.join(__dirname, "../", "database.json");

let database: Data[] = [];

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ message: "No data found!" });
    } else {
      database = JSON.parse(data.toString());
      res.status(200).json(database);
    }
  });
});

export default router;
