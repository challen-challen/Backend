import User from "../model/User";

export const getRanking = async (req, res, next) => {
  try {
    const {
      query: {monthlyCategory, dailyCategory}
    } = req;

    // 전체
    const allUser = await User.find({},{
        "nickname": 1, 
        "allScore.sumScore": 1
      }).sort({
        "allScore.sumScore" : -1
      }).limit(3)

    // 월간
    let monthlyFilter = {};
    let monthlyProj = {};
    if (monthlyCategory !== "all") {
      monthlyFilter[`categoryScore.${monthlyCategory}.monthlyScore`] = -1;
      monthlyProj[`categoryScore.${monthlyCategory}.monthlyScore`] = 1;
      monthlyProj["nickname"] = 1;
    } else {
      monthlyFilter["allScore.monthlyScore"] = -1;
    }
    const monthlyUsers = await User.find({}, monthlyProj).sort(monthlyFilter).limit(10);
  
    // 일간
    let dailyFilter = {};
    let dailyProj = {};
    if (dailyCategory !== "all") {
      dailyFilter[`categoryScore.${dailyCategory}.dailyScore`] = -1;
      dailyProj[`categoryScore.${dailyCategory}.dailyScore`] = 1;
      dailyProj["nickname"] = 1;
    } else {
      dailyFilter["allScore.dailyScore"] = -1;
    }
    const dailyUsers = await User.find({},dailyProj).sort(dailyFilter).limit(10);

    
    return res.status(200).json({allUser, monthlyUsers, dailyUsers});
  } catch(error) {
    next(error);
  }
};
