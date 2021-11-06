const error404 = (req, res, next)=> {
   res.status(404).json({
      err : "Page Not Found"
   });
}

export default error404;