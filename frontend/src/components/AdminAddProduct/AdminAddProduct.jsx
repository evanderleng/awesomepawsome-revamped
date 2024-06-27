import React from 'react'
import axiosInstance from '../../../axiosConfig'
import './AdminAddProduct.css'


const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let url = "http://127.0.0.1:4000/api/product/addProduct";
  axiosInstance.post(url, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    },
  })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
};


const AdminAddProduct = () => {
  return (
    <div className='admin-add-product-container'>
        <div className="add-product-title">
            <h1>Add a Product</h1>
        </div>
        <form enctype="multipart/form-data" onSubmit={handleSubmit} className="add-product-form">
            <h3>Brand</h3>
            <input type="text" name='brand' placeholder='brand'/>
            <h3>Item Name</h3>
            <input type="text" name='name' placeholder='name'/>
            <h3>Weight</h3>
            <input type="text" name='weight' placeholder='weight'/>
            <h3>Price</h3>
            <input type="text" name='price' placeholder='price'/>
            <h3>Description</h3>
            <input type="text" name='description' placeholder='description'/>
            <h3>Ingredients</h3>
            <input type="text" name='ingredients' placeholder='ingredients'/>
            <h3>Breed Size</h3>
            <input type="text" name='breedSize' placeholder='breed size'/>
            <h3>Image</h3>
            <input type="file" name='product_image'/>
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default AdminAddProduct
