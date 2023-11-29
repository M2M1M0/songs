import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import mongoose from "mongoose"
// import upload from "./middleware/upload.js"
import songRouter from "./route/song.route.js"

import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Songs', // The folder in your Cloudinary account where the audio files will be stored
        resource_type: 'auto',
        allowed_formats: ['mp3', 'wav', "m4a"], // Specify the audio formats you want to allow
    },
});

const upload = multer({ storage: storage });


//Init Express
const app = express()

//MiddleWare
app.use(express.json())
app.use(cors())

// static foldr
app.use("/uploads", express.static("uploads"))

//Routes
app.use("/song", upload.single("audio"), songRouter)


app.get("/", (req, res) => {
    res.send("Hello World")
})


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Set the response status code
    res.status(err.status || 500);
  
    // Send an error response
    res.send({
      error: {
        message: err.message || 'Internal Server Error'
      }
    });
  });


//Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(8800, () => {
            console.log("App run on http://localhost:8800")
        })
    })
    .catch((err) => console.error("DB connection Error: ", err))