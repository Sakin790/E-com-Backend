import jwt from "jsonwebtoken";

const createJsonWebToken = (payload, secrectKey, expiresIn) => {
  const token = jwt.sign(payload, secrectKey, { expiresIn });
  return token;
};
export { createJsonWebToken };

