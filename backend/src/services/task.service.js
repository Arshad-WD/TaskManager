import prisma from "../configs/db.js";
import redisClient from "../configs/redis.js";
import logger from "../configs/logger.js";


export const getTasks = async (user) => {
    const cacheKey = `tasks:${user.userId}`;
    
    // Check cache
    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            logger.debug(`Cache Hit for ${cacheKey}`);
            return JSON.parse(cached);
        }
    } catch (err) {
        logger.error(`Redis Get Error: ${err.message}`);
    }

    let tasks;
    if(user.role === "ADMIN") {
        tasks = await prisma.task.findMany({ include: { user: { select: { email: true } } } });
    } else {
        tasks = await prisma.task.findMany({
            where: {userId: user.userId}
        });
    }

    // Set cache for 5 minutes
    try {
        await redisClient.set(cacheKey, JSON.stringify(tasks), "EX", 300);
    } catch (err) {
        logger.error(`Redis Set Error: ${err.message}`);
    }

    return tasks;
};

const invalidateCache = async (userId) => {
    try {
        await redisClient.del(`tasks:${userId}`);
        logger.debug(`Cache Invalidated for user:${userId}`);
    } catch (err) {
        logger.error(`Redis Delete Error: ${err.message}`);
    }
};

export const createTask = async (data, userId) => {
    const task = await prisma.task.create({
        data: { ...data, userId },
    });
    await invalidateCache(userId);
    return task;
};

export const updateTask = async (id, data, user) => {
    const task = await prisma.task.update({
        where: { id },
        data, 
    });
    await invalidateCache(user.userId);
    return task;
};

export const deleteTask = async (id, userId) => {
    await prisma.task.delete({
        where: {id}
    });
    if (userId) await invalidateCache(userId);
};