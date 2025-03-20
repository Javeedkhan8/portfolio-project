import { useEffect, useState } from "react";
import { getStudents } from "../services/studentServices";

const StudentListPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await getStudents();
            setStudents(res);
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>{student.name} - {student.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentListPage;
