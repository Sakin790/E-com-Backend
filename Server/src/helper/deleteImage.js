import { unlink } from "fs/promises";

const deleteImage = async (userImagePath) => {
  try {
    await unlink(userImagePath);
    console.log("User image deleted successfully");
  } catch (error) {
    console.log("Error deleting user image:", error);
  }
};

export { deleteImage };
