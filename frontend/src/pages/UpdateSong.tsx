import { Input, Button } from "@material-tailwind/react"
import { ChangeEvent, useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

type SongState = {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const initial: SongState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
}
const UpdateSong = () => {
  const { id } = useParams()

  const [song, setSong] = useState(initial)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await axios.put(`http://localhost:8800/song/${id}`, song)
      setSong(result.data)
    } catch (error) {
      console.log(error)
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
    <div className="flex flex-col p-12">
      <h2>Add a Song</h2>
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-5 my-8 w-[350px]" >
        <Input onChange={handleChange} name="title" value={song.title}
          variant="standard" label="Title" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="artist" value={song.artist}
          variant="standard" label="Artist" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="album" value={song.album}
          variant="standard" label="Album" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="genre" value={song.genre}
          variant="standard" label="Genre" crossOrigin="anonymous" />

        <div className="mt-8">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSong