import { useEffect, useState } from "react";
import { getInstructorCourses } from "../../services/instructorService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getInstructorCourses();
            setCourses(res);
        };
        fetchCourses();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    {/* Page Title */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Instructor Courses
                    </h2>

                    {/* Course List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            Your Assigned Courses
                        </h3>

                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="bg-purple-500 text-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                                    >
                                        <h4 className="text-lg font-semibold">{course.title}</h4>
                                        <p className="text-sm opacity-90 mt-1">
                                            {course.description || "No description available"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-2">No assigned courses.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCourses;
