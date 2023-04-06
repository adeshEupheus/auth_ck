import express from "express";
import { getSchoolList, selectSchool } from "../controller/School";

const router = express.Router();

router.get("/getSchoolList", getSchoolList);
router.get("/selectSchool", selectSchool);

export default router;
