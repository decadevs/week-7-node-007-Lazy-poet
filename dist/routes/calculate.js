"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const databasePath = path_1.default.join(__dirname, "../", "database.json");
let database = [];
fs_1.default.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
        return err;
    }
    if (data)
        database = JSON.parse(data);
});
router.post("/", function (req, res, next) {
    const body = req.body;
    switch (body.shape) {
        case "triangle":
            {
                const { a, b, c } = body.dimension;
                if (!a || !b || !c || Object.keys(body.dimension).length > 3) {
                    res.status(404).json({
                        error: "Provide valid dimensions",
                    });
                }
                else {
                    const area = triangleArea(a, b, c);
                    if (area !== null) {
                        const data = { ...body, area };
                        database.push(data);
                        writeData(database);
                        return res.status(201).json(data);
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
                }
                else {
                    const area = squareArea(body.dimension);
                    const data = { ...body, area };
                    database.push(data);
                    writeData(database);
                    return res.status(201).json(data);
                }
            }
            break;
        case "circle":
            {
                if (typeof body.dimension !== "number") {
                    res.status(404).json({
                        error: "Provide valid dimensions",
                    });
                }
                else {
                    const area = circleArea(body.dimension);
                    const data = { ...body, area };
                    database.push(data);
                    writeData(database);
                    return res.status(201).json(data);
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
                }
                else {
                    const area = rectangleArea(a, b);
                    const data = { ...body, area };
                    database.push(data);
                    writeData(database);
                    return res.status(201).json(data);
                }
            }
            break;
        default:
            res
                .status(404)
                .send("Enter a valid shape. Valid shapes are 'circle', 'rectangle', 'triangle', 'square'");
    }
});
//Helper Functions
const writeData = (data) => {
    fs_1.default.writeFile(databasePath, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
const triangleArea = (a, b, c) => {
    const s = (a + b + c) * 0.5;
    const Area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return Number(Area.toFixed(3));
};
const squareArea = (a) => {
    return Math.pow(a, 2);
};
const circleArea = (r) => {
    return Number((Math.PI * Math.pow(r, 2)).toFixed(3));
};
const rectangleArea = (a, b) => {
    return a * b;
};
exports.default = router;
