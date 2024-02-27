import axios, { isCancel } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input, Button,
  FormLabel,
  Checkbox,
  Select 
} from '@chakra-ui/react'


const EditCustomer =()=> {
    const {id} = useParams()
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        receivedAmount: "",
        totalAmount: "",
        address: "",
        category: "",
        checkboxValues: [],
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

        
  const allPossibleCheckboxValues = ["LED", "drone", "candid photos", "CinematicVideo"];

  useEffect(() => {
    const apiUrl = "http://localhost:3000/auth/category";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setCategory(result.categories);
        } else {
          alert(result.Error);
        }
      })
      .catch((error) => console.error("Error:", error));

      axios.get(`http://localhost:3000/auth/customer/${id}`)

      .then(result => {
        setCustomer({
          ...customer,
          name: result.data.customer.name,
          email: result.data.customer.email,
          address: result.data.customer.address,
          totalAmount: result.data.customer.totalAmount,
          receivedAmount: result.data.customer.receivedAmount,
          category: result.data.customer.category,
          checkboxValues: result.data.customer.checkboxValues
        })
      }).catch(err => console.log(err))

      
  }, []);

  const handleCheckboxChange = (item) => {
    setCustomer((prevCustomer) => {
      const isChecked = !prevCustomer.checkboxValues.includes(item);
  
      let updatedCheckboxValues;
      if (isChecked) {
        // If checked, add to the array
        updatedCheckboxValues = [...prevCustomer.checkboxValues, item];
      } else {
        // If unchecked, remove from the array
        updatedCheckboxValues = prevCustomer.checkboxValues.filter(
          (value) => value !== item
        );
      }
      console.log(updatedCheckboxValues);
      console.log(customer);
      return {
        ...prevCustomer,
        checkboxValues: updatedCheckboxValues,
      };
    });
  };
  


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/auth/edit_customer/${id}`, customer, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(result => {
        if(result.data.success) {
          console.log("edited");
          console.log(result.data);
            // navigate('/dashboard/employee')
        } else {
            alert(result.data.error)
        }
    }).catch(err => console.log(err))
}


  return (
    <>
       <div className="flex justifyCenter itemsCenter mt-3">
        <div className="p-3 rounded w-1/2 border">
          <h3 className="text-center">Edit Customer</h3>
          <form className="grid grid-cols-1" onSubmit={handleSubmit}>
            <div className="col-span-12">
               <FormLabel htmlFor="inputName" className="form-label">
                Name
              </FormLabel>
              <Input variant='filled' placeholder='Enter Name'
              value={customer.name}
                   onChange={(e) =>
                    setCustomer((prevCustomer) => ({ ...prevCustomer, name: e.target.value }))
                }
               />
            </div>
            <div className="col-span-12">
            <FormLabel htmlFor="inputName" className="form-label">
                Email
              </FormLabel>
              <Input variant='filled'  id="inputEmail4"
                value={customer.email}
                placeholder="Enter Email"
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              } />
             
            </div>

            <div className="col-span-12">
              <FormLabel htmlFor="inputPassword4" className="form-label">
                Received amount
              </FormLabel>
              <Input
                type="text"
                variant="filled"
                className="form-control rounded-0"
                id="inputPassword4"
                value={customer.receivedAmount}
                placeholder="Enter received amount"
                onChange={(e) =>
                  setCustomer({ ...customer, receivedAmount: e.target.value })
                }
              />
              <FormLabel htmlFor="inputSalary" className="form-label">
                Total Amount
              </FormLabel>
              <Input
                type="text"
                variant="filled"
                className="form-control rounded-0"
                id="inputSalary"
                value={customer.totalAmount}
                placeholder="Enter Total amount"
                autoComplete="off"
                onChange={(e) =>
                  setCustomer({ ...customer, totalAmount: e.target.value })
                }
              />
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="inputAddress" className="form-label">
                Address
              </FormLabel>
              <Input
                type="text"
                variant="filled"
                className="form-control rounded-0"
                id="inputAddress"
                value={customer.address}
                placeholder="1234 Main St"
                autoComplete="off"
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
              />
            </div>

            <div className="col-span-12 mt-6">
              <FormLabel  className="form-label">
                  Requirements:
                </FormLabel>

                <ul>
                {allPossibleCheckboxValues.map((item) => (
                  <li key={item}>
                    <Checkbox
                      type="checkbox"
                      name="checkboxValues"
                      isChecked={customer.checkboxValues.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    >
                      {item}
                    </Checkbox>
                  </li>
                ))}
              </ul>



                {/* <ul>
                  <li>
                    <Checkbox type="checkbox" name="checkboxValues"
                    id='value1'
                     isChecked={customer.checkboxValues.includes("CinematicVideo")}
                     onChange={()=>{handleCheck }}             
                    >Cinematic Video </Checkbox>
                  </li>
                  <li>
                    <Checkbox type="checkbox" name="checkboxValues" value="candid photos"  id='value2' 
                      isChecked={customer.checkboxValues.includes("candid photos")}
                    > candid photos</Checkbox>
                  </li>
                  <li>
                    <Checkbox type="checkbox" name="checkboxValues" value="drone"  id='value3'
                    isChecked={customer.checkboxValues.includes("drone")}
                   >LED</Checkbox>
                  </li>
                  <li>
                    <Checkbox type="checkbox" name="checkboxValues" value="LED"  id='value4' isChecked={customer.checkboxValues.includes("LED")}>Drone </Checkbox>

                  </li>
                </ul>     */}
            </div>

            <div className="col-span-12 mt-6">
              <Select
                name="category"
                id="category"
                variant="filled"
                value={customer.category}
                className="form-select"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setCustomer({ ...customer, category: selectedCategory });
                }}
              >
                {category.map((c) => (
                  <option value={c.categoryName} key={c._id}>
                    {c.categoryName}
                  </option>
                ))}
              </Select>
            </div>


            <div className="col-span-12 mt-4">
            <Button type="submit" className="mr-4" colorScheme='yellow'>
                Edit customer
              </Button>
              <Button  onClick={() => navigate('/dashboard/customer')} colorScheme='red'>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
 }
export default EditCustomer
