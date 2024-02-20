import { promises as fs } from "fs";

const deleteImage = async (userImagePath) => {
  try {
    await fs.unlink(userImagePath);
    console.log("user image deleted Successfully");
  } catch (error) {
    console.log("User image dose not exist", error);
  }
};

export { deleteImage };
