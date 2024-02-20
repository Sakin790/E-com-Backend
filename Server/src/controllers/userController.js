import createHttpError from "http-errors";
import { User } from "../model/userModel.js";
import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";

const getUsers = async (req, res, next) => {
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

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };

    const user = await User.findById(id, option);
    if (!user) {
      return res.status(500).send("No user found");
    }
    res.status(200).json({
      message: " user returned",
      user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(new apiError(400, "Invalid ID"));
    }
    console.log("Internal server error", error);
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOneAndDelete(id);
    if (!user) {
      return res.status(500).send("No user found");
    }
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(new apiError(400, "Invalid ID"));
    }
    console.log("Internal server error", error);
    next(error);
  }
};


export { getUsers, getUser, deleteUserById };
