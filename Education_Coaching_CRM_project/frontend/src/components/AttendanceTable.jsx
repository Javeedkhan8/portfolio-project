import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../services/authService";

const API_URL = "http://localhost:2000/api/attendance";

const AttendanceTable = ({ courseId }) => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/${courseId}`, { headers: getAuthHeader() })
            .then((res) => setAttendance(res.data))
            .catch(console.error);
    }, [courseId]);

    const markAttendance = (studentId, status) => {
        axios.post(API_URL, { studentId, courseId, status }, { headers: getAuthHeader() })
            .then(() => {
                setAttendance(attendance.map(att => att.studentId === studentId ? { ...att, status } : att));
            })
            .catch(console.error);
    };

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {attendance.map((att) => (
                    <tr key={att.studentId}>
                        <td>{att.studentName}</td>
                        <td>{att.status}</td>
                        <td>
                            <button onClick={() => markAttendance(att.studentId, "Present")}>Present</button>
                            <button onClick={() => markAttendance(att.studentId, "Absent")}>Absent</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AttendanceTable;
