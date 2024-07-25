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
    name: "John Joshua Sagpao",
    role: "Adventura 360°'s UI/UX Designer & Frontend Developer",
    imgSrc: "../assets/Landing Page/developers/josh.webp",
    socialLinks: {
      facebook: "https://www.facebook.com/johnjoshua.solitesagpao",
      instagram: "https://www.instagram.com/joshuasagpao/",
      email: "mailto:johnjoshua.sagpao@cvsu.edu.ph",
      github: "https://github.com/JoshuaSagpao",
    },
  },
  {
    name: "Kevin Roi Nuesca",
    role: "Adventura 360°'s UI/UX Designer & Frontend Developer",
    imgSrc: "../assets/Landing Page/developers/kevin.webp",
    socialLinks: {
      facebook: "https://facebook.com/username",
      instagram: "https://instagram.com/username",
      email: "mailto:kevinroi.nuesca@cvsu.edu.ph",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/kevin-roi-nuesca-07b756281/",
    },
  },
  {
    name: "Mark Dharel Sapon",
    role: "Adventura 360°'s Front & Backend Developer",
    imgSrc: "../assets/Landing Page/developers/maki.webp",
    socialLinks: {
      facebook: "https://www.facebook.com/mark.sapon.33",
      instagram: "https://www.instagram.com/dharelo_/",
      email: "mailto:markdharel.sapon@cvsu.edu.ph",
      github: "https://github.com/marksapon",
      linkedin: "https://www.linkedin.com/in/marksapon23/",
    },
  },
  {
    name: "Alex Kal-El Buenviaje",
    role: "Adventura 360°'s Project Manager",
    imgSrc: "../assets/Landing Page/developers/lex.webp",
    socialLinks: {
      facebook: "https://www.facebook.com/LexBuenviaje",
      instagram: "https://www.instagram.com/lxbnvj/",
      email: "mailto:alexkalel.buenviaje@cvsu.edu.ph",
    },
  },
];

const Footer = () => (
  <footer className="mt-8 py-4 text-center">
    <p className="text-center text-sm text-gray-500 text-muted-foreground">
      © {new Date().getFullYear()} Adventura 360° is a project by Sen'Py. All
      rights reserved.
    </p>
  </footer>
);

const Devs = () => {
  return (
    <div
      className="mx-auto flex h-screen max-w-screen-xl px-4 pb-8 lg:px-6 lg:pb-12"
      id="Developers"
    >
      <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-black">
            Meet the <span className="text-green-600">developers</span>
          </h2>
          <h2 className="mt-4 text-center text-base text-gray-500">
            Meet the passionate team of Computer Science students at Cavite
            State University - Indang Campus, known as Sen'Py.
          </h2>
        </motion.div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
              <p className="text-gray-500">{dev.role}</p>
              <div className="m-2 flex justify-center gap-4 ">
                {dev.socialLinks.facebook && (
                  <a href={dev.socialLinks.facebook} target="_blank">
                    <FaFacebook className="text-black hover:text-green-500" />
                  </a>
                )}
                {dev.socialLinks.instagram && (
                  <a href={dev.socialLinks.instagram} target="_blank">
                    <FaInstagram className="text-black hover:text-green-500" />
                  </a>
                )}
                {dev.socialLinks.email && (
                  <a href={dev.socialLinks.email} target="_blank">
                    <FaEnvelope className="text-black hover:text-green-500" />
                  </a>
                )}
                {dev.socialLinks.github && (
                  <a href={dev.socialLinks.github} target="_blank">
                    <FaGithub className="text-black hover:text-green-500" />
                  </a>
                )}
                {dev.socialLinks.linkedin && (
                  <a href={dev.socialLinks.linkedin} target="_blank">
                    <FaLinkedin className="text-black hover:text-green-500" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Devs;
