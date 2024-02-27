import React from 'react'
import { NavLink } from 'react-router-dom'
import Check from './Checkbox'


const Logout = () => {
      
  return (
    <>
    <NavLink to={'/'}>LogOut</NavLink>
    <Check/>

    </>
  )
}

export default Logout
