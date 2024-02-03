import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
    text-white justify-between'>

      <Link to={"/signup"}>
          <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-95 w-fit'>
              <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 group-hover:bg-richblack-900'>
                  <p>Become an Instructor</p>
                  <FaArrowRight />
              </div>
          </div>

      </Link>
    </div>
</div>

  )
}

export default Home
