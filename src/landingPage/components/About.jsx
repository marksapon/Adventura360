import React from "react";
// import members from '../assets/Icon/members.png'

const About = () => {
  const AboutImg = "/assets/Icon/pana.png";

  return (
    <div className="">
      {/* About Text */}
      <div className="mx-auto my-8 max-w-screen-2xl px-4 lg:px-14" id="about">
        <div className="mx-auto flex flex-col items-center justify-between gap-12 md:w-11/12 md:flex-row">
          <div>
            <img src={AboutImg} alt="something went wrong" />
          </div>
          <div className="mx-auto md:w-3/5">
            <h2 className="mb-4 text-4xl font-semibold text-gray-700 md:w-4/5">
              Place holder lng to guys pati mga pic kayo na bahala kung ano
              gusto nyo ilagay
            </h2>
            <p className="mb-8 text-sm text-neutral-600 md:w-3/4">
              Virtual campus tours have become increasingly popular in recent
              years, providing prospective students with a glimpse into the
              academic and social life of universities. In this thesis,
              ADVENTURA, a 360-degree virtual campus map designed to provide an
              immersive experience for prospective students, faculty,
              accreditors, and students at the Cavite State University, is
              presented.
            </p>
            <button className=" flex h-12 items-center justify-between gap-2 rounded bg-green-600 px-7 py-2 text-white transition-all duration-300 hover:-translate-y-4 hover:bg-lime-700">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="mx-auto max-w-screen-2xl bg-slate-200 px-4 py-16 lg:px-14">
        <div className="flex flex-col items-center justify-between md:flex-row ">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-4xl font-semibold text-gray-700 md:w-4/5">
              Creating a clearer <br></br>
              <span className="2xl text-green-600 ">
                picture of the University
              </span>
            </h2>
            <p>We reached here with our hard work and dedication</p>
          </div>

          {/* Stats */}
          <div className="sm:item-center mx-auto flex flex-col justify-around gap-12 sm:flex-row md:w-1/2">
            <div className="space-y-8">
              <div className="item-center flex gap-4">
                <img src="/assets/Icon/mems.png" alt="" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-700">
                    4 handsome Boys
                  </h4>
                  <p className="">Members</p>
                </div>
              </div>
              <div className="item-center flex gap-4">
                <img src="/assets/Icon/project.png" alt="" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-700">2</h4>
                  <p className="">Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="item-center flex gap-4">
                <img src="/assets/Icon/partner1.png" alt="" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-700">2</h4>
                  <p className="">Partnership</p>
                </div>
              </div>
              <div className="item-center flex gap-4">
                <img src="assets/Icon/school1.png" alt="" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-700">CvSU</h4>
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
