import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react'

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    const apiUrl = 'http://localhost:3000/auth/category';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                setCategory(result.categories);
                // console.log(result.categories);
            } else {
                alert(result.Error);
            }
        })
        .catch(error => console.error('Error:', error));
  },[])
  
  return (
    <>
    <div>
      <h3 className='text-2xl flex justify-center'>category list</h3>
      <div>
        <Button as={NavLink} to="/dashboard/add_category" colorScheme='green'className='mb-4'>
            Add Category
        </Button>
      </div>
      <div className="mt-3">
          <table className="min-w-60 bg-white border border-gray-300">
              <thead className="bg-gray-100 border-b">
                  <tr>
                      <th className="py-2 px-4">Name</th>
                  </tr>
              </thead>
              {/* bg-[#898989]"> */}
              <tbody className="bg-blue-100">
                  {category.map((c, index) => (
                      <tr key={index}>
                          <td className="py-2 px-4">{c.categoryName}</td>
                      </tr>
                  ))}
              </tbody>
              
          </table>
    </div>

    </div>
    </>
  )
}

export default Category;
