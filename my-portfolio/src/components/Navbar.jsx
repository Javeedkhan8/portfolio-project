import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCode, faHome, faCertificate } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-opacity-60 backdrop-blur-md border border-blue-400 px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-lg flex items-center justify-between w-[95%] md:w-[70%] max-w-3xl z-10">
      
      {/* Logo */}
      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-sm md:text-lg font-bold">J</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-3 md:space-x-6">
        <NavItem to="/" icon={faHome} text="Home"/>
        <NavItem to="/projects" icon={faBriefcase} text="Projects" />
        <NavItem to="/about" icon={faCode} text="Skills" />
        <NavItem to="/certificates" icon={faCertificate} text="Certificates" /> 
      </ul>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </nav>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, icon, text }) => (
  <li>
    <Link 
      to={to} 
      className="flex flex-col items-center text-[10px] md:text-xs lg:text-sm"
    >
      <FontAwesomeIcon icon={icon} className="text-base md:text-lg" />
      <span className="hidden sm:block">{text}</span>
    </Link>
  </li>
);

export default Navbar;
