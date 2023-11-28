import Song from "../model/songs.model.js"


// ================================ create song ==================================//
export const createSong = async (req, res) => {

    // console.log(req.file)
    const { title, artist, album, genre } = req.body
    const url = req.file?.filename
    try {
        const saveSong = await Song.create({
            title, artist, album, genre, url
        })
        res.status(201).json(saveSong)
    } catch (error) {
        throw new Error(error)
    }
}

// ================================ get All songs ==================================//
export const getSongs = async (req, res) => {
    try {
        const savedSong = await Song.find()
        res.status(200).json(savedSong)
    } catch (error) {
        throw new Error(error)
    }
}

// ================================ get single song ==================================//
export const getSong = async (req, res) => {
    const { id } = req.params
    try {
        const getSong = await Song.findById({ _id: id })
        res.status(200).json(getSong)
    } catch (error) {
        throw new Error(error)
    }
}

// ================================ update a song ==================================//
export const updateSong = async (req, res) => {
    const { id } = req.params
    try {
        const updateSong = await Song.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateSong)
    } catch (error) {
        throw new Error(error)
    }
}

// ================================ delete song ==================================//
export const deleteSong = async (req, res) => {
    const { id } = req.params
    try {
        const getSong = await Song.findByIdAndDelete({ _id: id })
        res.status(200).json(getSong)
    } catch (error) {
        throw new Error(error)
    }
}
