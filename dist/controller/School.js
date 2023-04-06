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
exports.selectSchool = exports.getSchoolList = void 0;
const SchoolAcademicYear_1 = __importDefault(require("../models/SchoolAcademicYear"));
const Schools_1 = __importDefault(require("../models/Schools"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const PersonRole_1 = __importDefault(require("../models/PersonRole"));
const SchoolCoordinatorRole_1 = __importDefault(require("../models/SchoolCoordinatorRole"));
const getSchoolList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personrole = yield PersonRole_1.default.findOne({ personid: req.user });
        if ((personrole === null || personrole === void 0 ? void 0 : personrole.personroletype) === "COORDINATOR") {
            const coordinators = yield SchoolCoordinatorRole_1.default.find({
                coordinatorid: personrole.id,
            });
            const codeList = [];
            yield Promise.all(coordinators.map((coor) => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield SchoolAcademicYear_1.default.find({
                    schoolid: coor.schoolid,
                });
                // .where("academicyearid")
                // .gt(4);
                data.map((item) => {
                    codeList.push(item.id);
                });
            })));
            return res.status(200).json({ succuss: true, data: codeList });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", success: false });
    }
});
exports.getSchoolList = getSchoolList;
const selectSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolAcademicYearId } = req.body;
    try {
        const AcademicYearData = yield SchoolAcademicYear_1.default.findOne({
            id: schoolAcademicYearId,
        });
        const SchoolData = yield Schools_1.default.findOne({
            id: AcademicYearData === null || AcademicYearData === void 0 ? void 0 : AcademicYearData.schoolid,
        });
        const userInfo = yield User_1.default.findOne({ id: req.user });
        const token = jsonwebtoken_1.default.sign({
            sub: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
            app: "SchoolApp",
            personId: req.user,
            schoolCode: SchoolData === null || SchoolData === void 0 ? void 0 : SchoolData.code,
            schoolId: SchoolData === null || SchoolData === void 0 ? void 0 : SchoolData.id,
            schoolAcademicYearId: schoolAcademicYearId,
        }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.JWT_LIFETIME });
        return res.status(200).json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", success: false });
    }
});
exports.selectSchool = selectSchool;
