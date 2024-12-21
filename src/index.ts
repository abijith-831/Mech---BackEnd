import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userAuth_route from './Routes/user/authRoutes'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
}
  
app.use(cors(corsOptions));
app.use(express.json())


const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect('mongodb://localhost:27017/mech')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});


app.use('/user',userAuth_route)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);  
})