import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/HighlightText'
import CTAButton from "../components/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/CodeBlocks"

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

      <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
      </div>

      <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
      </div>

      <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}> 
              Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}> 
              Book a Demo
          </CTAButton>
      </div>

      <div className='mx-3 my-12 shadow-blue-200'>
          <video
          muted
          loop
          autoPlay
          >
          <source  src={Banner} type="video/mp4" />
          </video>
      </div>
      <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

      </div>

      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                    </div>

            </div>

            </div>

        </div>



)
}

export default Home


