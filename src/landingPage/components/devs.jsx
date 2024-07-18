import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { delay: 0.65, duration: 0.5 } },
// };
const containerVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.65,
      duration: 0.8, // Slightly longer duration for the bounce effect
      type: "spring", // Use spring physics for bounce
      stiffness: 70, // Control the stiffness of the spring
      damping: 10, // Control the damping (less damping = more bounce)
    },
  },
};

// Define a simple Footer component
const Footer = () => (
  <footer className=" mt-8 py-4 text-center">
    <p className="text-muted-foreground text-center text-sm text-gray-500">
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
        <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-3xl border p-8 shadow-xl"
          >
            <img
              src="../assets/Landing Page/developers/josh.webp"
              alt="Josh picture"
              className="h-30 mx-auto mb-4 w-36 rounded-full"
            />
            <h3 className="mb-1 text-xl font-bold lg:text-2xl">
              <p>John Joshua Sagpao</p>
            </h3>
            <p className="text-gray-500">
              Adventura 360°'s UI/UX Designer & Frontend Developer
            </p>
            <div className="m-2 flex justify-center gap-4 ">
              <a
                href="https://www.facebook.com/johnjoshua.solitesagpao"
                target="_blank"
              >
                <FaFacebook className="text-black hover:text-green-500" />
              </a>
              <a href="https://www.instagram.com/joshuasagpao/" target="_blank">
                <FaInstagram className="text-black hover:text-green-500" />
              </a>
              <a href="mailto:johnjoshua.sagpao@cvsu.edu.ph">
                <FaEnvelope className="text-black hover:text-green-500" />
              </a>
              <a href="https://github.com/JoshuaSagpao" target="_blank">
                <FaGithub className="text-black hover:text-green-500" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
            className="rounded-3xl border p-8 shadow-xl"
          >
            <img
              src="../assets/Landing Page/developers/kevin.webp"
              alt="Kebs picture"
              className="h-30 mx-auto mb-4 w-36 rounded-full"
            />
            <h3 className="mb-1 text-xl font-bold lg:text-2xl">
              <p>Kevin Roi Nuesca</p>
            </h3>
            <p className="text-gray-500">
              Adventura 360°'s UI/UX Designer & Frontend Developer
            </p>
            <div className="m-2 flex justify-center gap-4 ">
              <a href="https://facebook.com/username" target="_blank">
                <FaFacebook className="text-black hover:text-green-500" />
              </a>
              <a href="https://instagram.com/username" target="_blank">
                <FaInstagram className="text-black hover:text-green-500" />
              </a>
              <a href="mailto:kevinroi.nuesca@cvsu.edu.ph" target="_blank">
                <FaEnvelope className="text-black hover:text-green-500" />
              </a>
              <a href="https://github.com/username" target="_blank">
                <FaGithub className="text-black hover:text-green-500" />
              </a>
              <a
                href="https://www.linkedin.com/in/kevin-roi-nuesca-07b756281/"
                target="_blank"
              >
                <FaLinkedin className="text-black hover:text-green-500" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35 }}
            className="rounded-3xl border p-8 shadow-xl"
          >
            <img
              src="../assets/Landing Page/developers/maki.webp"
              alt="Mark picture"
              className="h-30 mx-auto mb-4 w-36 rounded-full"
            />
            <h3 className="mb-1 text-xl font-bold lg:text-2xl">
              <p>Mark Dharel Sapon</p>
            </h3>
            <p className="text-gray-500">
              Adventura 360°'s Front & Backend Developer
            </p>
            <div className="m-2 flex justify-center gap-4 ">
              <a href="https://www.facebook.com/mark.sapon.33" target="_blank">
                <FaFacebook className="text-black hover:text-green-500" />
              </a>
              <a href="https://www.instagram.com/dharelo_/" target="_blank">
                <FaInstagram className="text-black hover:text-green-500" />
              </a>
              <a href="mailto:markdharel.sapon@cvsu.edu.ph" target="_blank">
                <FaEnvelope className="text-black hover:text-green-500" />
              </a>
              <a href="https://github.com/marksapon" target="_blank">
                <FaGithub className="text-black hover:text-green-500" />
              </a>
              <a
                href="https://www.linkedin.com/in/marksapon23/"
                target="_blank"
              >
                <FaLinkedin className="text-black hover:text-green-500" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.45 }}
            className="rounded-3xl border p-8 shadow-xl"
          >
            <img
              src="../assets/Landing Page/developers/lex.webp"
              alt="Lex picture"
              className="h-30 mx-auto mb-4 flex w-36 rounded-full"
            />
            <h3 className="mb-1 text-xl font-bold lg:text-2xl">
              <p>Alex Kal-El Buenviaje</p>
            </h3>
            <p className="text-gray-500">Adventura 360°'s Project Manager</p>
            <div className="m-2 flex justify-center gap-4 ">
              <a href="https://www.facebook.com/LexBuenviaje" target="_blank">
                <FaFacebook className="text-black hover:text-green-500" />
              </a>
              <a href="https://www.instagram.com/lxbnvj/" target="_blank">
                <FaInstagram className="text-black hover:text-green-500" />
              </a>
              <a href="mailto:alexkalel.buenviaje@cvsu.edu.ph" target="_blank">
                <FaEnvelope className="text-black hover:text-green-500" />
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Devs;
