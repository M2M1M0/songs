import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Specify the destination to store the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `audio-${Date.now()}.${file.originalname}`) // Specify how the uploaded files should be named
    }
})
const upload = multer({ storage: storage })

export default upload