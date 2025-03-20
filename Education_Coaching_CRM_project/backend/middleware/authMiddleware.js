const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config()

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Extracted Token:", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("Decoded Token Data:", decoded);

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                console.log("User not found in DB");
                return res.status(401).json({ message: "User not found" });
            }

            console.log("Authenticated User:", req.user);
            next();
        } catch (error) {
            console.error("JWT Authentication Error:", error.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

const studentAuth = (req, res, next) => {
    if (req.user && req.user.role === "student") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, students only" });
    }
};

 const instructorAuth = (req, res, next) => {
    if (req.user && req.user.role === "instructor") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, instructors only" });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};



module.exports = {protect,studentAuth,instructorAuth,isAdmin}