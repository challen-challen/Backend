import "./db";
import "./passport";
import { generateFakeData } from "./faker";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import mongoStore from "connect-mongo";
import postRouter from "./routers/postRouter";
import rankingRouter from "./routers/rankingRouter";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.DB_HOST }),
  })
);
app.use(morgan("dev"));

//faker

// const generateFake = async () => {
//   await generateFakeData(50, 10);
// };
// generateFake();

// passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/post", (req, res) => {
  const html = `
  <form action=/api/challen${routes.posts} method="post"  enctype="multipart/form-data">
    <p><input type="file" name="images"></p>  
    <p><input type="text" name="category" placeholder="category" /></p>  
    <p><input type="text" name="title" placeholder="title" /></p>        
    <p><input type="text" name="plan" placeholder="plan" /></p>   
    <p><input type="text" name="content" placeholder="content" /></p>   
    <button>Send my greetings</button>
  </form>
  `;
  res.send(html);
});

// router
app.use(routes.challen, postRouter);
app.use(routes.rank, rankingRouter);
app.use(routes.user, userRouter);
app.use(routes.home, globalRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
if (!PORT) console.error("PORT is required");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
