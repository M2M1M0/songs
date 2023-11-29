import { Card } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"



const Totals = () => {
    const [totalSongs, setTotalSongs] = useState<number>(0)
    const [totalArtist, setTotalArtist] = useState<number>(0)
    const [totalAlbum, setTotalAlbum] = useState<number>(0)
    const [totalGenre, setTotalGenre] = useState<number>(0)

    useEffect(() => {
        const toralSongs = async () => {
            const result = await axios.get("http://localhost:8800/song/totals/count")
            setTotalSongs(result.data)
            toralArtist()
        }

        const toralArtist = async () => {
            const result = await axios.get("http://localhost:8800/song/total/artist")
            setTotalArtist(result.data)
            toralAlbum()
        }

        const toralAlbum = async () => {
            const result = await axios.get("http://localhost:8800/song/total/album")
            setTotalAlbum(result.data)
            toralGenre()
        }

        const toralGenre = async () => {
            const result = await axios.get("http://localhost:8800/song/total/genre")
            setTotalGenre(result.data)
        }

        toralSongs()
    }, [])

    return (
        <div className="flex flex-col gap-3 ">
            <Card className="flex flex-row justify-between items-center p-5 rounded-lg w-[250px] md:w-[200px]">
                <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-cyan-500 border-4 rounded-full" />
                    <h2 className="text-md font-sans">Total Songs</h2>
                </div>
                <div>
                    <h2 className="text-gray-600">{totalSongs}</h2>
                </div>
            </Card>

            <Card className="flex flex-row justify-between items-center p-5 rounded-lg w-[250px] md:w-[200px]">
                <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-cyan-500 border-4 rounded-full" />
                    <h2 className="text-md font-sans">Artists</h2>
                </div>
                <div>
                    <h2 className="text-gray-600">{totalArtist}</h2>
                </div>
            </Card>

            <Card className="flex flex-row justify-between items-center p-5 rounded-lg w-[250px] md:w-[200px]">
                <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-cyan-500 border-4 rounded-full" />
                    <h2 className="text-md font-sans">Albums</h2>
                </div>
                <div>
                    <h2 className="text-gray-600">{totalAlbum}</h2>
                </div>
            </Card>

            <Card className="flex flex-row justify-between items-center p-5 rounded-lg w-[250px] md:w-[200px]">
                <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-cyan-500 border-4 rounded-full" />
                    <h2 className="text-md font-sans">Genre</h2>
                </div>
                <div>
                    <h2 className="text-gray-600">{totalGenre}</h2>
                </div>
            </Card>

        </div>
    )
}

export default Totals