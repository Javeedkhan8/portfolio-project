import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6">
      <p>© 2025 Javeedkhan. All Rights Reserved.</p>
      <div className="flex justify-center mt-4 space-x-4">
        <a href="https://github.com/Javeedkhan8" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl hover:text-gray-400" />
        </a>
        <a href="https://www.linkedin.com/in/javeedkhan-j-70687b235" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl hover:text-gray-400" />
        </a>
        <a href="mailto:javeedkhanjohnbasha8@gmail.com">
          <FaEnvelope className="text-2xl hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
