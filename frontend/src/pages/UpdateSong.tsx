import { Input, Button } from "@material-tailwind/react"
import { ChangeEvent, useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSongSuccess, updateSongFailer } from "../redux/songSlice";

type SongState = {
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
}

const initial: SongState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
}
const UpdateSong = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { error, loading } = useSelector((state: any) => state?.song ?? {})

  const [song, setSong] = useState(initial)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await axios.put(`http://localhost:8800/song/${id}`, song)
      dispatch(updateSongSuccess(result.data))

    } catch (error: any) {
      console.log(error)
      dispatch(updateSongFailer(error.message))

    }
  }

  useEffect(() => {
    const fetchSong = async () => {
      const result = await axios.get(`http://localhost:8800/song/${id}`)
      setSong(result.data)
    }
    fetchSong()
  }, [])


  return (
    <div className="flex flex-col p-5 py-12 md:p-12 md:ml-8">
      <h2 className="text-3xl text-white font-bold">Update a Song</h2>
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-5 my-8 md:w-[350px] mt-16" >
        {error && <p className="p-3 text-red-500 bg-red-100 text-sm">{error}</p>}
        <Input onChange={handleChange} name="title" value={song?.title}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Title" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="artist" value={song?.artist}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Artist" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="album" value={song?.album}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Album" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="genre" value={song?.genre}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Genre" crossOrigin="anonymous" />
        <div className="mt-8">
          <Button type="submit" className="bg-teal-700 hover:opacity-80" disabled={loading}>
            {loading ? "Loading.." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSong