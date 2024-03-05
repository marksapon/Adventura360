import React from "react";
// import members from '../assets/Icon/members.png'

const About = () => {
  const AboutImg = "/assets/Icon/pana.png";

  return (
    <div className="">
      {/* About Text */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8" id="about">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <img src={AboutImg} alt="something went wrong" />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl text-gray-700 font-semibold mb-4 md:w-4/5">
              Place holder lng to guys pati mga pic kayo na bahala kung ano
              gusto nyo ilagay
            </h2>
            <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
              Virtual campus tours have become increasingly popular in recent
              years, providing prospective students with a glimpse into the
              academic and social life of universities. In this thesis,
              ADVENTURA, a 360-degree virtual campus map designed to provide an
              immersive experience for prospective students, faculty,
              accreditors, and students at the Cavite State University, is
              presented.
            </p>
            <button className=" bg-green-600 text-white py-2 px-7 transition-all duration-300 rounded h-12 hover:bg-lime-700 items-center justify-between flex gap-2 hover:-translate-y-4">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-slate-200 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-gray-700 font-semibold mb-4 md:w-4/5">
              Creating a clearer <br></br>
              <span className="text-green-600 2xl ">
                picture of the University
              </span>
            </h2>
            <p>We reached here with our hard work and dedication</p>
          </div>

          {/* Stats */}
          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:item-center justify-around gap-12">
            <div className="space-y-8">
              <div className="flex item-center gap-4">
                <img src="/assets/Icon/mems.png" alt="" />
                <div>
                  <h4 className="text-2xl text-gray-700 font-semibold">
                    4 handsome Boys
                  </h4>
                  <p className="">Members</p>
                </div>
              </div>
              <div className="flex item-center gap-4">
                <img src="/assets/Icon/project.png" alt="" />
                <div>
                  <h4 className="text-2xl text-gray-700 font-semibold">2</h4>
                  <p className="">Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex item-center gap-4">
                <img src="/assets/Icon/partner1.png" alt="" />
                <div>
                  <h4 className="text-2xl text-gray-700 font-semibold">2</h4>
                  <p className="">Partnership</p>
                </div>
              </div>
              <div className="flex item-center gap-4">
                <img src="assets/Icon/school1.png" alt="" />
                <div>
                  <h4 className="text-2xl text-gray-700 font-semibold">CvSU</h4>
                  <p className="">School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
