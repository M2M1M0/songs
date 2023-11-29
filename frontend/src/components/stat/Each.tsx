import { Card } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../baseurl"


type SongState = {
  _id: string;
  count: string;
}

const Each = () => {
  const [artist, setArtists] = useState<SongState[]>([])
  const [album, setAlbums] = useState<SongState[]>([])
  const [genre, setGenres] = useState<SongState[]>([])

  useEffect(() => {
    const artists = async () => {
      const result = await axios.get(`${BASE_URL}/song/songs/eachArtist`)
      setArtists(result.data)
      albums()
    }

    const albums = async () => {
      const result = await axios.get(`${BASE_URL}/song/songs/eachAlbum`)
      setAlbums(result.data)
      genres()
    }

    const genres = async () => {
      const result = await axios.get(`${BASE_URL}/song/songs/eachGenre`)
      setGenres(result.data)
    }

    artists()
  }, [])

  return (
    <div className="flex flex-col md:flex-row  gap-3">
      {/* Each Genre */}
      <Card className="flex flex-col gap-3 w-[250px] md:w-[260px] overflow-x-auto h-fit px-6 pt-3 pb-8  border-r-4 rounded-md border-b-[1px] border-cyan-500">
        <h2 className="flex text-teal-500 underline font-bold"> Genre</h2>
        <div className="flex flex-col gap-1 items-center ">
          <div className="grid grid-cols-2 w-[200px] border-b-[3px] border-teal-500">
            <span className="font-semibold text-md text-blue-gray-400 ">Name</span>
            <span className="font-semibold text-md flex justify-center text-blue-gray-400">Songs</span>
          </div>
          {genre && genre.map((genre, index) => (
            <div key={index} className="grid grid-cols-2 w-[200px] border-b-[1px] border-gray-200">
              <p className="text-sm">{genre._id}</p>
              <p className="text-sm flex justify-center">{genre.count}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Each Artist */}
      <Card className="flex flex-col gap-3 w-[250px] md:w-[260px] overflow-x-auto h-fit px-6 pt-3 pb-8  border-r-4 rounded-md border-b-[1px] border-cyan-500">
        <h2 className="flex text-teal-500 underline font-bold">Artist</h2>
        <div className="flex flex-col gap-1 items-center ">
          <div className="grid grid-cols-2 w-[200px] border-b-[3px] border-teal-500">
            <span className="font-semibold text-md text-blue-gray-400">Name</span>
            <span className="font-semibold text-md flex justify-center text-blue-gray-400">Songs</span>
          </div>
          {artist && artist.map((artist, index) => (
            <div key={index} className="grid grid-cols-2 w-[200px] border-b-[1px] border-gray-200">
              <p className="text-sm truncate">{artist._id}</p>
              <p className="text-sm flex justify-center">{artist.count}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Each Album */}
      <Card className="flex flex-col gap-3 w-[250px] md:w-[260px] overflow-x-auto h-fit px-6 pt-3 pb-8  border-r-4 rounded-md border-b-[1px] border-cyan-500">
        <h2 className="flex text-teal-500 underline font-bold"> Album</h2>
        <div className="flex flex-col gap-1 items-center ">
          <div className="grid grid-cols-2 w-[200px] border-b-[3px] border-teal-500">
            <span className="font-semibold text-md text-blue-gray-400">Name</span>
            <span className="font-semibold text-md flex justify-center text-blue-gray-400">Songs</span>
          </div>
          {album && album.map((album, index) => (
            <div key={index} className="grid grid-cols-2 w-[200px] border-b-[1px] border-gray-200">
              <p className="text-sm">{album._id}</p>
              <p className="text-sm flex justify-center">{album.count}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}

export default Each