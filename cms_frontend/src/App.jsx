import { useState } from 'react'
import Login from './components/login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard';
import Customer from './components/Customer';
import Category from './components/Category';
import Home from './components/Home';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddCustomer  from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import Logout from './components/Logout';

function App() {

  return (
    <>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/dashboard" element={<Dashboard />} >

                <Route path='/dashboard/' element={<Home/>}></Route>
                <Route path='/dashboard/customer' element={<Customer/>}></Route>
                <Route path='/dashboard/category' element={<Category/>}></Route>
                <Route path='/dashboard/profile' element={<Profile/>}></Route>
                <Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
                <Route path='/dashboard/add_customer' element={<AddCustomer/>}></Route>
                <Route path='/dashboard/edit_customer/:id' element={<EditCustomer/>}></Route>
                <Route path='/dashboard/logout' element={<Logout/>}></Route>
            
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
