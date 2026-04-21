import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new Error("No token");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({ message: "Unauthorized"});
    }
};

export const isAdmin = (req, res, next) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({message: "Forbidden"});
    }
    next();
};

