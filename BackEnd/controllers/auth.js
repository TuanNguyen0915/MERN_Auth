import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwb from "jsonwebtoken"
import { errorHandler } from "../utils/errorHandler.js"

const generateToken = (user) => {
  return jwb.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

//* ---------------- REGISTER -------------------
const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    // check user exists or not
    if (user) {
      // next(errorHandler(404,'This account already exist'))
      return res.status(401).json({ success: false, message: "This account already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
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
      return res.status(401).json({ success: false, message: "Account does not exist." })
    }
    // check password matching
    const isPasswordMatching = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatching) {
      // return next(errorHandler(401,'Password not matching'))
      return res.status(404).json({ success: false, message: "Password not matching" })
    }
    //* create token if correct email nad password
    let token = generateToken(user)
    const {password, ...rest} = user._doc 
    // add token to browser cookie
    return res.cookie('access_toke', token, {httpOnly: true}).status(200).json({ success: true, accessToken: token, user: rest })
  } catch (error) {
    next(error)
  }
}

export { register, login }
