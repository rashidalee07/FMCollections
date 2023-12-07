import HomePage from '../components/HomePage'
import {useState, } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, addToCart, handleIncrement} from './actionsCart';
import axios from 'axios'

import './cart.css'
function CartPage() {
  const [quantity, setQuantity] = useState(1); // Set the quantity as needed
  let productsData = useSelector((state) => state.productsData)
  productsData = productsData && productsData.data && productsData.data.cartItems ? productsData.data.cartItems : [];
  // let cartData = useSelector((state) => state.cart)
  // cartData = cartData && cartData.data && cartData.data.cartItems ? cartData.data.cartItems : [];
  // console.log('From Cart:',cartData)
  const dispatch = useDispatch()


  const removeItemFromCart = (productId) => {
      
      // Make sure that you pass the correct product object to removeFromCart
// dispatch(removeFromCart({ _id: productId }));
dispatch(removeFromCart(productId));
  };

  
    const incrementProductQuantity = (productId, productQuantity,index) => {
       setQuantity(productsData[index].quantity);
      dispatch(handleIncrement(productId,quantity))
     
    };

  const incrementQuantity = (productId)=>{}

  

  const calculateTotal = () => {
    return productsData.reduce((total, product) => total + product.price * product.quantity, 0);
  };
   
  
  

  return (
   <>
   <HomePage/>
   <div className='heading-container'>
            <h3 className='heading-supplementry'>Your Cart</h3>
    </div>
    <div className="shopping-cart">
      <h2 className='cart-heading'>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => (
            <tr key={index}>
              <td className="product-cell">
                <div className="product-details">
                  <img src={`/images/${product.coverImage}`} alt="Product" />
                  <div className="product-info">
                    <span className="product-name">{product.name}</span>
                    <button className='cart-btn' onClick={() => removeItemFromCart(product._id)}><ion-icon name="trash-outline"></ion-icon></button>
                  </div>
                </div>
              </td>
 
              <td>Rs {product.price}</td>
              <td>
              {product.quantity > 1 ? (<button className='cart-btn' onClick={() => (product._id)}>-</button>) 
              :(<button className='cart-btn' onClick={() => removeItemFromCart(product._id)}><ion-icon name="trash-outline"></ion-icon></button>
)}
                {product.quantity}
                <button className='cart-btn' onClick={() => incrementProductQuantity(product._id, product.quantity,index)}>+</button>
              </td>
              <td>RS {(product.price)} </td>
            
            </tr>
           
          ))}
        </tbody>
      </table>
      <div className="total">
        <strong>Total: RS {calculateTotal().toFixed(2)}</strong>
      </div>
    </div>
   </>
  )
}

export default CartPage