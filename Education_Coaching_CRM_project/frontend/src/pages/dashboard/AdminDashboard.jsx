import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentServices";
import { getCourses } from "../../services/courseServices";
import { getInstructor } from "../../services/instructorService"; 
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]); 
    
    useEffect(() => {
        const fetchData = async () => {
            const studentsRes = await getStudents();
            const coursesRes = await getCourses();
            const instructorsRes = await getInstructor();

            setStudents(studentsRes);
            setCourses(coursesRes);
            setInstructors(Array.isArray(instructorsRes) ? instructorsRes : [instructorsRes]); 
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-4 md:p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

                    {/* Manage Students Section */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Manage Students</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                        students.map((student) => (
                                            <tr key={student._id} className="border-b hover:bg-gray-100">
                                                <td className="p-3">{student.name}</td>
                                                <td className="p-3">{student.email}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="p-3 text-gray-500 text-center">
                                                No students found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Manage Instructors Section */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Manage Instructors</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {instructors.length > 0 ? (
                                        instructors.map((instructor) => (
                                            <tr key={instructor._id} className="border-b hover:bg-gray-100">
                                                <td className="p-3">{instructor.name}</td>
                                                <td className="p-3">{instructor.email}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="p-3 text-gray-500 text-center">
                                                No instructors found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Manage Courses Section */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Manage Courses</h3>
                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="bg-blue-600 text-white p-4 md:p-5 rounded-lg shadow-lg border border-blue-300 hover:scale-105 transition-all duration-300"
                                    >
                                        <h4 className="text-md md:text-lg font-bold mb-2">{course.title}</h4>
                                        <p className="text-sm mb-3">{course.description}</p>
                                        <div className="border-t border-white mt-3 pt-3">
                                            <p className="text-sm">
                                                <span className="font-semibold">Students:</span>{" "}
                                                {course.students.length > 0
                                                    ? course.students.map((student) => student.name).join(", ")
                                                    : "No students enrolled"}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold">Instructor:</span>{" "}
                                                {Array.isArray(course.instructor)
                                                    ? course.instructor.map((instructor) => instructor.name).join(", ")
                                                    : course.instructor?.name || "No instructor assigned"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No courses available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
