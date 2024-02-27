const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());    
app.use('/auth', require('./Routes/adminRoutes'));

app.listen(3000, async () => {
    await connectDB();
    console.log("Server is running");
});
