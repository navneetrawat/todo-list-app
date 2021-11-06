// Npm Modules.
import express from 'express';
import dotenv from 'dotenv';

// Exported Modules.
import connection from './database/connection.mjs';
import todosRoute from './newRoutes/todoRoutes.mjs';
import errorHandler from './middlewares/errorHandler.mjs';
import error404 from './middlewares/error404.mjs';

// Initialize app and Configure dotenv.
const app = express();
dotenv.config();

// PORT Configuration.
const port = process.env.PORT || 8503;

// Middlewares.
app.use(express.static('./public'));
app.use(express.json());

// Route Middlewares.
app.use('/api/todo', todosRoute);
app.use(errorHandler);
app.use(error404);

// Listening to server.
(async() => {
    try{
    const data = await connection;
    if(data.state == 'authenticated') {
        console.log('Connection Established');
        app.listen(port, ()=>{
        console.log(`Server is listening to port : ${port}`);
        });
    }else{
        throw new Error('Connection Failed');
    }
    }catch(error){
    console.log(error);
    }
})();
