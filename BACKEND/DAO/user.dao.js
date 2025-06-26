import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
};
export const findUserByEmailandPassword = async (email) => {
  const user = await User.findOne( {email} ).select("+password");
  return user;
}
export const createUser = async (name, email, password) => {
  const user = new User({
    name,
    email,
    password,
    role: "donor", // default from code
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716], // Bangalore default
    },
  });
  await user.save();
  return user;
};
