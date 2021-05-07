import express, { Router, Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

const router: Router = express.Router();
const databasePath = path.join(__dirname, "../", "database.json");

export interface Data {
  shape: string;
  dimension: number | Record<string, number>;
  area: number;
}

let database: Data[] = [];

fs.readFile(databasePath, "utf8", (err, data) => {
  if (err) {
    return err;
  }
  if (data) database = JSON.parse(data);
});

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  switch (body.shape) {
    case "triangle":
      {
        const { a, b, c } = body.dimension;
        if (!a || !b || !c || Object.keys(body.dimension).length > 3) {
          res.status(404).json({
            error: "Provide valid dimensions",
          });
        } else {
          const area: number = triangleArea(a, b, c);
          if (area !== null) {
            const data = { ...body, area };
            database.push(data);
            writeData(database);
            return res.status(200).json(data);
          }
        }
      }
      break;
    case "square":
      {
        if (typeof body.dimension !== "number") {
          res.status(404).json({
            error: "Provide valid dimensions",
          });
        } else {
          const area = squareArea(body.dimension);
          const data = { ...body, area };
          database.push(data);
          writeData(database);
          return res.status(200).json(data);
        }
      }
      break;
    case "circle":
      {
        if (typeof body.dimension !== "number") {
          res.status(404).json({
            error: "Provide valid dimensions",
          });
        } else {
          const area = circleArea(body.dimension);
          const data = { ...body, area };
          database.push(data);
          writeData(database);
          return res.status(200).json(data);
        }
      }
      break;
    case "rectangle":
      {
        const { a, b } = body.dimension;
        if (!a || !b || Object.keys(body.dimension).length > 2) {
          res.status(404).json({
            error: "Provide valid dimensions",
          });
        } else {
          const area = rectangleArea(a, b);
          const data = { ...body, area };
          database.push(data);
          writeData(database);
          return res.status(200).json(data);
        }
      }
      break;
    default:
      res
        .status(404)
        .send(
          "Enter a valid shape. Valid shapes are 'circle', 'rectangle', 'triangle', 'square'",
        );
  }
});

//Helper Functions
const writeData = (data: Data[]) => {
  fs.writeFile(databasePath, JSON.stringify(data, null, 4), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const triangleArea = (a: number, b: number, c: number): number => {
  const s: number = (a + b + c) * 0.5;
  const Area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return Number(Area.toFixed(3));
};

const squareArea = (a: number): number => {
  return Math.pow(a, 2);
};

const circleArea = (r: number): number => {
  return Number((Math.PI * Math.pow(r, 2)).toFixed(3));
};

const rectangleArea = (a: number, b: number): number => {
  return a * b;
};

export default router;
