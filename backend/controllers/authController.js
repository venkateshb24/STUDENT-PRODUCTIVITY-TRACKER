const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require(jsonwebtoken);

const JWT_SECRET="my-secret-key";

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
};

exports.profile=async (req,res)=>{
  const user=await User.findById(req.user.userId).select("-password");

  if(!user){
    res.status(404).json({message:"User not found"});
  }

  res.json({user});
};