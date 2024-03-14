import React from "react";
// import Card1 from '/assets/Card1.png'

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Inter Active Map",
      description: "This web app allows user to interact with the 360 map",
      image: "/assets/cards/Card1.png",
    },
    {
      id: 2,
      title: "Sen'Py",
      description:
        "We are a group of student that can help you to explore the campus",
      image: "/assets/cards/Card2.png",
    },
    {
      id: 3,
      title: "Thesis",
      description: "This is an undergraduate thesis",
      image: "/assets/cards/Card3.png",
    },
  ];
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-14" id="service">
      <div className="my-8 text-center">
        <h2 className="text-neutralDGrey mb-2 text-4xl font-semibold">
          Our Client
        </h2>
        <p className="text-neutralDGrey">
          This is an undergraduate Computer Science Thesis
        </p>

        {/* Logoos */}

        <div className="my-12 flex flex-wrap items-center justify-between gap-4">
          <img src="/assets/logo/comp1.png" alt="" />
          <img src="/assets/logo/comp2.png" alt="" />
          <img src="/assets/logo/comp3.png" alt="" />
          <img src="/assets/logo/comp4.png" alt="" />
          <img src="/assets/logo/comp5.png" alt="" />
          <img src="/assets/logo/comp6.png" alt="" />
          <img src="/assets/logo/comp7.png" alt="" />

          {/* sevices card */}
        </div>
      </div>

      {/* sevices card */}
      <div className="mx-auto mt-20 text-center md:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold text-gray-700 ">
          Adventura 360{" "}
        </h2>
        <p className="text-neutral-600">
          To be able to Navigate though the University
        </p>
      </div>

      {/* cards */}
      <div className="mx-auto mt-14 grid grid-cols-1 gap-12 md:w-11/12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="mx-auto flex h-full cursor-pointer items-center justify-center rounded-md px-4 py-8 text-center shadow transition-all duration-300 hover:-translate-y-5 hover:border-b-4 hover:border-green-600 md:h-80 md:w-[300px]"
          >
            <div>
              <div className="mx-auto mb-4 h-14 w-14 rounded-br-3xl rounded-tl-3xl bg-[#E8F5E9]">
                <img src={service.image} alt="" className="-ml-5" />
              </div>
              <h4 className="mb-2 px-2 text-2xl font-bold text-gray-700">
                {service.title}
              </h4>
              <p className="text-sm text-neutral-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
