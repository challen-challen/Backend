// main
const CHALLEN = "/api/challen";

// post
const POSTS = "/posts";

// ranking
const RANK = "/api/ranking";

// mypage
const USER = "/api/mypage";

// 공통
const USER_ID = "/:userId";

const routes = {
  challen: CHALLEN,
  posts: POSTS,
  rank: RANK,
  userId: USER_ID,
  user: USER,
};

export default routes;
