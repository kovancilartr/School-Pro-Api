"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("./routes/customer"));
const user_1 = __importDefault(require("./routes/user"));
const course_1 = __importDefault(require("./routes/course"));
require("dotenv").config();
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/api/v1", customer_1.default);
app.use("/api/v1", user_1.default);
app.use("/api/v1", course_1.default);
