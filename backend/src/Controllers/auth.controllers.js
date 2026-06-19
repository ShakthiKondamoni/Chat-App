import express from "express";
import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import { UpsertStreamUser, GenerateStreamToken } from "../lib/Stream.js";


export const signup = async(req,res)=>{
    const  {Username,Email,Password} = req.body;
    try{

        if(!Email || !Password||!Username){
            return res.status(400).json("All fields are required");
        }

        if(Password.length <6){
            return res.status(400).json("Password must be at least 6 characters long");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(Email)){
            return res.status(400).json("Invalid email format");
        }

        const existingUser = await User.findOne({Email});
        if(existingUser){
            return res.status(400).json("Email already in use");
        }

        const idx = Math.floor(Math.random() * 100);
        const randomAvatar = `https://www.loremfaces.net/128/id/${idx}.jpg`;

        const newUser = await User.create({
            Username,
            Email,
            Password,
            ProfilePicture: randomAvatar
        });

        //TODO need to create a user in stream chat api
        try {
            const streamUser = await UpsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.Username,
                image: newUser.ProfilePicture
            });

            console.log("Stream user created for ${newUser.Username}:", streamUser);
        } catch (error) {
            console.error("Error creating Stream user:", error);
            return res.status(500).json({ message: "Failed to create Stream user" });
        }

        const streamToken = await GenerateStreamToken(newUser._id.toString());

        const Token = jwt.sign({userId : newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        res.cookie("jwt",Token,{
            httpOnly:true,
            maxAge:new Date(Date.now() + 24*60*60*1000),
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        }).status(201).json({
            message:"User registered successfully",success:true,user:{
                id:newUser._id,
                Username:newUser.Username,
                StreamToken: streamToken
            }
        });

    }catch(error){
        res.status(500).json({error: error.message, message: "Failed to register user"});
    }

};

export const Login = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        if (!Email || !Password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await user.MatchPassword(Password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const Token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res.cookie("jwt", Token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }).status(200).json({
            message: "Login successful",
            success: true,
           user: {
  id: user._id,
  _id: user._id,
  Username: user.Username,
  Email: user.Email,
  ProfilePicture: user.ProfilePicture,
  Bio: user.Bio,
  Country: user.Country,
  NativeLanguage: user.NativeLanguage,
  LearningLanguage: user.LearningLanguage,
  isOnboarded: user.isOnboarded,
}
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to login user"
        });
    }
};

export const Logout = async(req,res)=>{
  
    res.clearCookie("jwt");
    res.status(200).json({message:"Logout successful", success:true});
};

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            Username,
            Bio,
            Country,
            NativeLanguage,
            LearningLanguage
        } = req.body;

        if (
            !Username ||
            !Bio ||
            !Country ||
            !NativeLanguage ||
            !LearningLanguage
        ) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !Username && "Username",
                    !Bio && "Bio",
                    !Country && "Country",
                    !NativeLanguage && "NativeLanguage",
                    !LearningLanguage && "LearningLanguage"
                ].filter(Boolean)
            });
        }

        const UpdatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true
            },
            { new: true }
        );

        if (!UpdatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        try{

            await UpsertStreamUser({
                id: UpdatedUser._id.toString(),
                name: UpdatedUser.Username,
                image: UpdatedUser.ProfilePicture
            });

            console.log("Stream user updated for ${UpdatedUser.Username}:", UpdatedUser);
        }catch(streamError){
            console.error("Error updating Stream user:", streamError);
             return res.status(500).json({ message: "Failed to update Stream user" });
        }

        res.status(200).json({
            message: "User onboarded successfully",
            success: true,
            user: UpdatedUser
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to onboard user"
        });
    }
};

export const profile = async(req,res)=>{
    try{
        const user = req.user;
        return res.status(200).json({
            message:"User profile fetched successfully",
            success:true,
            user
        });
    }catch(error){
        res.status(500).json({
            error: error.message,
            message: "Failed to fetch user profile"
        });
    }
}