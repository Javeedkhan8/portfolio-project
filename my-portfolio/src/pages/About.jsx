import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faJs,
  faHtml5,
  faCss3,
  faNodeJs,
  faGithub,
  faNpm,
  faCss,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const skills = [
  { name: "React", icon: faReact },
  { name: "JavaScript", icon: faJs },
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3 },
  { name: "Node.js", icon: faNodeJs },
  { name: "GitHub", icon: faGithub },
  { name: "MongoDB", icon: faDatabase },
  { name: "NPM", icon: faNpm },
  { name: "TailwindCSS", icon: faCss },
];

const About = () => {
  return (
    <section className="py-12 px-4 text-center">
      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold">Skills</h3>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="p-3 sm:p-4 bg-gray-900 rounded-lg shadow-md flex flex-col items-center">
              <FontAwesomeIcon icon={skill.icon} className="text-3xl sm:text-4xl text-blue-400 mb-2" />
              <p className="text-gray-300 text-sm sm:text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
