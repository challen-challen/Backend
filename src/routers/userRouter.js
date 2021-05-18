import express from "express";
import { getMypage } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userId, getMypage);

export default userRouter;
