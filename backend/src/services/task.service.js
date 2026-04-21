import prisma from "../configs/db.js";

export const createTask = (data, userId) => {
    return prisma.task.create({
        data: { ...data, userId },
    });
};

export const getTasks = (user) => {
    if(user.role === "ADMIN") {
        return prisma.task.findMany();
    }
    return prisma.task.findMany({
        where: {userId: user.userId}
    });
};

export const updateTask = (id, data, user) => {
    return prisma.task.update({
        where: { id },
        data, 
    });
};

export const deleteTask = (id) => {
    return prisma.task.delete({
        where: {id}
    });
};