import NaverStrategy from "passport-naver";
import { naverLoginCallback } from "./controllers/globalController";
import User from "./model/User";
import passport from "passport";

// naver
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      authType: "reauthenticate",
    },
    naverLoginCallback
  )
);

passport.serializeUser((user, done) => {
  // req.login()에서 넘겨준 user값
  done(null, user.email); // user에서 email만 세션에 저장
});

passport.deserializeUser(async (email, done) => {
  const user = await User.findOne({ email });
  done(null, user);
});
