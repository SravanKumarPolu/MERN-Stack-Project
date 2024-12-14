import 'dotenv/config'

import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
//sravanpolume:username, pass:9OjiMDGPpOeln2Vy
//mongodb+srv://sravanpolume:9OjiMDGPpOeln2Vy@cluster0.zuxiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import cors from 'cors'
import express from 'express'
import userRouter from './routes/userRoute.js';

//App config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('server started on PORT:' + port))