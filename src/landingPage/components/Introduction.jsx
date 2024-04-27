import React from "react";

const Introduction = () => {
  const AboutImg = "/assets/Landing Page/introduction/intro-img.png";

  return (
    <div className="h-full w-full">
      {/* About Text */}
      <div
        className="mx-auto my-8 max-w-screen-2xl px-4 lg:px-14"
        id="Introduction"
      >
        <div className="mx-auto flex flex-col items-center justify-between gap-12 md:w-11/12 md:flex-row">
          <div>
            <img src={AboutImg} alt="something went wrong" />
          </div>
          <div className="mx-auto w-full text-center md:text-left xl:w-4/5">
            <h2 className="mb-4 text-2xl font-semibold lg:w-4/5 lg:text-3xl">
              Welcome to{" "}
              <span className="font-bold text-green-600">Adventura 360°</span>{" "}
            </h2>
            <p className="mb-8 text-justify text-base text-neutral-600 lg:w-3/4">
              Discover{" "}
              <span className="font-bold">
                Cavite State University Don Severino Delas Alas Campus <s />
              </span>
              with our interactive virtual tour,{" "}
              <span className="font-bold text-green-600">Adventura 360°</span>.
              Our thesis, showcases a platform that integrates cutting-edge
              360-degree imagery and user-friendly web technologies to deliver a
              seamless virtual tour experience.
            </p>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="mx-auto max-w-screen-2xl bg-slate-200 px-4 py-12 sm:py-16 lg:px-14">
        <div className="flex flex-col items-center justify-between lg:flex-row ">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-3xl font-semibold text-gray-700 md:text-4xl">
              Creating a clearer <br></br>
              <span className="2xl text-green-600 ">
                picture of the University
              </span>
            </h2>
            <p className="mb-4">
              We reached here with our hard work and dedication
            </p>
          </div>

          {/* Stats */}
          <div className="sm:item-center mx-auto flex flex-col justify-around gap-12 sm:flex-row">
            <div className="space-y-8">
              <div className="item-center flex gap-2">
                <img
                  src="/assets/Landing Page/introduction/members.png"
                  alt=""
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 sm:text-2xl">
                    4 handsome Boys
                  </h4>
                  <p className="">Members</p>
                </div>
              </div>
              <div className="item-center flex gap-4">
                <img
                  src="/assets/Landing Page/introduction/project.png"
                  alt=""
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 sm:text-2xl">
                    2
                  </h4>
                  <p className="">Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="item-center flex gap-4">
                <img
                  src="/assets/Landing Page/introduction/partners.png"
                  alt=""
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 sm:text-2xl">
                    2
                  </h4>
                  <p className="">Partnership</p>
                </div>
              </div>
              <div className="item-center flex gap-4">
                <img src="assets/Landing Page/introduction/school.png" alt="" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 sm:text-2xl">
                    CvSU
                  </h4>
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

export default Introduction;
