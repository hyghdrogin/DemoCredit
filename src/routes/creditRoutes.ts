import { Router } from "express";
import CreditController from "../controllers/credit";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { authenticate } = Authentication;
const {
  addMoney, verify
} = CreditController;

router.get("/paystack/verify", verify);

router.post("/paystack/initialize", authenticate, addMoney);

export default router;
