import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; 
import CollegePlacement from "../assets/CollegePlacement.png";
import Ecommerce from "../assets/Ecommerce2.png"
import Chat from "../assets/Chat4.png"
import CRM from "../assets/CRM1.png";
import LandingPage from "../assets/LandingPage.png";
import Companio from "../assets/Companio.png";



const projects = [
  {
    name: "TrackEdu - Education & Coaching CRM",
    description:
      "A CRM system for educational institutes to manage student enrollments, payments, and attendance.",
    image: CRM,
    liveLink: "https://merry-gecko-3e5ed5.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Education_Coaching_CRM_project",
  },
  {
      name: "E-Commerce Application",
      description:
        "This e-commerce application allows users to browse products, manage a cart, and securely make payments using integrated gateways like Razorpay.",
      image: Ecommerce,
      liveLink: "https://tangerine-dolphin-4259a2.netlify.app/",
      repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/E-commerce-project",
    },
    {
        name: "Chat Application",
        description:
          "This chat application enables real-time messaging between users with secure login and instant communication using Socket.IO.",
        image: Chat,
        liveLink: "https://polite-klepon-a6d4ce.netlify.app/",
        repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/ChatApplication",
      },
      {
        name: "College Placement Management System",
        description:
          "A system that helps colleges manage student placements, track job offers, and streamline recruitment.",
        image: CollegePlacement,
        liveLink: "https://ephemeral-babka-684b8a.netlify.app/",
        repoLink: "https://github.com/Javeedkhan8/guvi-task/tree/main/Project-2",
      },
   {
    name: "Companio",
    description:
      "Companio is a social connection app that lets users browse, like, and filter profiles to find and connect with like-minded people.",
    image: Companio,
    liveLink: "https://remarkable-lokum-17e855.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Dating-app",
  },
  {
    name: "Landing Page",
    description:
      "The Hydra Landing Page is a modern, dark-themed website built with HTML and TailwindCSS, showcasing a VR brand.",
    image: LandingPage,
    liveLink: "https://joyful-crisp-d7c2ba.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Framework-project",
  },
];

const Projects = () => {
  return (
    <section className="p-3">
      <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
      <div className="max-w-4xl mx-auto">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }} 
          loop={true} 
          modules={[Pagination, Navigation, Autoplay]} 
          className="mySwiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="p-4 border-1  shadow-lg rounded-lg">
              <img
                src={project.image}
                alt={project.name}
                className="w-full object-center rounded-lg"
              />
              <h3 className="md:text-xl lg:text-xl text-md font-semibold mt-4 text-blue-400">{project.name}</h3>
              <p className="text-blue-400 md:text-xl lg:text-xl text-xs">{project.description}</p>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Live Demo
                </a>
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-400  px-4 py-2 rounded-md hover:bg-gray-900 transition"
                >
                  GitHub Repo
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Projects;
