import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userAuth_route from './Routes/user/authRoutes'
import mechAuth_route from './Routes/mech/authRoutes'
import adminAuth_route from './Routes/admin/authRoutes'
import admin_routes from './Routes/admin/adminRoutes'
import profile_routes from './Routes/user/profileRoutes'
import path from 'path';

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
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

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


app.use('/',userAuth_route)
app.use('/',profile_routes)
app.use('/mech',mechAuth_route)
app.use('/admin/auth',adminAuth_route)
app.use('/admin',admin_routes)



app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);  
})