import { Router } from "express";
import userRoutes from "./userRoutes";
import creditRoutes from "./creditRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/credits", creditRoutes);

export default router;
