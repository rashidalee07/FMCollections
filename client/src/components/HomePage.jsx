import React from 'react'
// import {faHeart} from 'react/fa'
import {Link} from 'react-router-dom'
import CartIcon from '../cart/cartIcon';
// import AddProductPage from '../pages/AddProductPage';
// import ProductGrid from './ProductGrid'

import './homepage.css'

const inlineStyle = {'text-decoration':'none'};
function HomePage() {
  
 
  // let items;
  // if(userData!=null){
  //   items = userData.data.length
  //   console.log('from homepage',userData)
  // }
 
  return (
   <div className='main-nav'>
   <Link style={inlineStyle} to='/'><h1 className='heading-primary-large'>FM</h1></Link>
   <ul className='nav-items-d'>
   <Link style={inlineStyle} to='/'><li>Home</li></Link>
   <Link style={inlineStyle} to='/products'><li>Products</li></Link>
   </ul>
    <input className='search-bar' placeholder='Search Product'/>
    <nav className='nav-bar'>
    <ul className='nav-items'>
    <Link  style={inlineStyle} to="/auth/login"><li><ion-icon  name="person-outline"></ion-icon></li></Link>
    <Link className="cart-icon" style={inlineStyle} to="/cart">
      <CartIcon/>
    </Link>
    <Link style={inlineStyle}to="/your-wishlist"><li><ion-icon  name="heart-outline"></ion-icon></li></Link> 
    <Link style={inlineStyle} to='/add-product'><li><ion-icon  name="bag-outline"></ion-icon></li></Link> 
    </ul>
    </nav>
   </div>
  )
}

export default HomePage