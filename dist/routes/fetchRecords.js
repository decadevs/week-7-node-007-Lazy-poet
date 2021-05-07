"use strict";
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const databasePath = path_1.default.join(__dirname, "../", "database.json");
let database = [];
router.get("/", (req, res, next) => {
  fs_1.default.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ message: "No data found!" });
    } else {
      database = JSON.parse(data.toString());
      res.status(200).json(database);
    }
  });
});
exports.default = router;
