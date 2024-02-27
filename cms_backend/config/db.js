const mongoose = require('mongoose');

const connectDB = async () =>{
    return mongoose
    .connect("mongodb+srv://pranav8267:KpaO4sbRzsT3cc69@cluster0.swcsww6.mongodb.net/cms_tcp")
    .then(()=> console.log("conneted to"))
    .catch((err)=> console.log(err));
}

module.exports = connectDB;

