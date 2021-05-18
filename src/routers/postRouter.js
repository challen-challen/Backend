import express from "express";
import { getMain, getPosts, postPost } from "../controllers/postController";
import routes from "../routes";

const postRouter = express.Router();

// 메인 페이지 get
postRouter.get("/", getMain);
// 챌린지 페이지 get
postRouter.get(routes.posts, getPosts);
// 챌린지 업로드
postRouter.post(routes.posts, postPost);

export default postRouter;
