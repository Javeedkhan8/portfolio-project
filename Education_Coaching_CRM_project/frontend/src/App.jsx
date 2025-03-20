import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentListPage from "./pages/StudentListPage";
import CourseListPage from "./pages/CourseListPage";
import { useState, useEffect } from "react";
import { getUserRole } from "./services/authServices";
import Users from "./pages/admin/Users"
import Payments from "./pages/admin/Payments"
import Reports from "./pages/admin/Reports"
import InstructorCourses from "./pages/instructor/Courses";
import InstructorAttendance from "./pages/instructor/Attendance";
import Enrollment from "./pages/Enrollment";
import CreateCourse from "./pages/CreateCourse";
import ChatBox from "./components/ChatBox";
import PaymentForm from "./components/PaymentForm";
 
function App() {
    const [role, setRole] = useState(localStorage.getItem("role") || "");

    useEffect(() => {
        const fetchRole = async () => {
            const storedRole = localStorage.getItem("role");  
            if (!storedRole) {
                const userRole = await getUserRole();
                if (userRole) {
                    setRole(userRole);
                    localStorage.setItem("role", userRole);
                }
            } else {
                setRole(storedRole);
            }
        };
        fetchRole();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                
                <Route path="/dashboard" element={
                    role === "student" ? <Navigate to="/dashboard/student" /> :
                    role === "instructor" ? <Navigate to="/dashboard/instructor" /> :
                    role === "admin" ? <Navigate to="/dashboard/admin" /> :
                    <Navigate to="/login" replace />
                } />

                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />

                <Route path="/admin/users" element={<Users/>}/>
                <Route path="/admin/payments" element={<Payments/>}/>
                <Route path="/admin/reports" element={<Reports/>}/>

                <Route path="/students" element={<StudentListPage />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/chat" element={<ChatBox/>}/>
                <Route path="/courses" element = {<CourseListPage/>}/>
                <Route path="/instructor/courses" element={<InstructorCourses/>}/>
                <Route path="/instructor/attendance" element={<InstructorAttendance/>}/>
                <Route path="/admin/enroll" element={<Enrollment />} />
                <Route path = "/admin/create-course" element={<CreateCourse/>}/>


            </Routes>
        </Router>
    );
}

export default App;
