import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Tag  , InputLeftElement , Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import { Search2Icon} from '@chakra-ui/icons'

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/customer")
      .then((result) => {
        if (result.data.success) {
          setCustomer(result.data.customers)
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  const handleDelete = (customerId) => {
    axios
      .delete(`http://localhost:3000/auth/delete_customer/${customerId}`)
      .then((result) => {
        if (result.data.success) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(customer.length / 10)) {
      setCurrentPage(selectedPage);
    }
  };

  const filteredUsers = customer.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between ">
            <Button
              as={NavLink}
              to="/dashboard/add_customer"
              colorScheme="green"
              className="mt-8 mb-4 ml-4"
            >
              Add Client
            </Button>
            <div className="w-64 mt-8 mb-4 mr-12">
              <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <Search2Icon color='gray.300' />
                  </InputRightElement>
                  <Input type='tel' 
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>
            </div>
      </div>
        <h3 className="text-3xl flex justify-center mb-8 ml-4">Client's list</h3>
      <TableContainer className="w-full border-2 border-slate-400">
        <Table variant="simple" size="sm">
          <TableCaption fontSize="sm">Truecolors Photography</TableCaption>
          <Thead>
            <Tr >
              <Th fontSize="1xl" padding="6" >Name</Th>
              <Th fontSize="1xl" >Email</Th>
              <Th fontSize="1xl">Category</Th>
              <Th fontSize="1xl">Requirements</Th>
              <Th fontSize="1xl">Paidamount</Th>
              <Th fontSize="1xl">Totalamount</Th>
              <Th fontSize="1xl">Address</Th>
            </Tr>
          </Thead>


          <Tbody>
          {filteredUsers.slice((currentPage - 1) * 10, currentPage * 10).map((c) => (
              <Tr key={c._id}>
                <Td fontSize="md">{c.name}</Td>
                <Td fontSize="md">{c.email}</Td>
                <Td fontSize="md">{c.category}</Td>
                <Td>
                {c.checkboxValues.map((checkbox, index) => (
                        <div key={index} className="mt-3">
                          <Tag colorScheme='teal'>
                            {checkbox}
                          </Tag>
                        </div>
                    
                  ))}
                </Td>
                <Td fontSize="lg">{c.receivedAmount}</Td>
                <Td fontSize="lg">{c.totalAmount}</Td>
                <Td>{c.address}</Td>
                <Td>
                  <Button
                    as={NavLink}
                    to={`/dashboard/edit_customer/${c._id}`}
                    colorScheme="yellow"
                    className="mb-4 mr-4"
                  >
                    Edit
                  </Button>
                  <Button
                    // as={NavLink}
                    // to={`/dashboard/edit_customer/${c._id}`}
                    colorScheme="yellow"
                    className="mb-4 mr-4"
                  >
                    Profile
                  </Button>

                  <Button
                    colorScheme="red"
                    className="mb-4"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <span
          onClick={() => selectPageHandler(currentPage - 1)}
          className={currentPage > 1 ? '' : 'pagination__disable'}
        >
          ◀
        </span>
        {[...Array(Math.ceil(customer.length / 10))].map((_, i) => (
          <span
            key={i}
            className={currentPage === i + 1 ? 'pagination__selected' : ''}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        ))}
        <span
          onClick={() => selectPageHandler(currentPage + 1)}
          className={currentPage < Math.ceil(customer.length / 10) ? '' : 'pagination__disable'}
        >
          ▶
        </span>
      </div>

  </>
  );
};

export default Customer;
