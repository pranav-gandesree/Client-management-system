const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    receivedAmount:{
        type : Number , 
        default : 0,
        required: true
    },
    totalAmount:{
        type : Number , 
        default : 0,
        required: true
    },
    address: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    checkboxValues: [
        {
          type: String,
        },
      ],
});

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    }
});

// const checkboxSchema = new mongoose.Schema({
//     checkboxValues: [
//       {
//         type: String,
//       },
//     ],
//   });
  
// const Checkbox=  mongoose.model('Checkbox', checkboxSchema);

const Category = mongoose.model("Category", categorySchema);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer, Category};
