import { Request, Response } from "express";
import bcrypt from "bcrypt";
import database from "../../queries";
import { IUser } from "../utilities/interface";
import { successResponse, errorResponse, handleError } from "../utilities/responses";
/**
 * @class UserController
 * @description create
 * @exports UserController
 */
export default class UserController {
  /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
     */
  static async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const emailWa = await database("users").where({ email }).first();
      if (emailWa) {
        return errorResponse(res, 404, "User already exists");
      }
      const username = email.substring(0, email.indexOf("@"));
      const passwordHash = await bcrypt.hash(password, 10);
      const userDetails: IUser = {
        username,
        email,
        password: passwordHash,
      };
      const user = await database("users").insert(userDetails);
      return successResponse(res, 201, "User Created Successfully", { user });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server Error");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response): Promise<object> {
    try {
      const { email, password } = req.body;
      const user: IUser = await database("users").first("*").where({ email });
      if (!user) return errorResponse(res, 404, "Email does not exist.");
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) return errorResponse(res, 400, "Password is not correct!.");
      const loggedUser = await database.from("users").first().select("id", "email", "username", "balance").where({ email });
      return successResponse(res, 200, "User Logged in Successfully.", { loggedUser });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
}
