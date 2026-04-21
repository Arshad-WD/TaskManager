import * as service from "../services/task.service.js";

export const create =  async (req, res, next) => {
    try{
        const task = await service.createTask(req.body, req.user.userId);
        res.status(201).json(task);
    }catch(error){
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try{
        const task  = await service.getTasks(req.user);
        res.json(task);
    }catch(error){
        next(error);
    }
};


export const update = async (req, res, next) => {
    try{
        const task =  await service.updateTask(req.params.id, req.body, req.user);
        res.json(task);
    }catch(error){
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try{
        await service.deleteTask(req.params.id);
        res.json({ message: "Deleted"});
    }catch(error){
        next(error);
    }
};