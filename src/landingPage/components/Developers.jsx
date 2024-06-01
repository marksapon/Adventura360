import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const developers = [
  {
    name: "Mark Dharel Sapon",
    role: "Adventura 360°'s Front & Backend Developer",
    img: "../assets/Landing Page/developers/maki.webp",
    socials: {
      facebook: "https://www.facebook.com/mark.sapon.33",
      instagram: "https://www.instagram.com/dharelo_/",
      email: "mailto:markdharel.sapon@cvsu.edu.ph",
      github: "https://www.linkedin.com/in/marksapon23/",
    },
  },
  {
    name: "John Joshua Sagpao",
    role: "Adventura 360°'s UI/UX Designer & Frontend Developer",
    img: "../assets/Landing Page/developers/josh.webp",
    socials: {
      facebook: "https://www.facebook.com/johnjoshua.solitesagpao",
      instagram: "https://www.instagram.com/joshuasagpao/",
      email: "mailto:johnjoshua.sagpao@cvsu.edu.ph",
      github: "https://github.com/JoshuaSagpao",
    },
  },
  {
    name: "Kevin Roi Nuesca",
    role: "Adventura 360°'s UI/UX Designer & Frontend Developer",
    img: "../assets/Landing Page/developers/kevin.webp",
    socials: {
      facebook: "https://facebook.com/username",
      instagram: "https://instagram.com/username",
      email: "mailto:kevinroi.nuesca@cvsu.edu.ph",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/kevin-roi-nuesca-07b756281/",
    },
  },
  {
    name: "Alex Kal-El Buenviaje",
    role: "Adventura 360°'s Project Manager",
    img: "../assets/Landing Page/developers/lex.webp",
    socials: {
      facebook: "https://www.facebook.com/LexBuenviaje",
      instagram: "https://www.instagram.com/lxbnvj/",
      email: "mailto:alexkalel.buenviaje@cvsu.edu.ph",
    },
  },
];

const sections = [
  {
    title: "Important Links",
    links: [
      { name: "Cavite State University", url: "https://cvsu.edu.ph/" },
      { name: "Github", url: "https://github.com/marksapon/Adventura360" },
    ],
  },
  {
    title: "Social Links",
    links: [
      { name: "kevin", url: "https://www.facebook.com/mark.sapon.33" },
      { name: "joshua", url: "https://www.facebook.com/wtf.kevs/" },
      { name: "mark", url: "https://www.facebook.com/johnjoshua.solitesagpao" },
      { name: "lex", url: "https://www.facebook.com/LexBuenviaje" },
    ],
  },
  {
    title: "Other Links",
    links: [
      { name: "Link1", url: "http://example.com/1" },
      { name: "Link2", url: "http://example.com/2" },
    ],
  },
];

const Developers = () => {
  return (
    <footer className="h-fit w-full">
      <div className="mt-16 flex h-fit w-full flex-col" id="Developers">
        <div className="flex w-full flex-col pb-8 lg:flex-row">
          <div className="z-40 h-auto w-full px-8 lg:w-1/2">
            <h1 className="relative w-full text-center text-5xl font-black leading-snug tracking-tight duration-300 md:text-6xl lg:text-left lg:text-7xl xl:text-8xl">
              Meet the <span className="text-green-600">developers</span>!
            </h1>
            <h2 className="mt-4 text-center text-base text-gray-500 lg:text-start">
              Meet the passionate team of Computer Science students at Cavite
              State University - Indang Campus, known as Sen'Py.
            </h2>
          </div>
          <div className="z-40 grid h-full w-full grid-cols-1 gap-4 p-4 text-center sm:grid-cols-2 xl:w-1/2">
            {developers.map((developer, index) => (
              <div
                key={index} // unique key prop here
                className="flex w-full flex-col rounded-2xl border bg-white shadow-xl duration-300 hover:bg-slate-200"
              >
                <div
                  className="m-1 flex h-[500px] items-center justify-center rounded-t-lg sm:h-[300px]"
                  style={{
                    backgroundImage: `url("${developer.img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-col px-4 py-1 text-start">
                  <div className="pb-1 text-xl font-bold text-black xl:text-2xl">
                    {developer.name}
                  </div>
                  <div className=" text-sm text-gray-500 xl:text-base">
                    {developer.role}
                  </div>
                  <div className="flex justify-start gap-2 py-2">
                    {developer.socials.facebook && (
                      <a
                        href={developer.socials.facebook}
                        className="hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook />
                      </a>
                    )}
                    {developer.socials.instagram && (
                      <a
                        href={developer.socials.instagram}
                        className="hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {developer.socials.email && (
                      <a
                        href={`mailto:${developer.socials.email}`}
                        className="hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEnvelope />
                      </a>
                    )}
                    {developer.socials.github && (
                      <a
                        href={developer.socials.github}
                        className="hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {developer.socials.linkedin && (
                      <a
                        href={developer.socials.linkedin}
                        className="hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        <p className="text-muted-foreground text-center text-sm text-gray-500">
          Adventura 360° is a project by Sen'Py.
        </p>
      </div>
    </footer>
  );
};

export default Developers;
