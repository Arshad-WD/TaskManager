import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
    try{
        const user = await registerUser(req.body);

        const token = generateToken(user);

        res.status(201).json({
            token,
            user:{
                id: user.id,
                email: user.email,
                role: user.role,
            },

        });

    }catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await loginUser(req.body);

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });

    }catch(error){
        next(error);
    }
};