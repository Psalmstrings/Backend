//import express
const express = require ("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
//app


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors()) 
app.use(morgan("dev"))

const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")
const categoryRouter = require("./routers/categoryRouter")
const blogRouter = require("./routers/blogRouter")

const connectToDb = require("./config/connectToDb")
const authRouter = require("./routers/authRouter")
const transporter = require("./service/nodemailer/transporter")
const errorHandler = require("./middlewares/errorHandler")
connectToDb()


//listening to the server
app.listen(3000, ()=>{
    console.log("running on port 3000");
})


app.get("/", (req, res)=>{res.send("Welcome to Jumia Api version 1.0")})
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/blog", blogRouter)


app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})
app.use(errorHandler)

