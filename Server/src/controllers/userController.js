import { User } from "../model/userModel.js";

const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).send({
      message: `Server is Working is Properly...! `,
      user,
    });
  } catch (error) {
    console.log(`Fatching error while fatch user`, error);
  }
};



export { getUser, };
