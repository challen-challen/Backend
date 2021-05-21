import User from "../model/User";

export const getRanking = async (req, res, next) => {
  return req.send("getRanking");
  // try {
  //   const {
  //     query: { category, sort },
  //     params: { userId },
  //   } = req;

  //   let score;

  //   if (!category || !sort)
  //     return res.status(400).send({ err: "category or sort is not exist" });

  //   if (category === "all") {
  //     score = await User.find({}).sort({allScore['sort'] : -1});
  //   }
  // } catch (error) {}
};
