import passport from "passport";
import express from "express";
import routes from "../routes";
import { naverLogin, postNaverLogin } from "../controllers/globalController";

const globalRouter = express.Router();

// 메인 페이지 get
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: process.env.CLIENT_HOME_URL,
  }),
  postNaverLogin
);

export default globalRouter;
