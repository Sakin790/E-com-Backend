import { User } from "../model/userModel.js";
import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { deleteImage } from "../helper/deleteImage.js";
import { createJsonWebToken } from "../helper/jsonwebtoken.js";
import { data } from "../data.js";

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
      throw new apiError(404, " No user found");
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
    const userImagePath = user.image; // for delete image
    deleteImage(userImagePath);

    if (!user) {
      return res.status(500).send("No user found");
    }
    res.status(200).json({
      message: `${user.name} Deleted Successfully`,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(new apiError(400, "Invalid ID"));
    }
    console.log("Internal server error", error);
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (
      [name, email, phone, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      new apiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
      $or: [{ phone }, { email }],
    });
    if (existedUser) {
      new apiError(409, "Phone or email already exists");
    }

    //console.log(req.file.size);
    const key = process.env.JWT_ACTIVATION_KEY || hsgwfdwgqdvbnsfdhg;
    const token = createJsonWebToken(
      { name, email, phone, password },
      key,
      "10m"
    );

    const user = await User.create({
      name: name.toLowerCase(),
      email,
      password,
      phone,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    next(error);
  }
};

const healthcheck = (req, res) => {
  return res.status(200).json({
    message: "Server is Working ",
  });
};

const seedUser = async (req, res, next) => {
  try {
    await User.deleteMany({});
    const users = await User.insertMany(data.users);
    return res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateOption = {
      new: true,
      runValidators: true,
      context: "query",
    };

    let updates = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.phone && { phone: req.body.phone }),
      ...(req.body.password && { password: req.body.password }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOption
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating user" });
  }
};
export {
  getUsers,
  getUser,
  deleteUserById,
  registerUser,
  healthcheck,
  seedUser,
  updateUserById,
};
