import jwt from "jsonwebtoken";

const createJsonWebToken = (payload, secrectKey, expiresIn) => {
  const token = jwt.sign(payload, secrectKey, { expiresIn });
  return token;
};
export { createJsonWebToken };





const { name, email, phone, password } = req.body;
if (
  [name, email, phone, password].some((field) => field?.trim() === "")
) {
  throw new apiError(400, "all fields are required");
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email address" });
}
const existedUser = await User.findOne({
  $or: [{ username }, { email }],
});
if (existedUser) {
  throw new apiError(409, "username or email already exist");
}
const user = await User.create({
  name: username.toLowerCase(),
  email,
  password,
  phone
});



return res
  .status(201)
  .json(new apiResponse(200, createUser, "user registred successfully"));
