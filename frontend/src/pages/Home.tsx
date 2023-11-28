import { useEffect, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import axios from "axios"
import { useNavigate } from "react-router-dom";

type SongState = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  cover: string;
  url: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate()
  const [songs, setSongs] = useState<SongState[]>([])

  useEffect(() => {
    const fetchSong = async () => {
      const result: any = await axios.get("http://localhost:8800/song")
      setSongs(result.data)
    }
    fetchSong()
  }, [])

  const [url, setMusicURL] = useState("")
  const [id, setID] = useState("")
  const playMusic = (url: string, id: string) => {
    setMusicURL(url)
    setID(id)
  }

  const handleUpdate = async (id: string) => {
    navigate(`/update-song/${id}`)
  }
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8800/song/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex max-w-[900px] min-w-[900px]">
      <div className="flex flex-col gap-3 w-4/5">
        <h2 className="text-2xl p-8">Discover</h2>
        <div className="flex flex-wrap gap-3 gap-y-8 px-5">
          {songs && songs.map((song) => (
            <div key={song._id}
              className="flex flex-col gap-1 bg-gray-200 p-2">
              <div onClick={() => playMusic(song.url, song._id)}>
                <img src={`${song.cover}`} alt="" className="w-[130px] h-[90px] cursor-pointer bg-slate-300 object-cover" />
              </div>
              <div className="flex flex-col px-1 ">
                <h2 className="text-sm text-slate-700">{song.title}</h2>
                <h2 className="text-xs text-slate-500">{song.artist}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 w-1/5">
        <ReactAudioPlayer
          src={`http://localhost:8800/uploads/${url}`}
          controls
          autoPlay
        />
        <div className="flex justify-end w-full gap-4">
          <button className="text-xs" onClick={() => handleUpdate(id)}>
            update
          </button>
          <button className="text-xs" onClick={() => handleDelete(id)}>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home