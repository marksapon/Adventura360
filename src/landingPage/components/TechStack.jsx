import React from "react";

const TechStack = () => {
  const services = [
    {
      id: 1,
      title: "Interactive Map",
      description:
        "A dynamic map interface that allows users to explore the campus layout, navigate between buildings, and access additional information about specific locations.",
      image: "/assets/Landing Page/tech stack/cards/map.svg",
    },
    {
      id: 2,
      title: "360° Images",
      description:
        "Seamless panoramic images that provide users with a detailed view of campus buildings, facilities, and landmarks from every angle.",
      image: "/assets/Landing Page/tech stack/cards/360.svg",
    },
    {
      id: 3,
      title: "Filtered Access",
      description:
        "A feature that restricts access to certain areas or information based on user roles or permissions, ensuring security and privacy.",
      image: "/assets/Landing Page/tech stack/cards/shield.svg",
    },
    {
      id: 4,
      title: "Feedback System",
      description:
        "An interface for users to provide feedback, suggestions, or report issues about the virtual tour experience, helping to improve the system over time.",
      image: "/assets/Landing Page/tech stack/cards/feedback.svg",
    },
    {
      id: 5,
      title: "Building Overview",
      description:
        "A summary or overview of each building on the campus, including its courses offered, facilities, and relevant information for users to understand its role within the university.",
      image: "/assets/Landing Page/tech stack/cards/building.svg",
    },
    {
      id: 6,
      title: "Pathfinding System",
      description:
        "A navigation tool that assists users in finding the shortest or most efficient route between different points of interest on the campus.",
      image: "/assets/Landing Page/tech stack/cards/pathfinding.svg",
    },
  ];
  return (
    <div
      className="mx-auto max-w-screen-2xl px-4 py-16 md:px-14"
      id="TechStack"
    >
      <div className="my-8 text-center">
        <h2 className="mb-2 text-4xl font-semibold">Tech Stack</h2>
        <p className="text-gray-700">
          Technologies used in the development of Adventura 360°
        </p>

        {/* Logoos */}

        <div className="my-12 flex flex-wrap items-center justify-between gap-4 ">
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="flex size-12 items-center justify-center"
              src="/assets/Landing Page/tech stack/logo/react.png"
              alt=""
            />
            <p className="font-semibold">React</p>
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/tailwind.png"
              alt=""
            />
            Tailwind CSS
          </a>
          <a
            href="https://www.mongodb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/mongoDB.png"
              alt=""
            />
            MongoDB
          </a>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/vercel.png"
              alt=""
            />
            Vercel
          </a>
          <a
            href="https://openseadragon.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/osd.png"
              alt=""
            />
            OpenSeaDragon
          </a>
          <a
            href="https://naver.github.io/egjs-view360/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/egjs.svg"
              alt=""
            />
            View360
          </a>
          <a
            href="https://www.upscayl.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="size-12"
              src="/assets/Landing Page/tech stack/logo/upscayl.png"
              alt=""
            />
            Upscayl
          </a>
          <a
            href="http://www.zoomify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-auto flex-col items-center justify-center"
          >
            <img
              className="w-18 h-12"
              src="/assets/Landing Page/tech stack/logo/zoomify.png"
              alt=""
            />
            Zoomify
          </a>
          {/* sevices card */}
        </div>
      </div>

      {/* sevices card */}
      <div className="mx-auto mt-20 text-center md:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold ">Adventura 360</h2>
        <p className="text-gray-700">
          An Interactive Campus Tour for Cavite State University Don Severino
          Delas Alas Campus
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
                <img src={service.image} alt="" className="-ml-3 size-10" />
              </div>
              <h4 className="mb-2 px-2 text-2xl font-bold text-green-600">
                {service.title}
              </h4>
              <p className="text-sm text-neutral-700">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
