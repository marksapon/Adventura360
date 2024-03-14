import React from "react";

const products = () => {
  const Pana = "/assets/Icon/pana.png";

  const adven1 = "/assets/Other/adven1.jpg";

  return (
    <div>
      {/* About Text */}
      <div className="mx-auto my-8 max-w-screen-2xl px-4 lg:px-14" id="product">
        <div className="mx-auto flex flex-col items-center justify-between gap-12 md:w-11/12 md:flex-row">
          <div>
            <img src={Pana} alt="something went wrong" />
          </div>
          <div className="mx-auto md:w-3/5">
            <h2 className="mb-4 text-4xl font-semibold text-gray-700 md:w-4/5">
              We also create designs with the capability to be used on phones.
            </h2>
            <p className="mb-8 text-sm text-neutral-600 md:w-3/4">
              Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor,
              augue nec tincidunt molestie, massa nunc varius arcu, at
              scelerisque elit erat a magna. Donec quis erat at libero ultrices
              mollis. In hac habitasse platea dictumst. Vivamus vehicula leo
              dui, at porta nisi facilisis finibus. In euismod augue vitae nisi
              ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla
              commodo faucibus efficitur quis massa. Praesent felis est, finibus
              et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus
              ipsum id gravida.
            </p>
            <button className=" flex h-12 items-center justify-between gap-2 rounded bg-green-600 px-7 py-2 text-white transition-all duration-300 hover:-translate-y-4 hover:bg-lime-700">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="mx-auto max-w-screen-2xl bg-slate-200 px-4 py-16 lg:px-14">
        <div className="flex flex-col items-center justify-between gap-36 md:flex-row">
          <div className="md:w-2/3">
            {" "}
            <img src={adven1} alt="" />
          </div>

          {/* Stats */}
          <div className="mx-auto md:w-1/2 ">
            <div>
              <p className="mb-8 flex text-justify text-sm leading-7 text-gray-700 md:w-4/5">
                Adventura is a Visual Novel game that allows the users to
                navigate inside the actual place of Cavite State University
                Indang Campus. You play as a curious Visitor or a Student of the
                campus. Navigating different places of the campus and learning
                its history and their purpose. Using the Itinerary as list of
                places the campus has, the Street View as a way to navigate on
                foot, and lastly the Map as a way to quickly travel to places
                inside the campus.
              </p>
              <h5 className="mb-2 text-xl font-semibold text-green-600">
                Sen'Py Productions
              </h5>
              <p>Adventura an Online Interactive Campus Tour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default products;
