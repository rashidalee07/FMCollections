import React, { useState } from 'react'
import HomePage from './../components/HomePage'
import './addproduct.css'

function AddProductPage() {
const [formData, setFormData] = useState(new FormData());
// const [shouldUpload, setShouldUpload] = useState(false)
const [collectionImages, setSelectedFiles] = useState([]);
const [coverImage, setcoverImage] = useState(null);
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [collectionSeason, setSeason] = useState('');
const [available, setAvailable] = useState('');
const [colors, setColors] = useState([]);
const [size, setSize] = useState('');
const [quantity, setQuantity] = useState('');
const [productDescription, setProductDescription] = useState('');


const handleCoverImage =  (event) => {
    // const files = event.target.files;
    console.log(event.target.files[0])
     setcoverImage(event.target.files[0]);
    // console.log(coverImage)
}
const handlecollectionImages = (event) => {
    // const files = event.target.files;
    console.log(event.target.files)
    setSelectedFiles(event.target.files);
}

const handleSubmit =  async (event) => {
    event.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append('name',name)
    updatedFormData.append('price',price)
    updatedFormData.append('collectionSeason',collectionSeason)
    updatedFormData.append('available',available)
    updatedFormData.append('colors',colors)
    updatedFormData.append('size',size)
    updatedFormData.append('quantity',quantity)
    updatedFormData.append('productDescription',productDescription)
    updatedFormData.append('coverImage',coverImage)
    for(let i=0; i<collectionImages.length; i++)
    {
        updatedFormData.append('collectionImages',collectionImages[i]);
    }

    await setFormData(updatedFormData)
   
    let res;
    try {
         res =  await fetch('/api/v1/products', {
            method: 'POST',
            body: updatedFormData
        });
        console.log(res)
        
        // Handle the response
    } catch (error) {
        // Handle errors
        console.error('Error submitting the form:', error);
    }
    
   
};



  return (
    <div> 
    <HomePage />
    <div className='add-product-container'>
        <form method='POST' onSubmit={handleSubmit}>
            <div className='input-wrapper'>
                <label htmlFor='input-pn' >Product Name</label>
                <input 
                id='input-pn'
                className='product-input' 
                name='name' 
                type="text" 
                placeholder='FM Khaas 23' 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='input-price' >Price</label>
                <input 
                id='input-price' 
                className='product-input'
                name='price' 
                type="number" 
                placeholder='2099'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='input-season' >Season</label>
                <input 
                id='input-season' 
                className='product-input'
                name='season' 
                type="text" 
                placeholder='Winter'
                value={collectionSeason}
                onChange={(e)=>setSeason(e.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='input-stock' >Available</label>
                <input 
                id='input-stock' 
                className='product-input' 
                type="text"
                name='available' 
                placeholder='In Stock'
                value={available}
                onChange={(e)=>setAvailable(e.target.value)}
                />
            </div>

            <div className='input-wrapper'>
                <label htmlFor='input-colors' >Colors</label>
                <input 
                id='input-colors' 
                className='product-input' 
                name='colors'
                type="text" 
                placeholder='Red Green Blue'
                value={colors}
                onChange={(e)=>setColors(e.target.value)}
                />
            </div>

            <div className='input-wrapper'>
                <label htmlFor='input-size' >Size</label>
                <input 
                id='input-size' 
                className='product-input'
                name='size' 
                type="text" 
                placeholder='L M S' 
                value={size}
                onChange={(e)=>setSize(e.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='input-quantity' >Quantity</label>
                <input 
                id='input-quantity' 
                className='product-input'
                name='quantity' 
                type="number" 
                placeholder='20' 
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='input-text' >Product Description</label>
                <textarea 
                id='input-text' 
                className='product-text-area'
                name='productDescription' 
                type="text" placeholder='' 
                value={productDescription}
                onChange={(e)=>setProductDescription(e.target.value)}
                
                />
            </div>
    
            <div className='input-wrapper'>
                <label htmlFor='input-cover-image' >Upload Cover Image</label>
                <input id='input-cover-image' className='product-input' name='coverImage' type="file" placeholder='Cover Image' onChange={handleCoverImage} />
            </div>

            <div className='input-wrapper'>
                <label htmlFor='input-images' >Upload Multiple Images</label>
                <input id='input-images' className='product-input' name='collectionImages' type="file" multiple onChange={handlecollectionImages} placeholder='Upload Images' />
            </div>

            <div>
                <button type='submit' className='add-product-button'>Add Product</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddProductPage