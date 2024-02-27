const router = require("express").Router();
const adminMiddleware = require('../middlewares/admin')
const { Category, Customer } = require('../models/Customer')


router.post('/login', adminMiddleware, async (req, res) => {
  res.json({ loginStatus: true, message: 'Login successful' });
})

router.post('/add_category', async (req, res) => {
  try {
    const categoryName = req.body.name;

    if (!categoryName) {
      return res.status(400).send({
        success: false,
        message: 'Category name is required.',
      });
    } else {
      // Checking for duplicate entries in the database
      const existingCategory = await Category.findOne({ categoryName: categoryName });

      if (existingCategory) {
        return res.status(400).send({
          success: false,
          message: 'Category name already exists.',
        });
      }

      // Create a new category instance and save it to the database
      const newCategory = new Category({ categoryName: categoryName });
      // console.log('New Category Instance:', newCategory);

      await newCategory.save();
      // console.log('Category Saved to Database:', newCategory);

      res.status(200).send({
        success: true,
        message: 'Category added successfully.',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({
      success: false,
      message: 'Internal server error.',
    });
  }
});

router.get('/category', async (req, res) => {
  const categories = await Category.find({});
  return res.json({ success: true, categories: categories })
})


router.post('/add_customer', async (req, res) => {
    try {
      // console.log("Received Request Body:", req.body);

      const {
        name,
        email,
        receivedAmount,
        totalAmount,
        address,
        category,
        checkbox
      } = req.body;

      const newCustomer = new Customer({
        name,
        email,
        receivedAmount,
        totalAmount,
        address,
        category,
        checkboxValues: checkbox
      });

      await newCustomer.save();
      res.json({ success: true, Message: 'Client added successfully' });


    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, Error: 'client is not added' });
    }

});

router.get("/customer", async(req,res)=>{
  const customers = await Customer.find({});
  return res.json({ success: true, customers: customers })
})

router.delete("/delete_customer/:id",async(req,res)=>{
  let customerId =req.params.id;

  if(!customerId){
    return res.status(400).send("Please provide the id of the customer you want to delete")
  }
  
  try{
    const deletedCustomer=await Customer.findOneAndDelete({ _id : customerId });

    res.json({success:true , message:"Deleted Successfully"})
  }catch(err){
    return res.status(400).send(err);
  }
})

router.get('/customer/:id', async (req,res) =>{
  const customerId= req.params.id;
  const customer = await Customer.findById(customerId);
  if(customer){
    return res.json({ success: true, customer: customer })
  }else{
    return res.status(404).send("No customer with that ID");
  }

})


router.put('/edit_customer/:id', async (req, res) => {
  const customerId = req.params.id;
  const updatedCustomerData = req.body; 

  try {
    // Check if the employee with the given ID exists
    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update the employee data
    existingCustomer.name = updatedCustomerData.name;
    existingCustomer.email = updatedCustomerData.email;
    existingCustomer.address = updatedCustomerData.address;
    existingCustomer.category = updatedCustomerData.category;
    existingCustomer.totalAmount = updatedCustomerData.totalAmount;
    existingCustomer.receivedAmount = updatedCustomerData.receivedAmount;

    // Save the updated employee data
    const updatedCustomer = await existingCustomer.save();

    // Respond with success message or updated employee data
    res.json({ success: true, customer: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/customer_count', async (req, res) => {
  try {
    const count = await Customer.estimatedDocumentCount();
    res.json({ success: true, customerCount: count });
  } catch (error) {
    console.error('Error counting documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/total_count', async (req, res) => {
  try {
    // Calculate the sum of totalAmount and receivedAmount across all documents
    const totalAmountSum = await Customer.aggregate([
      {
        $group: {
          _id: null,
          totalAmountSum: { $sum: '$totalAmount' },
          receivedAmountSum: { $sum: '$receivedAmount' }
        }
      }
    ]);

    // totalAmountSum is an array, and you want to extract the first element
    const totalAmountResult = totalAmountSum[0]

    res.json({
      success: true,
      totalAmountSum: totalAmountResult.totalAmountSum,
      receivedAmountSum: totalAmountResult.receivedAmountSum
    });
  } catch (error) {
    console.error('Error counting total amount:', error);
    res.status(500).json({ error: 'sum Error' });
  }
});



module.exports = router;