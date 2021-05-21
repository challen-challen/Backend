import passport from "passport";
import express from "express";
import routes from "../routes";
import {
  naverLogin,
  postNaverLogin,
  logout,
  getSetUser,
} from "../controllers/globalController";

const globalRouter = express.Router();

// setUser
globalRouter.get(routes.setUser, getSetUser);
// naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: process.env.CLIENT_HOME_URL,
  }),
  postNaverLogin
);

// logout
globalRouter.get(routes.logout, logout);

export default globalRouter;
