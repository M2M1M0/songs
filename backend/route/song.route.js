import express from "express"
import {
    createSong, getSongs, getSong, updateSong, deleteSong,
    getSongsByCat,
    totalSongs, countBy,
    eachGenre, eachAlbum, eachArtist, songsAndAlbum
} from "../controller/song.controller.js"
import upload from "../middleware/upload.js"
const router = express.Router()

router.post("/create-song", upload.single("audio"), createSong)
router.get("/", getSongs)
router.get("/:id", getSong)
router.put("/:id", updateSong)
router.delete("/:id", deleteSong)

router.get("/getByCat/:catName", getSongsByCat)


//-------------------------Stats------------------------------//
router.get("/totals/count", totalSongs)
router.get("/total/:catName", countBy)

router.get("/songs/eachArtist", eachArtist)
router.get("/songs/eachAlbum", eachAlbum)
router.get("/songs/eachGenre", eachGenre)
router.get("/songs/songs-Album", songsAndAlbum)


export default router