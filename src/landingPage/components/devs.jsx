import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.65,
      duration: 0.8,
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
};

const developers = [
  {
    name: "Mark Dharel Sapon",
    role: "Full-stack Developer",
    imgSrc: "../assets/Landing Page/developers/macky.png",
    socialLinks: {
      facebook: "https://www.facebook.com/mark.sapon.33",
      instagram: "https://www.instagram.com/dharelo_/",
      email: "mailto:marksapon23@gmail.com.ph",
      github: "https://github.com/marksapon",
      linkedin: "https://www.linkedin.com/in/marksapon23/",
    },
  },
  {
    name: "John Joshua Sagpao",
    role: "UI/UX Designer & Frontend Developer",
    imgSrc: "../assets/Landing Page/developers/josh.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/johnjoshua.solitesagpao",
      instagram: "https://www.instagram.com/joshuasagpao/",
      email: "mailto:johnjoshua.sagpao@cvsu.edu.ph",
      github: "https://github.com/JoshuaSagpao",
    },
  },
  {
    name: "Kevin Roi Nuesca",
    role: "UI/UX Designer & Frontend Developer",
    imgSrc: "../assets/Landing Page/developers/kevin.jpg",
    socialLinks: {
      facebook: "https://facebook.com/username",
      instagram: "https://instagram.com/username",
      email: "mailto:kevinroi.nuesca@cvsu.edu.ph",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/kevin-roi-nuesca-07b756281/",
    },
  },
  {
    name: "Alex Kal-El Buenviaje",
    role: "Project Manager",
    imgSrc: "../assets/Landing Page/developers/lex.png",
    socialLinks: {
      facebook: "https://www.facebook.com/LexBuenviaje",
      instagram: "https://www.instagram.com/lxbnvj/",
      email: "mailto:alexkalel.buenviaje@cvsu.edu.ph",
    },
  },
];

const Footer = () => (
  <footer className="text-center">
    <p className="font-bitter text-center text-xs text-muted-foreground md:text-sm">
      © {new Date().getFullYear()} Adventura 360° is a project by Sen'Py. All
      rights reserved.
    </p>
  </footer>
);

const Devs = () => {
  return (
    <>
      <div id="Developers" />
      <div className="mx-auto mt-44 flex h-auto items-center justify-center px-4 lg:px-6">
        <div className="mb-4 flex flex-col items-center justify-center gap-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="font-bitter text-cvsu my-8 text-5xl font-medium tracking-wide drop-shadow-[0_3px_1px_rgba(0,0,0,0.4)]">
              THE TEAM BEHIND ADVENTURA
            </h2>
          </motion.div>
          {/* */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:flex">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 * (index + 1) }}
                className="flex flex-col justify-between rounded-3xl border p-8 shadow-xl"
              >
                <img
                  src={dev.imgSrc}
                  alt={`${dev.name} picture`}
                  className="h-30 mx-auto mb-4 w-36 rounded-full"
                />
                <h3 className="mb-1 text-nowrap text-xl font-bold lg:text-2xl">
                  <p>{dev.name}</p>
                </h3>
                <p className="text-gray-500">
                  Adventura 360°'s{" "}
                  <span className="flex flex-col font-semibold">
                    {dev.role}
                  </span>{" "}
                </p>
                <div className="m-2 flex justify-center gap-4">
                  {dev.socialLinks.facebook && (
                    <a href={dev.socialLinks.facebook} target="_blank">
                      <FaFacebook className="text-black transition-all duration-300 hover:text-green-500" />
                    </a>
                  )}
                  {dev.socialLinks.instagram && (
                    <a href={dev.socialLinks.instagram} target="_blank">
                      <FaInstagram className="text-black transition-all duration-300 hover:text-green-500" />
                    </a>
                  )}
                  {dev.socialLinks.email && (
                    <a href={dev.socialLinks.email} target="_blank">
                      <FaEnvelope className="text-black transition-all duration-300 hover:text-green-500" />
                    </a>
                  )}
                  {dev.socialLinks.github && (
                    <a href={dev.socialLinks.github} target="_blank">
                      <FaGithub className="text-black transition-all duration-300 hover:text-green-500" />
                    </a>
                  )}
                  {dev.socialLinks.linkedin && (
                    <a href={dev.socialLinks.linkedin} target="_blank">
                      <FaLinkedin className="text-black transition-all duration-300 hover:text-green-500" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Devs;
