"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const School_1 = require("../controller/School");
const router = express_1.default.Router();
router.get("/getSchoolList", School_1.getSchoolList);
router.get("/selectSchool", School_1.selectSchool);
exports.default = router;
