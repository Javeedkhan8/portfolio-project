import { useState, useEffect } from "react";
import { getCourses, enrollStudent } from "../services/courseServices";
import { getUsers } from "../services/adminServices";
import { getCurrentUser } from "../services/authServices";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Enrollment = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [message, setMessage] = useState("");

    const [user, setUser] = useState(getCurrentUser()); // Store user in state

    useEffect(() => {
        if (!user || user.role !== "admin") {
            setMessage("Access Denied: Only admins can access this page.");
            return;
        }

        const fetchData = async () => {
            try {
                const courseData = await getCourses();
                setCourses(courseData);
                const studentData = await getUsers();
                setStudents(studentData.filter((user) => user.role === "student"));
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("Failed to load data.");
            }
        };

        fetchData();
    }, [user]); // Dependency on user state

    const handleEnrollment = async () => {
        if (!selectedCourse || !selectedStudent) {
            setMessage("Please select a course and a student.");
            return;
        }

        try {
            console.log("Enrolling student:", selectedStudent, "in course:", selectedCourse);
            const response = await enrollStudent(selectedCourse, selectedStudent);
            console.log("Enrollment Response:", response);
            setMessage(response.message || "Student enrolled successfully!");
        } catch (error) {
            console.error("Enrollment failed:", error.response?.data || error);
            setMessage("Enrollment failed. Please try again.");
        }
    };

    if (!user || (user.role !== "admin" && user.role !== "instructor")) {
        return <div className="p-4 text-red-600">{message}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Enroll Student</h2>

                    {message && <p className="mb-4 text-red-600">{message}</p>}

                    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Select Course:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">-- Select a Course --</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Select Student:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                <option value="">-- Select a Student --</option>
                                {students.map((student) => (
                                    <option key={student._id} value={student._id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                            onClick={handleEnrollment}
                        >
                            Enroll Student
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enrollment;
