import "./db";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import postRouter from "./routers/postRouter";
import rankingRouter from "./routers/rankingRouter";
import userRouter from "./routers/userRouter";

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

// router
app.use(routes.challen, postRouter);
app.use(routes.rank, rankingRouter);
app.use(routes.user, userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

//const PORT = process.env.PORT;
//if (!PORT) console.error("PORT is required");

app.listen(5000, () => {
  console.log(`Server listening on 5000`);
});
