import { Link } from "react-router-dom";
import HomePageImage from "../assets/HomePageImage.jpg"

const HomePage = () => {
    return (
        <div className="min-h-screen text-black bg-gray-100 flex flex-col items-center justify-center px-6">
            {/* Navbar */}
            <nav className="w-full max-w-6xl flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">TrackEdu</h1>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center max-w-6xl w-full text-center md:text-left">
                {/* Left Side Text */}
                <div className="md:w-1/2 space-y-4">
                    <h2 className="text-4xl font-bold">Better Learning Management with TrackEdu</h2>
                    <p className="text-lg">
                        Empowering educators and institutions to track student progress, manage enrollments, and
                        streamline coaching processes with ease.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <Link
                            to="/login"
                            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white text-yellow-700 px-6 py-3 rounded-lg hover:bg-green-700 hover:border-0 hover:text-white border-1 border-amber-400"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                    <img src={HomePageImage} alt="Education Management" className="w-full max-w-lg" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
