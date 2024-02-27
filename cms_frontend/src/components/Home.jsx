import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card,CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text,Button } 
from "@chakra-ui/react";
import BarDiagram from "./BarDiagram";

const Home = () => {
  const [customerTotal, setcustomerTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const customerCount = () => {
    axios.get("http://localhost:3000/auth/customer_count").then((result) => {
      if (result.data.success) {
        setcustomerTotal(result.data.customerCount);
      }
    });
  };
  const totalCount = () => {
    axios.get("http://localhost:3000/auth/total_count").then((result) => {
      if (result.data.success) {
        setTotalAmount(result.data.totalAmountSum);
        setReceivedAmount(result.data.receivedAmountSum);
      }
    });
  };

  useEffect(() => {
    customerCount();
    totalCount();
  }, []);

  return (
    <>
      <div className="mt-4">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          <Card>
            <CardHeader>
              <Heading size="md"> Total Admins</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>1</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md"> Total Clients</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>{customerTotal}</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md"> Amount Spent </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>{receivedAmount +" rs"}</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Total Amount</Heading>
            </CardHeader>
            <CardBody>
              <Text color="blue.500">
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>{totalAmount +" rs"}</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </div>

      <div className="mt-4">
        <BarDiagram totalAmount ={3000} amountSpent= {4000}/>
      </div>
    </>
  );
};

export default Home;
