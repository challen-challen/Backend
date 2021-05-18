import mongoose from "mongoose";
import { commentSchema } from "../model/Comments";

const postSchema = new mongoose.Schema(
  {
    // 작성자
    writer: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: user,
      },
      nickname: {
        type: String,
        unique: 1,
        required: true,
      },
    },

    // categoty 전기 부문, 교통 부문, 냉난방 부문, 자원 부문으로 구별하는 기능을 한다
    categoty: {
      type: String,
      required: true,
    },

    // 첨부파일(챌린지 인증 사진)
    fileUrl: String,

    // 글 제목
    title: {
      type: String,
      maxlength: 100,
      required: true,
    },

    // 실천방안
    plan: {
      type: String,
      required: true,
    },

    // 글 내용
    content: {
      type: String,
      minlength: 5,
      required: true,
    },

    // 작성 시간
    createAt: {
      type: Date,
      default: Date.now,
    },

    // 해당 게시글의 댓글 정보
    comments: [commentSchema],

    // 좋아요 개수
    likeCount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
