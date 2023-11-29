import Song from "../model/songs.model.js"


// ================================ create song ==================================//
export const createSong = async (req, res) => {

    const { title, artist, album, genre } = req.body
    const url = req.file?.path
    // console.log(req.file)
    
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
    const { catName } = req.params
    try {
        let savedSong
        if (catName) {
            // console.log(catName)
            savedSong = await Song.find({ catName })
            console.log(savedSong)
        } else {
            savedSong = await Song.find()
        }
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
        await Song.findByIdAndDelete({ _id: id })
        res.status(200).json("delete success")
    } catch (error) {
        throw new Error(error)
    }
}

//================================= Get By Catagory  =========================================//
export const getSongsByCat = async (req, res) => {
    const { catName } = req.params
    // console.log(catName)
    try {
        let getSongs

        switch (catName) {
            case "artist":
                getSongs = await Song.distinct("artist")
                break
            case "album":
                getSongs = await Song.distinct("album")
                break
            case "genre":
                getSongs = await Song.distinct("genre")
                break
            default:
                getSongs = await Song.find()
        }
        res.status(200).json(getSongs);
    } catch (error) {
        throw new Error(error);
    }
}



// ================================= stat =======================================//
export const totalSongs = async (req, res) => {
    try {
        const result = (await Song.find()).length
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error)
    }
}
export const countBy = async (req, res) => {
    const { catName } = req.params
    // console.log(catName)
    let songs
    switch (catName) {
        case "artist":
            songs = (await Song.distinct("artist")).length
            break
        case "album":
            songs = (await Song.distinct("album")).length
            break
        case "genre":
            songs = (await Song.distinct("genre")).length
            break
        default:
            songs = 0
    }
    res.status(200).json(songs);

}

//songs in every genre
export const eachGenre = async (req, res) => {
    try {
        const response = await Song.aggregate([
            {
                $group: {
                    _id: "$genre",
                    count: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(response)
    } catch (error) {
        throw new Error(error)
    }
}
//songs in each album
export const eachAlbum = async (req, res) => {
    try {
        const result = await Song.aggregate([
            {
                $group: {
                    _id: "$album",
                    count: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error)
    }
}
//songs in each Artist
export const eachArtist = async (req, res) => {
    try {
        const response = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    count: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(response)
    } catch (error) {
        throw new Error(error)
    }
}

export const songsAndAlbum = async (req, res) => {
    try {
        const response = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    totalSongs: { $sum: 1 },
                    uniqueAlbums: { $addToSet: "$album" }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalSongs: 1,
                    totalAlbums: { $size: "$uniqueAlbums" }
                }
            }
        ])

        res.status(200).json(response)
    } catch (error) {

    }
}
