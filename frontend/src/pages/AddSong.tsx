import { Input, Button } from "@material-tailwind/react"
import { ChangeEvent, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { start, createSongSuccess, createSongFailer } from "../redux/songSlice"
import { useDispatch, useSelector } from "react-redux";

type SongState = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  audio?: File; // Include the audio property as optional
}

const initial: SongState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
}
const AddSong = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, loading } = useSelector((state: any) => state?.song ?? {})


  const [song, setSong] = useState(initial)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value })
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const audioFile = e.target.files[0];

      setSong({ ...song, audio: audioFile });
    }
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("title", song.title)
    formData.append("artist", song.artist)
    formData.append("album", song.album)
    formData.append("genre", song.genre)
    if (song.audio) {
      formData.append("audio", song.audio);
    }

    try {
      dispatch(start())
      const result = await axios.post("http://localhost:8800/song/create-song", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch(createSongSuccess(result.data))
      navigate("/")
    } catch (error: any) {
      console.log(error, "errrrrrr")
      dispatch(createSongFailer(error.message))

    } finally {
      setSong(initial)
    }
  }


  return (
    <div className="flex flex-col p-5 py-12 md:p-12">
      <h2 className="text-3xl text-white font-bold">Add a Song</h2>
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-5 my-8 md:w-[350px]" >
          {error && <p className="p-3 text-red-500 bg-red-100 text-sm">{error}</p>}
        <Input onChange={handleChange} name="title" value={song.title}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px", paddingLeft: "5px" }}
          variant="standard" label="Title" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="artist" value={song.artist}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Artist" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="album" value={song.album}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Album" crossOrigin="anonymous" />
        <Input onChange={handleChange} name="genre" value={song.genre}
          style={{ color: "#fff", fontWeight: 500, fontSize: "16px" }}
          variant="standard" label="Genre" crossOrigin="anonymous" />

        <Input onChange={handleFile} type="file" name="music" value={""}
          variant="standard" label="Genre" crossOrigin="anonymous" />
        <div className="mt-8 flex md:justify-end">
          <Button disabled={loading}
            type="submit" className="bg-teal-700 hover:opacity-80">
            {loading ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddSong