// Exported Modules.
import connection from '../database/connection.mjs';
import crypto from 'crypto';

// Get All todos.
export const getTodos = async()=> {
    let conn = await connection;
    return new Promise((resolve,reject)=> {
        let sql = `SELECT * FROM todolist`;
        conn.query(sql, (err, result)=> {
            if(err){
                const error = new Error('Something Went Wrong');
                error.status = 500;
                reject(error);
            }else{
                resolve(result);
            }
            });
        });
}

// Get Single todo.
export const getTodo = async(todoID)=> {
    let conn = await connection;
    return new Promise((resolve,reject)=> {
    let sql = `SELECT * FROM todolist WHERE id = '${todoID}'`;
    conn.query(sql, (err,result)=> {
    if(err){
        const error = new Error('Something Went Wrong');
        error.status = 500;
        reject(error);
    }else{
        resolve(result);
    }
    });
    });
}

// Create todo.
export const create = async(todo) => {
    let conn = await connection;
    return new Promise((resolve, reject)=> {
    let id = crypto.randomBytes(8).toString('hex');
    let newTodo = {id, ...todo};
    let sql = `INSERT INTO todolist set ?`;
    conn.query(sql, newTodo, (err, result)=> {
    if(err){
        const error = new Error('Something Went Wrong');
        error.status = 500;
        reject(error);
    }else{
        resolve(result);
    }
    });
    });
}

// Update todo.
export const update = async(updateID, todo)=> {
    let conn = await connection;
    return new Promise((resolve, reject)=> {
    let sql = `UPDATE todolist SET ? WHERE id = '${updateID}'`;
    conn.query(sql, todo, (err, result)=> {
    if(err){
        const error = new Error('Something Went Wrong');
        error.status = 500;
        reject(error);
    }else{
        resolve();
    }
    });
    });
} 

// Delete todo.
export const remove = async(deleteID) => {
    let conn = await connection;
    return new Promise((resolve, reject)=> {
    let sql = `DELETE FROM todolist WHERE id = '${deleteID}'`;
    conn.query(sql, (err, result)=> {
    if(err){
        const error = new Error('Something Went Wrong');
        error.status = 500;
        reject(error);
    }else{
        resolve();
    }
    });
    })
}