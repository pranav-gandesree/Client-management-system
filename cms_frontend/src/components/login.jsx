import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { InputGroup, InputRightElement, Input } from "@chakra-ui/react";

const login = () => {
  const [show, setShow] = React.useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/dashboard");
      console.log("logged in ");
    } catch (error) {
      console.error("Error making request:", error);
      setError("Error making request");
    }
  };

  return (
    <>
      <div className=" ">
        <div className="text-warning">{error && error}</div>
        <h2 className="text-4xl text-black flex justify-center mb-8 ">
          Login Page
        </h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Your username
            </label>
            <Input
              placeholder="Enter your username"
              id="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Your password
            </label>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <Button colorScheme="blue" type="submit">
            Login..
          </Button>
        </form>
      </div>
    </>
  );
};

export default login;
