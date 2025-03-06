import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faMapMarkerAlt, faVenusMars, faBirthdayCake, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../layout/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-700">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    <div className="flex justify-center items-center min-h-screen pt-20 bg-gradient-to-b from-gray-100 to-gray-200 px-4 ">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all hover:scale-105 duration-300 ">
        
      
        <div className="flex flex-col items-center ">
          <img
            src={user.photo || "https://via.placeholder.com/150"} 
            alt={user.name}
            className="w-32 h-32 rounded-full shadow-md border-4 border-gray-300"
          />
          
       
          <h1 className="text-3xl font-bold text-gray-800 mt-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-600" />
            {user.name}
          </h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
            {user.email}
          </p>
        </div>

       
        <div className="mt-6 space-y-3">
          <p className="text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faBirthdayCake} className="text-pink-500" />
            <span className="font-semibold">Age:</span> {user.age}
          </p>
          <p className="text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faVenusMars} className="text-blue-500" />
            <span className="font-semibold">Gender:</span> {user.gender}
          </p>
          <p className="text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500" />
            <span className="font-semibold">City:</span> {user.city}
          </p>
          <p className="text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-green-500" />
            <span className="font-semibold">Bio:</span> {user.bio}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
