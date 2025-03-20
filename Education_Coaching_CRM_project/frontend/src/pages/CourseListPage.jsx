import { useEffect, useState } from "react";
import { getCourses } from "../services/courseServices";
import { enrollStudent } from "../services/courseServices";

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getCourses();
            setCourses(res);
        };
        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const studentId = localStorage.getItem("user");
    
            if (!studentId) {
                alert("User not logged in. Please log in first.");
                return;
            }
    
            if (!courseId) {
                console.error(" Invalid course ID:", courseId);
                alert("Invalid course selected. Please try again.");
                return;
            }
    
            console.log(" Enrolling Student ID:", studentId, "Course ID:", courseId);
            await enrollStudent(courseId, studentId);
            alert("Enrollment request sent!");
        } catch (error) {
            console.error("Enrollment failed:", error);
            alert("Failed to enroll. Try again.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h2>
                <input
                    type="text"
                    placeholder="Search for a course..."
                    className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                        .filter((course) => course.title.toLowerCase().includes(search.toLowerCase()))
                        .map((course) => {
                            return(
                            <div key={course._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                                <p className="text-gray-600 mt-2">{course.description}</p>
                                {/* <button
                                    onClick={() => handleEnroll(course._id)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Enroll Now
                                </button> */}
                            </div>
                            )
                      })}
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;
