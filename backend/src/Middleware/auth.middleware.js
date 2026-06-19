import jwt from "jsonwebtoken";
import User from "../Models/user.js";


 const protectRoute = async(req,res,next)=>{
    try{


            if (!req.cookies) {
    return res.status(401).json({
        message: "Cookies not found"});
           }


            const token = req.cookies.jwt;

            if(!token){
                return res.status(401).json({message:"Unauthorized access, token missing"});
            }


            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

            if(!decode || !decode.userId){
                return res.status(401).json({message:"Unauthorized access, invalid token"});
            }

            const user = await User.findById(decode.userId).select("-Password");

            if(!user){
                return res.status(402).json({message:"Unauthorized access, user not found"});
            }

            req.user = user;
            next();
    }catch(error){
            return res.status(401).json({message:"Unauthorized access", error: error.message});
    }
}

export { protectRoute };