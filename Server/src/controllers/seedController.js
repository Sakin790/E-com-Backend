import { data } from "../data.js";
import { User } from "../model/userModel.js";

const seedUser = async (req, res, next) => {
  try {
    await User.deleteMany({});
    const users = await User.insertMany(data.users);
    return res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
export { seedUser };
