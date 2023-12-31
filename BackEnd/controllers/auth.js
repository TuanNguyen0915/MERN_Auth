import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwb from "jsonwebtoken"

const generateToken = (user) => {
  return jwb.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

//* ---------------- REGISTER -------------------
const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    // check user exists or not
    if (user) {
      return res.status(401).json({ success: false, message: "This account already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    req.body.photo = req.body.photo?req.body.photo :'https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png'
    // create user
    user = await User.create({
      name: req.body.name,
      password: hashPassword,
      email: req.body.email,
      photo: req.body.photo,
    })
    return res.status(201).json({ success: true, message: "Successful to create new account", user: user })
  } catch (error) {
    next(error)
  }
}

//* ---------------- LOGIN -------------------

const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    // check user by email
    if (!user) {
      return res.status(404).json({ success: false, message: "Account does not exist." })
    }
    // check password matching
    const isPasswordMatching = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatching) { 
      return res.status(401).json({ success: false, message: "Password not matching" })
    }
    //* create token if correct email nad password
    let token = generateToken(user)
    // set cookie expiryDate and don't show password for api 
    const {password, ...rest} = user._doc
    const expiryDate = new Date(Date.now() + 86400000) //1 day = 86400000 ms 
    // add token to browser cookie
    return res.cookie('token', token, {httpOnly: true, expires: expiryDate}).status(200).json({ success: true, message: "Login successful", token, user: rest })
  } catch (error) {
    next(error)
  }
}

const OAuth = async (req,res, next) => {
  try {
    let user = await User.findOne({email: req.body.email})
    if (user) {
      const token = generateToken(user._id)
      const {password, ...rest} = user._doc
      const expiryDate = new Date(Date.now() + 86400000) //1 day = 86400000 ms 
      return res.cookie('token', token, {httpOnly: true, expires: expiryDate}).status(200).json({ success: true, message: "Login successful", token, user: rest })
    } else {
      //generate Random password for first time and hashing
      const generatedPassword = Math.random().toString(36).slice(-8)  + Math.random().toString(36).slice(-8)
      const hashPassword = await bcrypt.hash(generatedPassword, 10)
      const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
        photo: req.body.photo
      })
      const token = generateToken(newUser._id)
      const {password, ...rest} = newUser._doc
      const expiryDate = new Date(Date.now() + 86400000) //1 day = 86400000 ms 
      return res.cookie('token', token, {httpOnly: true, expires: expiryDate}).status(200).json({ success: true, message: "Login successful", token, user: rest })
    }
  } catch (error) {
    next(error)
  }
}

export { register, login, OAuth }
