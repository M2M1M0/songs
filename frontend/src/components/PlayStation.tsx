import axios from "axios"
import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player"
import { useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";

type songState = {
  url: string;
  id: string;
}
const PlayStation = ({ url, id }: songState) => {
  const navigate = useNavigate()

  const handleUpdate = async (id: string) => {
    navigate(`/update-song/${id}`)
  }
  const [hidden, setHidden] = useState(false)
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8800/song/${id}`)
      setHidden(true)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const [song, setSong] = useState("")
  useEffect(() => {
    const fetchSong = async () => {
      const result = await axios.get(`http://localhost:8800/song/${id}`)
      setSong(result.data.title)
    }
    fetchSong()
  }, [id])

  return (
    <div className="px-5 bg-transparent py-2 w-2/3 gap-3 flex justify-around items-center">
      <div>
        {id &&
          <div className={`${hidden ? "hidden" : "flex"} justify-end w-full gap-8 bg-white p-3 rounded-3xl px-5`}>
            <p className="text-lg whitespace-nowrap">{song}</p>
            <div className="flex gap-2">
              <Tooltip content="Edit" placement="top" animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }, }}>
                <button className="text-lg text-orange-500" onClick={() => handleUpdate(id)}>
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip content="Delete" placement="top" animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }, }}>
                <button className="text-lg text-pink-500" onClick={() => handleDelete(id)}>
                  <MdDelete />
                </button>
              </Tooltip>
            </div>
          </div>
        }
      </div>
      <div>
        <ReactAudioPlayer
          src={`http://localhost:8800/uploads/${url}`}
          controls
          autoPlay
        />
      </div>

    </div >
  )
}

export default PlayStation