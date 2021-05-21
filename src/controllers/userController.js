import mongoose from "mongoose";
import User from "../model/User";

export const getMypage = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.user._id))
      return res.status(400).send({ err: "userId doesn't exist" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send({ err: "user is not exist" });

    // 게시물 개수
    const postSize = user.post.length;

    // 게시물 개수에 따른 필터링
    // switch (postSize) {
    //   case 1:
    //     // 뱃지 이미지 삽입
    //     user.badgeUrl.push();
    //   case 5:
    //   case 10:
    //   case 15:
    //   case 20:
    //   case 30:
    // }
    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    if (!req.user._id)
      return res.status(400).send({ err: "userId doesn't exist" });
    console.log(req.user._id);
    const userPosts = await User.findById(req.user._id).populate("post");
    return res.status(200).json({ success: true, userPosts });
  } catch (error) {
    next(error);
  }
};
