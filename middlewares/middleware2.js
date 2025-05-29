const MiddlewareTwo = (req, res, next)=>{
console.log("Middleware 2....");
next()
}

module.exports = MiddlewareTwo