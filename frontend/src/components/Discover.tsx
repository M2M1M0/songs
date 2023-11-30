import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../baseurl"


const Discover = () => {
  const { catName } = useParams()
  const [cat, setCat] = useState([])
  console.log(catName)

  useEffect(() => {
    const fetchSongByCat = async () => {
      if (catName) {
        const response = await axios.get(`${BASE_URL}/song/getByCat/${catName}`)
        setCat(response.data)
        console.log(response.data)
      }
    }
    fetchSongByCat()
  }, [catName])


  return (
    <div className="mt-10 flex flex-col gap-6 w-full">
      <h2 className="capitalize text-xl text-gray-200 font semibold">{catName && catName + "s List"}</h2>
      {catName &&
        <div className="flex flex-col gap-3 text-white">
          {cat && cat.map((name, index) => (
            <div key={index} className="flex gap-3">
              <span>{index + 1}.</span>
              <div className="flex gap-2 items-center">
                <h4>{name}</h4>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Discover