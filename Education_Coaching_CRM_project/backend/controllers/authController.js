const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const {generateToken } = require("../config/jwt");

const register = async (req,res) => {
    const {name, email, password, role} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message:"User already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name,email, password:hashedPassword,role});

    res.json({token: generateToken(user._id)});
}

const login = async (req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({message: "Invalid credential"});
    }

    res.json({token:generateToken(user._id)})
}

module.exports = {register,login}