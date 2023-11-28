import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='h-screen w-full bg-brown-900 relative'>
      <div className='flex flex-col gap-6 '>

        <div className='flex flex-col'>
          <div className='flex flex-col items-center justify-center p-4 gap-1'>
            <img src="" alt="" className="w-20 h-20" />
          </div>

          <div className='flex flex-col text-white py-8'>
            <Link to={"/"} className="w-full px-5 hover:bg-brown-800 p-2 cursor-pointer  font-semibold">
              Songs
            </Link>
            <div className='w-full border-[1px] border-brown-800' />
            <h2 className="w-full px-5 hover:bg-brown-800 p-2 cursor-pointer  font-semibold">
              Album
            </h2>
            <div className='w-full border-[1px] border-brown-800' />
            <h2 className="w-full px-5 hover:bg-brown-800 p-2 cursor-pointer  font-semibold">
              Artist
            </h2>
            <div className='w-full border-[1px] border-brown-800' />
            <h2 className="w-full px-5 hover:bg-brown-800 p-2 cursor-pointer  font-semibold">
              Genre
            </h2>
            <div className='w-full px-5 border-[1px] border-brown-800' />
          </div>

        
        </div>
          <div className="absolute text-white bottom-5 right-5 p-3">
            <Link to={"/add-song"}>
              Add
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Sidebar