import React from "react";

const Introduction = () => {
  const AboutImg = "/assets/Landing Page/introduction/phone girl.png";

  return (
    <div className="h-full w-full">
      {/* About Text */}
      <div
        className="mx-auto my-8 max-w-screen-2xl px-4 lg:px-14"
        id="Introduction"
      >
        <div className="mx-auto flex flex-col items-center justify-between gap-12 md:w-11/12 md:flex-row">
          <div>
            <img className="h-1/6" src={AboutImg} alt="something went wrong" />
          </div>
          <div className="mx-auto w-full text-center md:text-left xl:w-4/5">
            <h2 className="mb-4 text-base md:text-lg lg:w-4/5">
              <span className="font-bold text-green-600">
                Adventura{" "}
                <span className="font-bold text-orange-500">360°&nbsp;</span>
              </span>
              is an interactive campus map of{" "}
              <span className="font-semibold text-orange-500">
                Cavite State University Don Severino Delas Alas Campus&nbsp;
              </span>
              made by student researchers of{" "}
              <span className="font-semibold">
                Bacherlor of Science in Computer Science&nbsp;
              </span>
              under the{" "}
              <span className="font-semibold">
                College of Engineering and Information Technology.&nbsp;
              </span>
              <span className="font-bold text-green-600">
                Adventura 360°&nbsp;
              </span>
              is designed to be a guide to visitors, students, faculty, and
              accreditors in venturing the campus.
            </h2>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="mx-auto max-w-screen-2xl bg-white px-4 py-12 sm:py-16 lg:px-14">
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
                    4
                  </h4>
                  <p className="">Creators</p>
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
                    1
                  </h4>
                  <p className="">Client</p>
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
