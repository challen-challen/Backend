import express from "express";
import { getMain, getPosts } from "../controllers/postController";
import routes from "../routes";
import { multerImage } from "../middlewares";

const postRouter = express.Router();

// 메인 페이지 get
postRouter.get("/", getMain);
// 챌린지 페이지 get
postRouter.get(routes.posts, getPosts);
// 챌린지 업로드
postRouter.post(routes.posts, multerImage.array("images", 4), postPost);

export default postRouter;
