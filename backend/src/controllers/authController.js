import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
  );
};

export const register = async (req, res) => {

  console.log(req.body);

  const { username, email, password } = req.body;
  try{

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email })
    if(userExists){
      return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json(
      {
      token: generateToken(newUser._id),
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email
      }
    }
    );
  } catch (error) {
    console.log("error in register:", error);
    res.status(500).json({message: "Server Error"});
  }
}

export const login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  const { email, password } = req.body;

  try{
      if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log("USER FOUND:", user);

    if(!user){
      return res.status(400).json({message: "Invalid Credentials"})
    }

    console.log("HASHED PASSWORD:", user.password);

    const isMatch = await bcrypt.compare(password, user.password)

    console.log("PASSWORD MATCH:", isMatch);

    if(!isMatch){
      return res.status(400).json({message: "Invalid Credentials"})
    }

    const token = generateToken(user._id);
    console.log("TOKEN GENERATED");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
    })
  } catch(error){
    console.log("error in login:", error);
    res.status(500).json({message: "Server Error Login controller"});
  }
}