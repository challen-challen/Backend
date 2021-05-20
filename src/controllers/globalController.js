import passport from "passport";
import User from "../model/User";

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    id,
    _json: { email, nickname },
  } = profile;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.naverId = id;
      await user.save();
      // done 매개변수 user는 passport.serializeUser의 매개변수 user의 값으로 넘어감
      return done(null, user);
    } else {
      const newUser = await User.create({
        naverId: id,
        nickname,
        email,
      });

      return done(null, newUser);
    }
  } catch (error) {
    console.log("error", error);
    return done(error);
  }
};

export const naverLogin = passport.authenticate("naver", {
  // 로그인 페이지로 redirect
  failureRedirect: process.env.CLIENT_HOME_URL,
});

export const postNaverLogin = async (req, res) => {
  res.redirect(process.env.CLIENT_HOME_URL);
};
