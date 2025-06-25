import  JsonWebToken from "jsonwebtoken";



const jwtOptions = {
    expiresIn :'1h'
}


export const signToken = (payload)=>{
    return JsonWebToken.sign(payload,process.env.JWT_SECRET, jwtOptions )
}