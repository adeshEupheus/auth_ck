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
const mongoose_1 = __importDefault(require("mongoose"));
const Auth_1 = __importDefault(require("./router/Auth"));
const School_1 = __importDefault(require("./router/School"));
const Auth_2 = require("./middleware/Auth");
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
dotenv_1.default.config();
const numCpu = os_1.default.cpus().length;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("testing");
}));
app.use("/api_v1/auth", Auth_1.default);
app.use("/api_v1/school", Auth_2.auth, School_1.default);
const PORT = process.env.PORT || 3000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected successfully to dbs");
        app.listen(PORT, () => {
            console.log(`server ${process.pid} is listing on ` + PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
});
if (cluster_1.default.isPrimary) {
    for (let i = 0; i < numCpu; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", () => {
        cluster_1.default.fork();
    });
}
else {
    main();
}
