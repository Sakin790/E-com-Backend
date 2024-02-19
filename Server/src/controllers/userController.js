import createHttpError from "http-errors";
import { User } from "../model/userModel.js";
const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegEx = new RegExp(".*" + search + ".* ", "i");

    const filter = {
      isAdmin: {
        $ne: true,
      },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };

    const option = {
      password: 0,
    };

    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find().countDocuments();

    if (!users) {
      throw createHttpError(404, " No user found");
    }
    res.status(200).send({
      message: `User returned Successfully `,
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    console.log(`Error while fatching user`, error);
    next(error);
  }
};

export { getUser };
