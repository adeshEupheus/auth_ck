"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const Auth_1 = __importDefault(require("./router/Auth"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./db/connect"));
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coll = connect_1.default.collection("Users");
    const data = yield coll
        .find({
        firstname: "Ginelle",
    })
        .toArray();
    console.log(data);
    res.status(200).send("testing");
}));
app.use("/api_v1", Auth_1.default);
const PORT = process.env.PORT || 3000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected successfully to db");
        app.listen(PORT, () => {
            console.log("server is listing on " + PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
});
main();
