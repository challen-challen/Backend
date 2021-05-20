import Post from "../model/Post";
//import User from "../model/User";

export const getMain = async (req, res, next) => {
  try {
    // db query
    const sumPostNum = await Post.find({}).countDocuments();
    const todayPostNum = await Post.find({
      createAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    }).countDocuments();

    const sumUserNum = await Post.find({
      createAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      distinct: writer,
    }).countDocuments();

    // 응답
    return res.status(200).json({
      sumPostNum,
      todayPostNum,
      sumUserNum,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const {
      query: { category, sort },
    } = req;
    if (!category || !sort) {
      return res.status(400).send({ err: "category or sort is not exist." });
    }
    // 카테고리 별
    let filters = {};
    if (category !== "all") {
      filters["category"] == category;
    }

    // 정렬
    if (sort === "likes") {
      let posts = await Post.find(filter).sort({ likeCount: 1 });
    } else {
      let posts = await Post.find(filter).sort({ createAt: -1 });
    }

    // 응답
    return res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

// export const postPost = async (req, res, next) => {
//   try {
//     const {
//       body: { category },
//       files,
//     } = req;

//     let variable = req.body;
//     variable.writer = req.user;

//     // db query
//     let post = new Post(variable);

//     // 파일 이미지 작업
//     if (files) {
//       files.forEach((file) => post.fileUrl.push(file.path));
//     }

//     [post] = await Promise.all([
//       post.save(),
//       User.updateOne(
//         { "_id ": req.user._id },
//         {
//           $push: { post: post._id },
//           $push: { latestPost: post, $slice: -1 },
//           $inc: {
//             allScore: { dailyScore: 10, monthlyScore: 10, sumScore: 10 },
//             // 카테고리별 점수 구현
//             //categoryScore: { "[category]": 1 },
//           },
//         }
//       ),
//     ]);

//     // 응답
//     return res.status(200).json({ success: true, post });
//   } catch (error) {
//     next(error);
//   }
// };
