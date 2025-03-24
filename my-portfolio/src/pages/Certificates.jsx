import certificateImage from "../assets/GuviCertification - Mern stack Development.png"; 

const Certificates = () => {
  return (
    <section className="py-16 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-8">Certificate</h2>
      <div className="p-4 border rounded-lg shadow-md max-w-md w-full">
        <img 
          src={certificateImage} 
          alt="MERN Full-Stack Certification" 
          className="w-full h-auto object-cover rounded-md" 
        />
        <h3 className="text-lg font-semibold mt-3 text-center">Full Stack Certificate Course</h3>
        <h4 className="text-sm font-medium mt-2 text-center">Guvi Geek Network Pvt Ltd — 2025</h4>
        <ul className="text-sm text-gray-500 mt-2 text-center list-disc list-inside">
          <li>Built dynamic and interactive full-stack web applications.</li>
          <li>Gained expertise in React, Node.js, Express.js, and MongoDB integration.</li>
        </ul>
      </div>
    </section>
  );
};

export default Certificates;
