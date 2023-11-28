import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import mongoose from "mongoose"
import songRouter from "./route/song.route.js"

//Init Express
const app = express()

//MiddleWare
app.use(express.json())
app.use(cors())

// static foldr
app.use("/uploads", express.static("uploads"))

//Routes
app.use("/song", songRouter)


app.get("/", (req, res) => {
    res.send("Hello World")
})


//Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(8800, () => {
            console.log("App run on http://localhost:8800")
        })
    })
    .catch((err) => console.error("DB connection Error: ", err))