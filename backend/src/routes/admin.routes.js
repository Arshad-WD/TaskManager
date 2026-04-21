import express from "express";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";
import prisma from "../configs/db.js";

const router = express.Router();

router.get("/users", protect, isAdmin, async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, role: true},
    });
    res.json(users);
});

export default router;
