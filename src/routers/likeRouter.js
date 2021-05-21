import express from "express";
import {
    postLike,
} from "../controllers/likeController";
import routes from "../routes";

const likeRouter = express.Router();

// 좋아요 추가
likeRouter.get("/", postLike);
// 좋아요 취소
// likeRouter.delete(routes.like, deleteLike);

export default likeRouter;