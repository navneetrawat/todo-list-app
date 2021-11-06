// Npm Modules.
import mysql from 'mysql';
import dotenv from 'dotenv';

// Configure dotenv file.
dotenv.config();

// Database configuration.
const Dbconfig = {
    localhost : process.env.LOCALHOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}

// Connection To Database.
const connection = new Promise((resolve, reject)=>{
const conn = mysql.createConnection(Dbconfig);
conn.connect(err=>{
if(err){
    const error = new Error('Something Went Wrong');
    reject(error.message);
}else{
    resolve(conn);
}
});
});

export default connection;