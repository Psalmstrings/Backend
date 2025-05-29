const MiddlewareOne = (req, res, next)=>{
console.log("Middleware one");
next()
}

module.exports = MiddlewareOne