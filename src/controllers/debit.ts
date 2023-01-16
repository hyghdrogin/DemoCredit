import { Request, Response } from "express";
import { IUser } from "../utilities/interface";
import { errorResponse, successResponse, handleError } from "../utilities/responses";
import database from "../../queries";

/**
 * @class DebitController
 * @description create transaction, get all transactions, get a transaction, delete a transaction
 * @exports AdminController
 */
export default class AdminDebitController {
  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async sendMoney(req: Request, res: Response): Promise<object> {
    try {
      const { id } = req.query;
      const { amount, email } = req.body;
      if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        return errorResponse(res, 422, "Invalid amount.");
      }

      const user: IUser = await database("users").select("*").first().where({ id });
      if (!user) return errorResponse(res, 400, "user does not exist");

      const receiver: IUser = await database("users").first().where({ email });
      if (!receiver) return errorResponse(res, 400, "Receiver account does not exist");

      if (user.balance == null || user.balance < amount) {
        return errorResponse(res, 409, "Insufficient funds.");
      }

      const reference = (Math.random() + 1).toString(36).substring(7);
      await database("credits").insert({
        amount,
        type: "transfer",
        owner: receiver.id as string,
        sender: id as string,
        status: "success",
        reference
      });
      await database("debits").insert({
        amount,
        type: "transfer",
        receiver: receiver.id as string,
        sender: id as string,
        status: "successful"
      });
      await database("users").where({
        id
      }).increment("balance", -amount);
      await database("users").where({
        id: receiver.id
      }).increment("balance", amount);
      return successResponse(res, 200, "Money transferred successfully.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
}
