import React from "react";

const products = () => {
  const Pana = "/assets/Icon/pana.png";

  const adven1 = "/assets/Other/adven1.jpg";

  return (
    <div>
      {/* About Text */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8" id="product">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <img src={Pana} alt="something went wrong" />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl text-gray-700 font-semibold mb-4 md:w-4/5">
              We also create designs with the capability to be used on phones.
            </h2>
            <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
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
            <button className=" bg-green-600 text-white py-2 px-7 transition-all duration-300 rounded h-12 hover:bg-lime-700 items-center justify-between flex gap-2 hover:-translate-y-4">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Motto? */}

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-slate-200 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-36">
          <div className="md:w-2/3">
            {" "}
            <img src={adven1} alt="" />
          </div>

          {/* Stats */}
          <div className="md:w-1/2 mx-auto ">
            <div>
              <p className="md:w-4/5 text-sm text-gray-700 mb-8 leading-7 flex text-justify">
                Adventura is a Visual Novel game that allows the users to
                navigate inside the actual place of Cavite State University
                Indang Campus. You play as a curious Visitor or a Student of the
                campus. Navigating different places of the campus and learning
                its history and their purpose. Using the Itinerary as list of
                places the campus has, the Street View as a way to navigate on
                foot, and lastly the Map as a way to quickly travel to places
                inside the campus.
              </p>
              <h5 className="text-green-600 text-xl font-semibold mb-2">
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
