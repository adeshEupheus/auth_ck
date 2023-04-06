import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";

export const auth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "Authentication Invalid" });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);

    const payload = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtPayload;
    // console.log(payload);

    req.user = payload.personId;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ msg: "Authentication Invalid" });
  }
};
