import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

// import database
import "./config/database.js"

// import routes
import { router as authRouter } from "./routes/auth.js"

const app = express()
const PORT = process.env.PORT || 3001


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// handle error
app.use((err, req,res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Interval Server Error'
  return res.status(statusCode).json({
    success: false, message, statusCode
  })
})


// routes
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
