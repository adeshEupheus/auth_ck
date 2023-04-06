"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    id: Number,
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
});
exports.default = mongoose_1.default.model("Users", userSchema);
