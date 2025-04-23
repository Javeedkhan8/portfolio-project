import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module

import CollegePlacement1 from "../assets/CollegePlacement.png";
import CollegePlacement2 from "../assets/CollegePlacement1.png";
import CollegePlacement3 from "../assets/CollegePlacement2.png";
import CollegePlacement4 from "../assets/CollegePlacement3.png";
import CollegePlacement5 from "../assets/CollegePlacement4.png";
import Companio1 from "../assets/Companio1.png"
import Companio2 from "../assets/Companio2.png"
import Companio3 from "../assets/Companio3.png"
import Companio4 from "../assets/Companio4.png"
import Companio5 from "../assets/Companio5.png"
import CRM1 from "../assets/CRM.png";
import CRM2 from "../assets/CRM1.png";
import CRM3 from "../assets/CRM2.png";
import CRM4 from "../assets/CRM3.png";
import CRM5 from "../assets/CRM4.png";
import LandingPage1 from "../assets/LandingPage.png";
import LandingPage2 from "../assets/LandingPage1.png";
import LandingPage3 from "../assets/LandingPage2.png";
import LandingPage4 from "../assets/LandingPage3.png";
import LandingPage5 from "../assets/LandingPage4.png";
import LandingPage6 from "../assets/LandingPage5.png";

import Chat1 from "../assets/Chat.png"
import Chat2 from "../assets/Chat1.png"
import Chat3 from "../assets/Chat2.png"
import Chat4 from "../assets/Chat3.png"
import Chat5 from "../assets/Chat4.png"
import Ecommerce1 from "../assets/Ecommerce.png"
import Ecommerce2 from "../assets/Ecommerce1.png"
import Ecommerce3 from "../assets/Ecommerce2.png"
import Ecommerce4 from "../assets/Ecommerce3.png"
import Ecommerce5 from "../assets/Ecommerce4.png"
import Ecommerce6 from "../assets/Ecommerce5.png"



const projects = [
  {
    name: "TrackEdu - Education & Coaching CRM",
    description:
      "A CRM system for educational institutes to manage student enrollments, payments, and attendance.",
    images: [CRM2, CRM3, CRM1, CRM4, CRM5],
    liveLink: "https://merry-gecko-3e5ed5.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Education_Coaching_CRM_project",
  },
  {
    name: "Chat Application",
    description:
      "This chat application enables real-time messaging between users with secure login and instant communication using Socket.IO.",
    images: [Chat1,Chat2,Chat3,Chat4,Chat5],
    liveLink: "https://polite-klepon-a6d4ce.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/ChatApplication",
  },
  {
    name: "E-Commerce Application",
    description:
      "This e-commerce application allows users to browse products, manage a cart, and securely make payments using integrated gateways like Razorpay.",
    images: [Ecommerce1,Ecommerce2,Ecommerce3,Ecommerce4,Ecommerce5,Ecommerce6],
    liveLink: "https://tangerine-dolphin-4259a2.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/E-commerce-project",
  },
  {
    name: "College Placement Management System",
    description:
      "A system that helps colleges manage student placements, track job offers, and streamline recruitment.",
    images: [CollegePlacement2, CollegePlacement3, CollegePlacement4, CollegePlacement1, CollegePlacement5],
    liveLink: "https://ephemeral-babka-684b8a.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/guvi-task/tree/main/Project-2",
  },
  {
      name: "Companio",
      description:
        "Companio is a social connection app that lets users browse, like, and filter profiles to find and connect with like-minded people.",
      images: [Companio1,Companio2,Companio3,Companio4,Companio5],
      liveLink: "https://remarkable-lokum-17e855.netlify.app/",
      repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Dating-app",
    },
  {
    name: "Landing Page",
    description:
      "The Hydra Landing Page is a modern, dark-themed website built with HTML and TailwindCSS, showcasing a VR brand.",
    images: [LandingPage1, LandingPage2, LandingPage3, LandingPage4, LandingPage5, LandingPage6],
    liveLink: "https://joyful-crisp-d7c2ba.netlify.app/",
    repoLink: "https://github.com/Javeedkhan8/portfolio-project/tree/main/Framework-project",
  },
];

const Projects = () => {
  return (
    <section className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="shadow-lg rounded-lg p-4 bg-gray-950 text-blue-400">
            <Swiper
              pagination={{ clickable: true }}
              navigation={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }} 
              modules={[Pagination, Navigation, Autoplay]} 
              className="rounded-lg overflow-hidden"
            >
              {project.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-52 " />
                </SwiperSlide>
              ))}
            </Swiper>
            <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
            <p>{project.description}</p>
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
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
