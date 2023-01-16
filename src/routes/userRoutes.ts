import { Router } from "express";
import UserController from "../controllers/user";

const router = Router();
const {
  createUser, loginUser
} = UserController;

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
