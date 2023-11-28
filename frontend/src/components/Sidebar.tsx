
import { Link } from "react-router-dom"

const Sidebar = () => {

  return (
    <div className=" bg-cover bg-[url('https://th.bing.com/th/id/R.d468cb87649a0237036e8f34ef93c07a?rik=%2fhEQlhKQ9XMmjw&pid=ImgRaw&r=0')] h-screen w-full bg-transparent relative border-r-[1.2px] border-[#292347]">
      <div className='flex flex-col gap-6  '>

        <div className='flex flex-col'>
          {/* <div className='flex flex-col items-center justify-center p-4 gap-1'>
            <img src=""
              alt="" className="w-full h-20  " />
          </div> */}

          <div className='flex flex-col text-[#edc5c5] font-normal py-8 mt-16'>
            <Link to={"/"} className="w-full px-8  hover:text-white p-3 cursor-pointer  font-semibold">
              Songs
            </Link>
            <Link to={"/album"} className="w-full px-8  hover:text-white p-3 cursor-pointer  font-semibold">
              Album
            </Link>
            <Link to={"/artist"} className="w-full px-8  hover:text-white p-3 cursor-pointer  font-semibold">
              Artist
            </Link>
            <Link to={"/genre"} className="w-full px-8  hover:text-white p-3 cursor-pointer  font-semibold">
              Genre
            </Link>
          </div>


        </div>
        <Link to={"/add-song"}>
          <div className="absolute text-white hover:bg-[#272c30] rounded-full bottom-8 right-6 p-2">
            Add
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar