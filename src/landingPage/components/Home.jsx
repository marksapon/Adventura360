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
    <div className="bg-neutralSilver" id="home">
      <div className="mx-auto h-screen min-h-screen max-w-screen-2xl rounded-full px-4 lg:px-14">
        <Carousel className="mx-auto w-full" pauseOnHover>
          <div className=" my-28 flex flex-col items-center justify-between gap-12 py-12 md:my-8 md:flex-row-reverse ">
            <div>
              <img src={Banner} alt="" />
            </div>
            {/* Text */}
            <div className="md:w-1/2">
              <h1 className="mb-4 text-5xl font-semibold leading-snug text-gray-700 md:w-3/4">
                <span className="text-orange-500">Sen'py </span>production
                presents welcome to{" "}
                <span className="text-green-600">Adventura 360</span>
              </h1>
              <p className="mb-8 text-base text-neutral-600">
                An Undergraduate thesis of a Bachelor of Science in Computer
                Science{" "}
              </p>
              <button className="flex h-12 items-center justify-between gap-2 rounded-full bg-green-600 px-7 py-2 text-white transition-all duration-300 hover:-translate-y-4 hover:bg-lime-700">
                <FaCircleArrowRight className="h-6 w-6 " />
                Adventura360
              </button>
            </div>
          </div>
          <div className=" my-28 flex flex-col items-center justify-between gap-12 py-12 md:my-8 md:flex-row-reverse ">
            <div>
              <img src={Banner2} alt="" />
            </div>
          </div>
          <div className="my-28 flex flex-col items-center justify-between gap-12 py-12 md:my-8 md:flex-row-reverse">
            <div>
              <img src={Banner3} alt="" />
            </div>
          </div>
          <div className="my-28 flex flex-col items-center justify-between gap-12 py-12 md:my-8 md:flex-row-reverse ">
            <div>
              <img src={Banner4} alt="" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
