import { Input, Button } from "@material-tailwind/react"
import { ChangeEvent, useState } from "react"
import axios from "axios"

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

  const [song, setSong] = useState(initial)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({...song, [e.target.name]: e.target.value})
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
    
    console.log(formData, "adta") 
    await axios.post("http://localhost:8800/song/create-song", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }


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
          
        <Input onChange={handleFile} type="file" name="music" value={""}
          variant="standard" label="Genre" crossOrigin="anonymous" />
          <div className="mt-8">
            <Button type="submit">Submit</Button>
          </div>
      </form>
    </div>
  )
}

export default AddSong