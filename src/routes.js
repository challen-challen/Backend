// HOME
const HOME = "/api";

// Naver
const NAVER = "/naver";
const NAVER_CALLBACK = "/naver/callback";

// logout
const LOGOUT = "/logout";

// main
const CHALLEN = "/api/challen";

// post
const POSTS = "/posts";
const POST = "/post/:postId";

// ranking
const RANK = "/api/ranking";

// mypage
const USER = "/api/mypage";
const USER_POSTS = "/posts/:userId";

// 공통
const USER_ID = "/:userId";

const routes = {
  home: HOME,
  challen: CHALLEN,
  posts: POSTS,
  post: POST,
  rank: RANK,
  userId: USER_ID,
  user: USER,
  userPosts: USER_POSTS,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  logout: LOGOUT,
};

export default routes;
