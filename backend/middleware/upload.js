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

export default upload