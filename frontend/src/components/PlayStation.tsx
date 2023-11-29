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
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8800/song/${id}`)
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
    <div className="px-5 bg-transparent max-w-[700px] py-2 gap-3 flex flex-col-reverse md:flex-row justify-start md:justify-center items-center">
      <div className="">
        {id &&
          <div className={`flex justify-end w-full gap-8 bg-white p-3 rounded-3xl px-5`}>
            <p className="text-lg whitespace-nowrap">{song}</p>
            <form onSubmit={() => handleDelete(id)} className="flex gap-2">
              <Tooltip content="Edit" placement="top" animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }, }}>
                <button type="button" className="text-lg text-orange-500" onClick={() => handleUpdate(id)}>
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip content="Delete" placement="top" animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 }, }}>
                <button type="submit" className="text-lg text-pink-500" >
                  <MdDelete />
                </button>
              </Tooltip>
            </form>
          </div>
        }
      </div>
      <div className="w-full">
        <ReactAudioPlayer className="max-w-[230px] md:w-full"
          src={`http://localhost:8800/uploads/${url}`}
          controls
          autoPlay
        />
      </div>
    </div >
  )
}

export default PlayStation