import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Profile from "../assets/ProfileImage1.jpeg";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative py-16 md:py-20 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-20"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left md:w-1/2"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold md:mt-6">
          <span className="text-blue-600 dark:text-blue-400">Javeedkhan J</span>
        </h1>
        <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="mt-4 text-sm sm:text-md md:text-lg leading-relaxed text-center px-4"
>
  I am a MERN Stack Developer passionate about building scalable, user-centric web applications. 
  Certified by GUVI (IIT Madras-incubated), I have developed and deployed projects using:
  <div className="mt-2 flex flex-wrap justify-center gap-2">
    <span className="border border-gray-500 px-2 py-1 rounded-lg text-sm">React.js</span>
    <span className="border border-gray-500 px-2 py-1 rounded-lg text-sm">Node.js</span>
    <span className="border border-gray-500 px-2 py-1 rounded-lg text-sm">Express.js</span>
    <span className="border border-gray-500 px-2 py-1 rounded-lg text-sm">MongoDB</span>
    <span className="border border-gray-500 px-2 py-1 rounded-lg text-sm">TailwindCSS</span>
  </div>
</motion.p>


        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <motion.a
            href="https://drive.google.com/file/d/1CdR8B802ETCozjHN7-hj-N5iZuZlP7NI/view"
            download="Javeedkhan_Resume.pdf"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="resume-button px-4 sm:px-6 py-3 rounded-lg flex items-center gap-2 w-48 sm:w-52 shadow-lg transition-all duration-300 text-sm sm:text-base justify-center border border-blue-400"
          >
            <FaDownload /> Download Resume
          </motion.a>
        </div>

        <div className="mt-6 flex justify-center md:justify-start gap-4 text-xl sm:text-2xl">
          <a href="https://github.com/Javeedkhan8" target="_blank" rel="noopener noreferrer" className="transition-all duration-300">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/javeedkhan-j-70687b235" target="_blank" rel="noopener noreferrer" className="transition-all duration-300">
            <FaLinkedin />
          </a>
          <a href="mailto:javeedkhanjohnbasha8@gmail.com" className="transition-all duration-300">
            <FaEnvelope />
          </a>
        </div>
      </motion.div>

      {/* Profile Image with Rings */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mt-10 md:mt-0 md:w-1/2 flex justify-center"
      >
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
          {/* Outer Rotating Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 border-4 border-gray-400 dark:border-white rounded-full opacity-30"
          ></motion.div>

          {/* Inner Glowing Circle */}
          <div className="absolute inset-4 border-4 border-gray-300 dark:border-gray-600 rounded-full animate-pulse opacity-50"></div>

          {/* Profile Image */}
          <motion.img
            src={Profile}
            alt="Javeedkhan"
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-full rounded-full object-cover shadow-lg transition-transform duration-300 p-4"
          />
        </div>
      </motion.div>

      {/* Floating Background Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-12 sm:w-16 h-12 sm:h-16 border-2 border-blue-500 dark:border-blue-300 rounded-lg opacity-30"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-12 sm:bottom-16 right-12 sm:right-16 w-8 sm:w-10 h-8 sm:h-10 border-2 border-green-500 dark:border-green-300 rounded-full opacity-40"
      ></motion.div>
    </motion.section>
  );
};

export default Hero;
