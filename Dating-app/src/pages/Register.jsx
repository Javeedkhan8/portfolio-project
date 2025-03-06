import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password || !age || !gender || !city || !bio || !photo) {
      alert("All fields are required!");
      return;
    }

    const newUser = { name, email, password, age, gender, city, bio, photo };
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-20">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Profile 🌟</h2>
        <p className="text-gray-500 mb-4">Find your perfect companion</p>

        
        <div className="relative w-24 h-24 mx-auto mb-4">
          {photo ? (
            <img src={photo} alt="Profile Preview" className="w-24 h-24 rounded-full shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Photo
            </div>
          )}
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className=" w-full
          p-2 mt-3 -left-1 text-center mx-auto cursor-pointer border rounded-full" />
        </div>

        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mt-12 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <textarea
          placeholder="Short Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
        ></textarea>

        <button
          onClick={handleRegister}
          className="w-full bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
