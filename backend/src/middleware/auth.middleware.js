import prisma from "../libs/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 

dotenv.config();

export const authMiddleware = async (req, res, next)=>{
    try {
        const jwtToken = req.cookies?.jwt;
        
        if(!jwtToken){
            res.status(401).json({
                message: "Unauthorized - No token provided",
                success: false
            });
        }
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET); // decoded have payload
        if(!decoded.id){
            res.status(401).json({
                message: "Unauthorized - No token provided",
                success: false
            });
        }
        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
            select: {
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        })

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({message:"Error authenticating user"});
    }
}

export const checkAdmin = async (req, res, next)=>{
        try {
        const userId = req.user.id;
        
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })

        if(!user || user.role !== "ADMIN"){
            return res.status(403).json({
                message:"Access denied - Admins only"
            })
        }

        next();
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({message:"Error checking admin role"});
    }
};