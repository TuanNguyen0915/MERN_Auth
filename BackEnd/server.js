import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

// import database
import "./configs/database.js"

const app = express()
const PORT = process.env.PORT
const corsOption = {
  origin: true,
}

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
