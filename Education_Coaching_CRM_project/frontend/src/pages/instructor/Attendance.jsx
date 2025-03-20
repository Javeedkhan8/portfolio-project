import { useEffect, useState } from "react";
import { getInstructorAttendance } from "../../services/instructorService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const InstructorAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const res = await getInstructorAttendance();
            setAttendance(res);
        };
        fetchAttendance();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Instructor Attendance</h2>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Attendance Records</h3>

                        {attendance.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendance.map((record) => (
                                            <tr key={record._id} className="hover:bg-gray-100">
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {record.course ? record.course.title : "Unknown Course"}
                                                </td>
                                                <td className={`border border-gray-300 px-4 py-2 font-semibold 
                                                    ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                                                    {record.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">No attendance records available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorAttendance;
