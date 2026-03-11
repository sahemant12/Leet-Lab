import prisma from "../libs/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/enums.ts";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if(existingUser){
            return res.status(400).json({
                error: "User already exist"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        });

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("jwtToken", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
            maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
        });

    } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({
                error:"Error creating user"
            })
    }
};

export const logIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if(!user){
            res.status(401).json({
                message: "User not found",
                success: false
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign({id:user.id} , process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie("jwt" , token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
            maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        })

        res.status(200).json({
            success:true,
            message:"User Logged in successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role,
                image:user.image
            }
        })


    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error:"Error logging in user"
        })
    }

};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
        });
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }

};

export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success:true,
            message:"User get successfully",
            user:req.user
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error:"Error checking user"
        })
    }
};