import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Input, Button, FormLabel, Checkbox, Select, Alert, AlertIcon,} from "@chakra-ui/react";
  import { Textarea } from "@chakra-ui/textarea"

const AddCustomer = () => {
  //  const [checkboxValues, setCheckboxValues] = useState([]);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    receivedAmount: "",
    totalAmount: "",
    address: "",
    category: "",
    checkbox: [],
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

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
          // console.log(result.categories);
        } else {
          alert(result.Error);
          setMessage(result.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_customer", customer)
      .then((result) => {
        if (result.data.success) {
          // navigate("/dashboard/customer")
          setMessage("Customer added successfully!");
          setCustomer({
            name: "",
            email: "",
            receivedAmount: "",
            totalAmount: "",
            address: "",
            category: "",
            checkbox: [],
          });
        } else {
          alert(result.data.Error);
          // Update the message state with a generic error message
          setMessage("An error occurred while adding the customer.");
        }
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((err) => console.log(err));
    // console.log(customer);
  };

  const handleCancel = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      checkbox: checked
        ? [...prevCustomer.checkbox, value]
        : prevCustomer.checkbox.filter((item) => item !== value),
    }));
  };

  return (
    <>
      <div className="flex justifyCenter itemsCenter mt-3">
        <div className="p-4 m-6 rounded w-full  ">
          <h3 className="text-center text-3xl mt-0 mb-10">Add Employee</h3>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-1">
              <FormLabel htmlFor="inputName" className="form-label">
                Name
              </FormLabel>
              <Input
                variant="outline"
                placeholder="Enter Name"
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                id="inputName"
              />
            </div>
            <div className="col-span-1">
              <FormLabel htmlFor="inputEmail4" className="form-label">
                Email
              </FormLabel>
              <Input
                type="email"
                className="form-control rounded-0"
                id="inputEmail"
                placeholder="Enter Email"
                autoComplete="off"
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
            </div>
            <div className="col-span-1">
              <FormLabel htmlFor="inputPassword4" className="form-label">
                 Amount Spent
              </FormLabel>
              <Input
                type="text"
                className="form-control rounded-0"
                id="inputReceived"
                placeholder="Enter received amount"
                onChange={(e) =>
                  setCustomer({ ...customer, receivedAmount: e.target.value })
                }
              />
              </div>
              <div className="col-span-1">
              <FormLabel htmlFor="inputSalary" className="form-label">
                Total Amount
              </FormLabel>
              <Input
                type="text"
                className="form-control rounded-0"
                id="inputTotal"
                placeholder="Enter Total amount"
                autoComplete="off"
                onChange={(e) =>
                  setCustomer({ ...customer, totalAmount: e.target.value })
                }
              />
            </div>

            <div className="col-span-1">
              <FormLabel htmlFor="inputAddress" className="form-label">
                Address
              </FormLabel>
              <Input
                type="text"
                className="form-control rounded-0"
                id="inputAddress"
                placeholder="1234 Main St"
                autoComplete="off"
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
              />
            </div>
            
            <div className="col-span-1">
            <FormLabel htmlFor="date" className="form-label">
                Event Date
              </FormLabel>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                className="date"
              />
            </div>
            <div className="col-span-2">
            <FormLabel htmlFor="description" className="form-label">
                description
              </FormLabel>
              <Textarea placeholder="Here is a sample placeholder" id="description" />
            </div>

            <div className="col-span-2 mt-4">
              <Select
                placeholder="Category"
                name="category"
                id="category"
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


            <div className="col-span-2 mt-6">
              <FormLabel className="form-label">Requirements:</FormLabel>
              <ul>
                <li>
                  <Checkbox
                    type="checkbox"
                    name="checkboxValues"
                    value="CinematicVideo"
                    id="value1"
                    onChange={handleCheckboxChange}
                  >
                    Cinematic Video{" "}
                  </Checkbox>
                </li>
                <li>
                  <Checkbox
                    type="checkbox"
                    name="checkboxValues"
                    value="candid photos"
                    id="value2"
                    onChange={handleCheckboxChange}
                  >
                    {" "}
                    candid photos
                  </Checkbox>
                </li>
                <li>
                  <Checkbox
                    type="checkbox"
                    name="checkboxValues"
                    value="drone"
                    id="value3"
                    onChange={handleCheckboxChange}
                  >
                    LED
                  </Checkbox>
                </li>
                <li>
                  <Checkbox
                    type="checkbox"
                    name="checkboxValues"
                    value="LED"
                    id="value4"
                    onChange={handleCheckboxChange}
                  >
                    Drone{" "}
                  </Checkbox>
                </li>
              </ul>
            </div>

          
            
            <div className="mt-4 col-span-2">
              {message && (
                <Alert
                  status="success"
                  className={
                    message.includes("successfully")
                      ? "success-message"
                      : "error-message"
                  }
                >
                  <AlertIcon />
                  {message}
                </Alert>
              )}
            </div>
            <div className="col-span-2 mt-6">
              <Button type="submit" className="mr-4" colorScheme="green">
                Add customer
              </Button>
              <Button onClick={handleCancel} colorScheme="red">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

          
    </>
  );
};
export default AddCustomer;
