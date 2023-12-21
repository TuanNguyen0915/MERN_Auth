import User from "../models/user.js"
import bcrypt from "bcryptjs"

// ---------------- Register -------------------
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    // check user exists or not
    // if exits, return error, create hashPassword otherwise
    if (user) {
      return res.status(404).json({ success: false, message: "This account already exist" })
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
    return res.status(500).json({success: false, message: 'Interval server error. Please, try again'})
  }
}

// ---------------- Login -------------------

export { register }
