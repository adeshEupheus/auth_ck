import axios from "axios";
import { RequestHandler } from "express";
import SchoolAcademicYear from "../models/SchoolAcademicYear";
import Schools from "../models/Schools";
import jwt from "jsonwebtoken";
import User from "../models/User";
import PersonRole from "../models/PersonRole";
import SchoolCoordinatorRole from "../models/SchoolCoordinatorRole";

export const getSchoolList: RequestHandler = async (req, res) => {
  try {
    const personrole = await PersonRole.findOne({ personid: req.user });
    if (personrole?.personroletype === "COORDINATOR") {
      const coordinators = await SchoolCoordinatorRole.find({
        coordinatorid: personrole.id,
      });

      const codeList: number[] = [];

      await Promise.all(
        coordinators.map(async (coor) => {
          const data = await SchoolAcademicYear.find({
            schoolid: coor.schoolid,
          });
          // .where("academicyearid")
          // .gt(4);

          data.map((item) => {
            codeList.push(item.id);
          });
        })
      );
      return res.status(200).json({ succuss: true, data: codeList });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

export const selectSchool: RequestHandler = async (req, res) => {
  const { schoolAcademicYearId } = req.body;

  try {
    const AcademicYearData = await SchoolAcademicYear.findOne({
      id: schoolAcademicYearId,
    });
    const SchoolData = await Schools.findOne({
      id: AcademicYearData?.schoolid,
    });
    const userInfo = await User.findOne({ id: req.user });

    const token = jwt.sign(
      {
        sub: userInfo?.email,
        app: "SchoolApp",
        personId: req.user,
        schoolCode: SchoolData?.code,
        schoolId: SchoolData?.id,
        schoolAcademicYearId: schoolAcademicYearId,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};
