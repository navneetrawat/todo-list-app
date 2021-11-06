// Npm Modules.
import express from 'express';

// Exported Route Controllers from contactController.
import {getAlltodos, createTodo, getSingleTodo, updateTodo, deleteTodo} from '../controllers/todoController.mjs';

// Instantiate Router.
const router = express.Router();

// Routes Defination.
router.route('/').get(getAlltodos).post(createTodo);
router.route('/:id').get(getSingleTodo).put(updateTodo).delete(deleteTodo);

export default router;