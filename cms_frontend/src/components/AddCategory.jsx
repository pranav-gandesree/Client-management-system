import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";

const AddCategory = () => {

  const [category, setCategory] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = 'http://localhost:3000/auth/add_category';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: String(category)}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                navigate('/dashboard/category');
            } else {
                alert(result.message);
            }
        })
        .catch(error => console.error('Error:', error));
    };


  return (
    <>
      <div className='flex justify-center items-center h-75'>
          <div className='p-3 rounded w-1/4 border mt-10'>
              <h2 className='text-2xl font-bold mb-4'>Add Category</h2>
              <form onSubmit={handleSubmit} className='mb-3'>
                  <div className='mb-2'>
                        <Input
                                placeholder='Enter Category'
                                name='category'
                                id="username"
                                onChange={(e) => setCategory(e.target.value)} 
                      />
                  </div>
                  {/* <button className='btn btn-success w-full rounded-0 mb-2'>Add Category</button> */}
                  <Button colorScheme='green'className=' mt-4' type='submit'>
                           Add Category
                 </Button>
              </form>
          </div>
      </div>
    </>
  )
}

export default AddCategory
