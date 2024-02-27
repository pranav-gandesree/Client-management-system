import React,{useState} from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom';

const dashboard = () => {
  const handleLogout = ()=>{

  }
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="flex-none w-56  bg-[#3f3f63]">
        <div className="flex flex-col items-center p-2  sm:items-start text-black min-h-screen">
            <NavLink
              to="/dashboard"
              className="flex items-center pb-3 mb-1 mt-3 text-black text-decoration-none"
            >
              <span className="text-3xl font-bold hidden sm:inline text-[#ff0000] ml-3">
                Truecolors photography
              </span>
            </NavLink>

            <ul className="flex w-full flex-col mt-5">
            <li className={`w-full h-8 mb-2 hover:bg-[#6c7888] ${activeItem === 'dashboard' ? 'bg-red-500' : ''}`}>
                <NavLink to="/dashboard" className="flex items-center text-black" onClick={() => handleClick('dashboard')}>
                  <i className="text-lg bi-speedometer2"></i>
                  <span className="ml-2 hidden sm:inline text-white text-xl">Dashboard</span>
                </NavLink>
              </li>

              <li className={`w-full h-8 mb-2 hover:bg-[#6c7888] ${activeItem === 'manageClients' ? 'bg-red-500' : ''}`}>
                <NavLink
                  to="/dashboard/customer"
                  className="flex items-center text-black"
                  onClick={() => handleClick('manageClients')}
                >
                  <i className="text-lg bi-people"></i>
                  <span className="ml-2 hidden sm:inline  text-white text-xl">Manage Clients</span>
                </NavLink>
              </li>

              <li className={`w-full h-8 mb-2 hover:bg-[#6c7888] ${activeItem === 'Category' ? 'bg-red-500' : ''}`}>
                <NavLink
                  to="/dashboard/category"
                  className="flex items-center text-black"
                  onClick={() => handleClick('Category')}
                >
                  <i className="text-lg bi-columns"></i>
                  <span className="ml-2 hidden sm:inline  text-white text-xl">Category</span>
                </NavLink>
              </li>

              <li className={`w-full h-8 mb-2 hover:bg-[#6c7888] ${activeItem === 'Profile' ? 'bg-red-500' : ''}`}>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center text-black"
                  onClick={() => handleClick('Profile')}
                >
                  <i className="text-lg bi-person"></i>
                  <span className="ml-2 hidden sm:inline  text-white text-xl">Profile</span>
                </NavLink>
              </li>

              <li className={`w-full h-8 mb-2 hover:bg-[#6c7888] ${activeItem === 'Logout' ? 'bg-red-500' : ''}`}>
                <NavLink to="/dashboard/logout" className="flex items-center text-black"onClick={() => handleClick('Logout')}>
                  <i className="text-lg bi-power"></i>
                  <span className="ml-2 hidden sm:inline  text-white text-xl">Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-2">
          <div className="p-2 flex justify-center shadow">
            <h4 className='text-3xl m-2 pb-4'>Customer Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default dashboard
