import { Request, Response } from "express";
import database from "../../queries";
import Payment from "../middleware/paystack";
import { ICredit, IUser } from "../utilities/interface";
import { successResponse, errorResponse, handleError } from "../utilities/responses";

/**
 * @class CreditController
 * @description add money, verify
 * @exports CreditController
 */
export default class CreditController {
  /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
     */
  static async addMoney(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const { amount } = req.body;
      if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        return errorResponse(res, 422, "Invalid amount");
      }
      const user: IUser = await database.from("users").select("*").where({ id }).first();
      if (!user) {
        return errorResponse(res, 404, "User does not exist");
      }
      const reference = (Math.random() + 1).toString(36).substring(7);
      const credit: ICredit = {
        owner: id as string,
        sender: id as string,
        type: "cardPayment",
        amount,
        reference
      };
      await database("credits").insert(credit);
      const transaction = await database("credits").first().where({ reference });
      const paystack_data = {
        amount: amount * 100,
        email: user.email,
        metadata: {
          userId: user.id,
          transactionId: transaction.id,
        },
      };
      const paymentDetails = await Payment.initializePayment(paystack_data);
      return successResponse(res, 201, "Transaction Created", paymentDetails);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server Error");
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user errorResponse object
   * @returns {object} Success message
   */
  static async verify(req: Request, res: Response) {
    try {
      const { trxref } = req.query;
      if (!trxref) return errorResponse(res, 404, "No transaction reference found.");

      const resp: any = await Payment.verifyPayment(trxref as string);
      const { data } = resp.data;
      const transaction: ICredit = await database("credits").first().where({ id: data.metadata.transactionId });

      if (!transaction) {
        return errorResponse(res, 404, "Transaction record not found, please contact support");
      }
      await database("credits").where({
        id: data.metadata.transactionId
      }).update({ reference: data.reference });

      if (transaction.status !== "pending" && transaction.status !== "failed") {
        return errorResponse(res, 400, "Transaction already settled");
      }
      if (["success", "successful"].includes(data.status)) {
        const amount = data.amount / 100;
        await database("users").where({
          id: transaction.owner
        }).increment("balance", amount);
        await database("credits").where({
          id: data.metadata.transactionId
        }).update({ status: data.status });
        const Transaction = await database("credits").first().where({ id: data.metadata.transactionId });
        return successResponse(res, 200, "Transaction verified Successfully.", Transaction);
      }
      return errorResponse(res, 400, "Transaction could not be verified, please try again");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
}
