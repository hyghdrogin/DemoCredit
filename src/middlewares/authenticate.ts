import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utilities/responses";

/**
 * @class Authentication
 * @description authenticate token and roles
 * @exports Authentication
 */

export default class Authentication {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticateHeader = req.headers.authorization;
      if (!authenticateHeader) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const token = authenticateHeader.split(" ")[1];
      if (!token) {
        return errorResponse(res, 401, "Invalid token");
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, "Internal Server Error");
    }
  }
}
