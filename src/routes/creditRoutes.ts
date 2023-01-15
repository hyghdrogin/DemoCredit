import { Router } from "express";
import CreditController from "../controller/credit";
import Authentication from "../middleware/authenticate";

const router = Router();
const { authenticate } = Authentication;
const {
  addMoney, verify
} = CreditController;

router.get("/paystack/verify", verify);

router.post("/paystack/initialize", authenticate, addMoney);

export default router;
