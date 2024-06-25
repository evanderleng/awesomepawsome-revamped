import React from 'react'
import './AdminDashboard.css'
import AdminAddProduct from '../../components/AdminAddProduct/AdminAddProduct'


const AdminDashboard = () => {
  return (
    <div className='admin-dashboard'>
      <AdminAddProduct />
    </div>
  )
}

export default AdminDashboard
