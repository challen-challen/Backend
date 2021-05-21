import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
  {
    // 작성자
    writer: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
      },
      nickname: {
        type: String,
        required: true,
      },
    },

    // category 전기 부문, 교통 부문, 냉난방 부문, 자원 부문으로 구별하는 기능을 한다
    category: {
      type: String,
      required: true,
    },

    // 첨부파일(챌린지 인증 사진)
    fileUrl: Array,

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

    // 유저가 좋아요한 게시글들
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Like",
      },
    ],

    // 게시글에 달린 댓글
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
