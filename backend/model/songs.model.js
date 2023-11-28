import mongoose from "mongoose";


const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    album:String,
    genre:String,
    url:String,
    cover:{
        type: String,
        default: "https://th.bing.com/th/id/OIP.PNDFPBXSfJ9LttZQalbzTgHaEK?rs=1&pid=ImgDetMain"
    },
   
}, { timestamps: true })

const Song = mongoose.model("Song", songSchema)

export default Song