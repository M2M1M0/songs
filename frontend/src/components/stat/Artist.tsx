import { Card } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../baseurl"

type SongState = {
    _id: string;
    totalSongs: string;
    totalAlbums: string;
}

const Artist = () => {
    const [artist, setArtists] = useState<SongState[]>([])


    useEffect(() => {
        const artists = async () => {
            const result = await axios.get(`${BASE_URL}/song/songs/songs-Album`)
            setArtists(result.data)
            // console.log(result.data)
        }
        artists()
    }, [])

    return (
        <div className="w-full overflow-x-auto">
            <Card className="p-5 w-[500px]  flex flex-col gap-3">
                <div className="grid grid-cols-4 w-full border-b-2 pb-1 border-cyan-500">
                    <h2 className="text-cyan-900 flex justify-center">#</h2>
                    <h2 className="text-cyan-900 ">Artist</h2>
                    <h2 className="text-cyan-900 flex justify-center">Songs</h2>
                    <h2 className="text-cyan-900 flex justify-center ">Albums</h2>
                </div>
                {artist && artist.map((artist, index) => (
                    <div key={index}
                        className="grid grid-cols-4 w-full border-b-[1px] border-gray-200">
                        <p className="text-sm flex justify-center">{index + 1}</p>
                        <p className="text-sm  pr-2 truncate">{artist._id}</p>
                        <p className="text-sm flex justify-center">{artist.totalSongs}</p>
                        <p className="text-sm flex justify-center">{artist.totalAlbums}</p>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default Artist