import { useEffect, useState } from "react"
import axios from "axios"
import PlayStation from "../components/PlayStation";
import Discover from "../components/Discover";
import { useParams } from "react-router-dom";

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
  const { catName } = useParams()
  const [id, setID] = useState("")
  const [songs, setSongs] = useState<SongState[]>([])

  useEffect(() => {
    const fetchSong = async () => {
      const result: any = await axios.get("http://localhost:8800/song")
      setSongs(result.data)
    }
    fetchSong()
  }, [catName])

  const [url, setMusicURL] = useState("")
  const playMusic = (url: string, id: string) => {
    setMusicURL(url)
    setID(id)
  }


  return (
    <div className="flex flex-col h-screen w-full relative">
      <div className="flex gap-3 h-full">
        <div className="ml-3">
          <h2 className="text-2xl p-8 text-white">All Songs</h2>
          <div className="flex flex-wrap gap-3 gap-y-8 px-5 overflow-y-auto w-[700px] h-[400px]">
            {songs && songs.map((song) => (
              <div key={song._id}
                className="flex flex-col gap-1 w-fit h-fit bg-[#1a1159] shadow-xl rounded-t-xl p-2">
                <div onClick={() => playMusic(song.url, song._id)}>
                  <img src={`${song.cover}`} alt="" className="w-[130px] h-[90px] cursor-pointer rounded-md bg-slate-300 object-cover" />
                </div>
                <div className="flex flex-col px-1 gap-1 ">
                  <h2 className="text-sm text-white">{song.title}</h2>
                  <h2 className="text-xs text-gray-500">{song.artist}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Discover />
        </div>
      </div>
      <div className="w-full absolute bottom-0">
        <PlayStation url={url} id={id} />
      </div>
    </div>
  )
}

export default Home