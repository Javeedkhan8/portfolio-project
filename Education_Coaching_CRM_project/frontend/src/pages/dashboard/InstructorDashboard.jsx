import { useEffect, useState } from "react";
import { getInstructorCourses } from "../../services/instructorService"; 
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const InstructorDashboard = () => {
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Instructor Dashboard</h2>

               
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Assigned Courses</h3>
                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <div 
                                        key={course._id} 
                                        className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                                    >
                                        <h4 className="text-lg font-bold text-blue-600">{course.title}</h4>
                                        <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Enrolled Students:</span> {course.students.length}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">You are not assigned to any courses yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
