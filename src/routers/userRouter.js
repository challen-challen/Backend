import express from "express";
import { getMypage, getUserPosts } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userId, getMypage);
userRouter.get(routes.userPosts, getUserPosts);

export default userRouter;
