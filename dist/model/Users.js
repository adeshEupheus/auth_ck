"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: Number },
    profilepic: { type: String },
    created: { type: String },
    modified: { type: String },
    gender: { type: String },
    salt: { type: String },
    password: { type: String },
    oldemail: { type: String },
    passwordresethash: { type: String },
    tokenexpirationtime: { type: String },
    dateofbirth: { type: String },
}, { collation: "Users" });
const User = mongoose_1.default.model("Users", UsersSchema);
exports.User = User;
