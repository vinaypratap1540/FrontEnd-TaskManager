import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../pages/navbar/Navbar.jsx'
const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout