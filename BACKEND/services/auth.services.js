import { findUserByEmail , findUserByEmailandPassword , createUser } from "../DAO/user.dao.js";
import { signToken } from "../utils/helper.js";


export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error("User already Exist");
  }
//   createuser dao mai hai to yaha se user database bana hua user milega jsme id rehti hai
  const newUser = await createUser(name, email, password);
  const token= signToken({id:newUser._id  })
  return { newUser ,token}
};


export const loginUser = async (email,password) =>{
    const user = await findUserByEmailandPassword (email);
    if(!user){
        throw new Error("User does not exists");
    }
    if(user.password !== password){
        throw new Error("Invalid password");
    }
    const token =  signToken({ id: user._id });
    return {user,token};
}
