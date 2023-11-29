import { useEffect, useState } from "react"
import axios from "axios"
import PlayStation from "../components/PlayStation";
import Discover from "../components/Discover";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../redux/songSlice";
import { BASE_URL } from "../baseurl";

const Home = () => {
  const { songs } = useSelector((state: any) => state?.song ?? {})
  const dispatch = useDispatch()
  const [id, setID] = useState("")


  const [url, setMusicURL] = useState("")
  const playMusic = (url: string, id: string) => {
    setMusicURL(url)
    setID(id)
  }

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get(`${BASE_URL}/song`)
      dispatch(setSongs(response.data))
      // console.log(response.data)
    }
    fetchSongs()
  }, [])
  


  return (
    <div className="flex flex-col w-full relative">
      <div className="flex gap-3 h-screen w-full ">
      <div className="md:ml-3 max-h-[500px] overflow-y-auto">
          <h2 className="text-2xl p-8 text-white">All Songs</h2>
          <div className="flex flex-wrap gap-3 px-5  md:w-[700px]">
            {songs !== null && songs.length > 0 && songs?.map((song: any) => (
              <div key={song._id}
                className="flex flex-col gap-1 md:w-[140px] w-[100px] h-fit bg-[#1a1159] shadow-xl rounded-t-xl p-2">
                <div onClick={() => playMusic(song.url, song._id)}>
                  <img src={`${song.cover}`} alt="" className="md:w-[130px] w-[95px] h-[70px] md:h-[90px] cursor-pointer rounded-md  object-cover" />
                </div>
                <div className="flex flex-col px-1 gap-1 w-full">
                  <h2 className="text-sm text-white truncate">{song.title}</h2>
                  <h2 className="text-xs text-gray-500 truncate">{song.artist}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex overflow-hidden max-h-[550px]">
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