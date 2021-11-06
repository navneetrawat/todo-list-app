const errorHandler = (error, req, res, next)=> {
    res.status(error.status).json({
       err : error.message,
       status : error.status
    });
}

export default errorHandler;