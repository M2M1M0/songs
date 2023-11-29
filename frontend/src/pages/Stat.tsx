import Totals from "../components/stat/Totals"
import Each from "../components/stat/Each"
import Artist from "../components/stat/Artist"

const Stat = () => {
  return (
    <div className="w-full h-full bg-[#d7d2d2] pt-6 pl-3">
      <h2 className="flex  text-2xl text-red-600 font-semibold">
        Statistics
      </h2>
      <div className="flex flex-col max-w-[800px]  gap-5 p-2">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Total */}
          <Totals />

          <div className="flex flex-col gap-5">
            {/* Each Values */}
            <Each/>

            <div className="flex">
              {/* Artist have */}
              <Artist/>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stat