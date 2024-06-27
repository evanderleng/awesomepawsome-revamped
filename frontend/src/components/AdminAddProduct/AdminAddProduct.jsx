import React from 'react'
import './AdminAddProduct.css'

const AdminAddProduct = () => {
  return (
    <div className='admin-add-product-container'>
        <div className="add-product-title">
            <h1>Add a Product</h1>
        </div>
        <form action="" className="add-product-form">
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
            <button>Add Product</button>

        </form>
    </div>
  )
}

export default AdminAddProduct
