import { Router } from "express";
import DebitController from "../controllers/debit";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { authenticate } = Authentication;
const { sendMoney } = DebitController;

router.post("/", authenticate, sendMoney);

export default router;
