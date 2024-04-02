import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category is required"],
      trim: true,
      unique: true,
      minlength: [3, "minlength 3 is required"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      lowercase: true,
      minlength: [3, "minlength 3 is required"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);
export { Category };
