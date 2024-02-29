import React from "react";
import { Carousel } from "flowbite-react";

//react Icons
import { FaCircleArrowRight } from "react-icons/fa6";


const Home = () => {
  const Banner = "/assets/Other/Banner.png";
  const Banner2 = "/assets/Other/Banner2.png";
  const Banner3 = "/assets/Other/Banner3.png";
  const Banner4 = "/assets/Other/Banner4.png";
  return (
        <div className='bg-neutralSilver' id='home'>
            <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen rounded-full'>
                <Carousel className='w-full mx-auto'>
                <div className=" my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 ">
                        <div>
                            <img src={Banner} alt="" />
                        </div>
                        {/* Text */}
                        <div className='md:w-1/2'>
                            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'><span className='text-orange-500'>Sen'py </span>production presents welcome to <span className='text-brandPrimary'>Adventura 360</span></h1>
                            <p className='text-neutralGrey text-base mb-8'>An Undergraduate thesis of a Bachelor of Science in Computer Science </p>
                            <button className='bg-brandPrimary text-white py-2 px-7 transition-all duration-300 rounded-full h-12 hover:bg-lime-700 items-center justify-between flex gap-2 hover:-translate-y-4'><FaCircleArrowRight className='w-6 h-6 '/>Adventura360</button>
                        </div>
                    </div>
                    <div className=" my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 ">
                        <div>
                            <img src={Banner2} alt="" />
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src={Banner3} alt="" />
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 ">
                        <div>
                            <img src={Banner4} alt="" />
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
  )
}


export default Home;
