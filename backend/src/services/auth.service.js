import prisma from "../configs/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
    const { email, password }  =  data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
        },
    });

    return user;
};

export const loginUser = async (data) => {
    const { email , password }  = data;
    
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(!user){
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid Credentials");
    }

    return user;
};

