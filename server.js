const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const testRoutes = require('./routes/testRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const resturantRoutes = require('./routes/resturantRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js');
const foodRoutes = require('./routes/foodRoutes.js');
const connectDB = require('./config/db.js')

//config dotenv
dotenv.config();

const app = express();

//PORT
const PORT = process.env.PORT;

connectDB();

//middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/resturant', resturantRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/food', foodRoutes);

//route
app.get('/', (req,res)=>{
    return res.status(200).send('<h1>Welcome to FoodApp Server</h1>')
})

//Listen 
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
