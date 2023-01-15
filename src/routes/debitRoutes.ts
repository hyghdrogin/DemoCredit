import { Router } from "express";
import DebitController from "../controller/debit";
import Authentication from "../middleware/authenticate";

const router = Router();
const { authenticate } = Authentication;
const { sendMoney } = DebitController;

router.post("/", authenticate, sendMoney);

export default router;
