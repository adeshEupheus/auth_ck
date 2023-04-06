"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const SchoolSchema = new Schema({
    id: Number,
    code: String,
    name: String,
    email: String,
    addressid: Number,
});
exports.default = mongoose_1.default.model("schools", SchoolSchema);
