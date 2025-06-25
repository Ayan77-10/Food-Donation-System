// import 
import { registerUser ,loginUser } from "../services/auth.services.js"
import { cookieOptions } from "../config/config.js"


export const register = async  (req ,res) =>{
    const {name , email ,password} = req.body
    const user = await registerUser(name,email ,password)
    // yaha par user.token isliye hai qki mai uparwaale fnc se object return karwwa raha hu
    res.cookie('AccessToken' , user.token , cookieOptions)
    res.status(200).json({message :"User successfully registered"})
}

 
export const login = async (req ,res) =>{
    const {email,password} = req.body
    const user = await loginUser(email ,password)
    req.user = user.user
    res.cookie('AccessToken' , user.token , cookieOptions)
    res.status(200).json({user :user, message :"User logged in"})
}

export const logout_user = async (req ,res) =>{
    res.clearCookie('AccessToken' , cookieOptions)
    res.status(200).json({message :"User logged out"})
}