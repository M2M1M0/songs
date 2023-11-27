import mongoose from "mongoose";


const songSchema = new mongoose.Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    album: {
        type: String
    },
    genere: {
        type: String
    },
    url: {
        type: String
    }
    
}, { timestamps: true })

const Song = mongoose.model("Song", songSchema)

export default Song