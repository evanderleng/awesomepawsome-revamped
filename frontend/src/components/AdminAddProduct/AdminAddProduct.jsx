import React from 'react'
import axiosInstance from '../../../axiosConfig'
import './AdminAddProduct.css'


const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let url = "/api/product/addProduct";
  axiosInstance.post(url, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    },
  })
      .then(res => {
        // console.log(res.data);
        alert(res.data.message);
      })
      .catch(err => {
        // console.log(err)
        if (err.response.data.path){ //path exists, let user know which input is incorrect
          alert(err.response.data.path+": "+err.response.data.message);
        } else {
          alert(err.response.data.message);
        }
      })

  
};

const AdminAddProduct = () => {
  return (
    <div className='admin-add-product-container'>
        <div className="add-product-title">
            <h1>Add a Product</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="add-product-form">
            <h3>Brand</h3>
            <input type="text" name='brand' placeholder='brand'/>
            <h3>Item Name</h3>
            <input type="text" name='name' placeholder='name'/>
            <h3>Weight (in kg)</h3>
            <input type="number" name='weight' placeholder='weight in kg'/>
            <h3>Price</h3>
            <input type="number" name='price' placeholder='price'/>
            <h3>Description</h3>
            <input type="text" name='description' placeholder='description'/>
            <h3>Ingredients</h3>
            <input type="text" name='ingredients' placeholder='ingredients'/>
            <h3>Pet Size</h3>
            <select name='petSize'>
              <option value="">Select pet size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            <h3>Pet Age Group</h3>
            <select name="petAge">
              <option value="">Select age group</option> 
              <option value="Puppy">Puppy</option>
              <option value="Junior">Junior</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
            <h3>Image</h3>
            <input type="file" name='product_image'/>
            <input type="hidden" name="csrf_token" value={sessionStorage.getItem("csrfToken")}></input>
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default AdminAddProduct
