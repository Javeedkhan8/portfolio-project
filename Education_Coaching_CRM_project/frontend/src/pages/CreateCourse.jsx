import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/courseServices";
import { getCurrentUser } from "../services/authServices";
import { getInstructor } from "../services/instructorService"; 
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const CreateCourse = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        instructor: "", 
    });

    const [instructors, setInstructors] = useState([]); 
    const [error, setError] = useState("");

    useEffect(() => {
        
        const fetchInstructors = async () => {
            try {
                const data = await getInstructor();
                setInstructors(data);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            }
        };

        fetchInstructors();
    }, []);

    if (!user || user.role !== "admin") {
        navigate("/");
        return null;
    }

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourse(courseData);
            navigate("/courses");
        } catch (error) {
            setError("Failed to create course: " + error.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Course</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={courseData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={courseData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                ></textarea>
                            </div>
                            {/* Instructor Dropdown */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Assign Instructor</label>
                                <select
                                    name="instructor"
                                    value={courseData.instructor}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                >
                                    <option value="">Select an Instructor</option>
                                    {instructors.map((instructor) => (
                                        <option key={instructor._id} value={instructor._id}>
                                            {instructor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Create Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
