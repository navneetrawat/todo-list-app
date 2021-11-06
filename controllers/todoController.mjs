// Exported Modules from contactModel.
import {getTodos, getTodo, create, update, remove} from '../models/todoModel.mjs';

// Route controllers.
export const getAlltodos = async(req, res, next) => {
    try{
        const todo = await getTodos();
        if(todo.length === 0){
            const error = new Error('Todos Not Found');
            error.status = 404;
            next(error);
        }else {
            res.status(200).json({
              status : 200,
              data : todo
            });
        }
    }catch(error) {
        next(error);
    }
}

export const getSingleTodo = async(req, res, next) => {
    try{
    const todo = await getTodo(req.params.id);
    if(todo.length === 0){
        const error = new Error('404 Todo Not Found');
        error.status = 404;
        next(error);
    }else {
        res.status(200).json({
            status : 200,
            data : todo
          });
    }
    }catch(error) {
        next(error);
    }
}

export const createTodo = async(req, res, next) => {
    try{
        await create(req.body);
        res.status(201).json({
            status : 201,
            msg : "Todo Successfully Created"
        })
    }catch(error) {
        next(error);
    }
}

export const updateTodo = async(req, res, next) => {
    try{
        const todo = await getTodo(req.params.id);
        if(todo.length === 0) {
            const error = new Error('Todo Not Found');
            error.status = 404;
            next(error);
        }else {
        await update(req.params.id , req.body);
            res.status(200).json({
               msg : "Todo Updated Successfully",
               status : 200
            });
        }
    }catch(error) {
        next(error);
    }
}

export const deleteTodo = async(req, res, next) => {
    try{
        const todo = await getTodo(req.params.id);
        if(todo.length === 0) {
            const error = new Error('Todo Not Found');
            error.status = 404;
            next(error);
        }else {
           await remove(req.params.id);
           res.status(200).json({
               msg : "Todo Deleted Successfully",
               status: 200
           });
        }
    }catch(error){
        next(error);
    }
}