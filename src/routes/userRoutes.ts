import { Router } from "express";
import UserController from "../controller/user";

const router = Router();
const {
  createUser, loginUser
} = UserController;

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
