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
    <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto" id="service">
      <div className="text-center my-8">
        <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">
          Our Client
        </h2>
        <p className="text-neutralDGrey">
          This is an undergraduate Computer Science Thesis
        </p>

        {/* Logoos */}

        <div className="my-12 flex flex-wrap justify-between items-center gap-4">
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
      <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="text-4xl text-neutralDGrey font-semibold mb-3 ">
          Adventura 360{" "}
        </h2>
        <p className="text-neutralGrey">
          To be able to Navigate though the University
        </p>
      </div>

      {/* cards */}
      <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
        {services.map((service) => (
          <div
            key={service.id}
            className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-full"
          >
            <div>
              <div className="bg-[#E8F5E9] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
                <img src={service.image} alt="" className="-ml-5" />
              </div>
              <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">
                {service.title}
              </h4>
              <p className="text-sm text-neutralGrey">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
