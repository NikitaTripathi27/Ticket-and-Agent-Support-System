import dotenv from "dotenv"
import app from "./app.js";
import { connectDB } from "./utils/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000

// connect to mongodb database
connectDB()
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}...`))