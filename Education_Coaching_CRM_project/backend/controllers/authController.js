const { User } = require("../models/User");
const {Course} = require("../models/Course")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {generateToken } = require("../config/jwt");

const register = async (req, res) => {
    const { name, email, password, role, courseId } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, role, courses: [] };

        const user = await User.create(newUser);

        // Enroll student in a course if selected
        if (role === "student" && courseId) {
            const course = await Course.findById(courseId);
            if (course) {
                course.students.push(user._id);
                await course.save();
                user.courses.push(course._id);
                await user.save();
            }
        }

        res.json({ token: generateToken(user._id), user });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
        token,
        user: {  // Ensure the user object is sent
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};


const getUserRole = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select("role");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {register,login,getUserRole}