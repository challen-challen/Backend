// main 페이지의 오늘 참여자 수, 총 챌린지 개수, 오늘 챌린지 개수 현황을 반환
export const getMain = async (req, res, next) => {
  try {
    // db query
    const sumPostNum = await Post.find({}).countDocuments();
    const todayPostNum = await Post.find({
        createAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lte: new Date(new Date().setHours(23,59,59,999))
        }
    }).countDocuments();
    const sumUserNum = await Post.find({
        createAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lte: new Date(new Date().setHours(23,59,59,999))
        },
        distinct: writer
    }).countDocuments();

    // 응답
    return res.status(200).json({
        sumPostNum,
        todayPostNum,
        sumUserNum
    });
  } catch(error) {
    next(error);
  }
};

// post 목록 반환
export const getPosts = async (req, res, next) => {
  try {
    const {query : {category, sort}} = req;
    if (!category || !sort) {
        return res.status(400).send({err: 'category or sort is not exist.'});
    }
    // 카테고리 별
    let filters = {};
    if (category !== 'all') {
        filters['category'] == category;
    };

    // 정렬
    if (sort === 'likes') {
        let posts = await Post.find(filter)
        .sort({likeCount: 1});
    } else {
        let posts = await Post.find(filter)
        .sort({createAt: -1});
    };

    // 응답
    return res.status(200).json({ posts });
  } catch(error) {
    next(error);
  }
};

// 새로운 post 등록
export const postPost = async (req, res, next) => {
  try {
    let variable = req.body;
    variable.writer = req.user;

    // db query
    await Post.create(variable);

    // 응답
    return res.status(200);
  } catch(error) {
    next(error);
  }
};

// Post(챌린지) 정보 반환
export const getPost = async (req, res, next) => {
  try {
    const {query: postId} = req;
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).send({ err: 'Invalid Post ID' });
    };

    const post = await Post.findById(postId);

    return res.status(200).send(post);
  } catch(error) {
    next(error);
  }
};