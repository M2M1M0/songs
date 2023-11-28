import express from "express"
import { createSong, getSongs, getSong, updateSong, deleteSong } from "../controller/song.controller.js"
import upload from "../middleware/upload.js"
const router = express.Router()

router.post("/create-song", upload.single("audio"), createSong)
router.get("/", getSongs)
router.get("/:id", getSong)
router.put("/:id", updateSong)
router.delete("/:id", deleteSong)


export default router