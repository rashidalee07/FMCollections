import React,{useState} from 'react'
import {Link} from 'react-router-dom'
function ProductGridComponent({backendData, imgUrl}) {
  const [isFavorite, setIsFavorite]= useState(false);
  const addToFavorites = (productId)=>{
    
    fetch(`/api/v1/users/favorites/${productId}`, {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
    })
    setIsFavorite(true)
  }

  const addToCart = (productId) =>{
    fetch(`/api/v1/users/cart/${productId}`, {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
    })
  }

  return (
    <div>
            <div className="product-grid">
                {typeof backendData.data === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  backendData.data.map((product, i) => (
                    <div key={i} className="product-card">
                      <div className="img-container">
                      <figure >
                        <Link to={`/products/${product._id}`}>
                        <img 
                          className="product-image"
                          src={imgUrl[i]}
                          alt='Cover'
                        />
                        </Link>
                      </figure>
                     
                      <button className='grid-fav-btn'onClick={()=>addToFavorites(product._id)}>{isFavorite?<ion-icon  name="heart"></ion-icon>:<ion-icon  name="heart-outline"></ion-icon>}</button>
                      <div className='message'>Add to wishlist</div>
                     </div>
                      <div className="short-detail">
                      <ul className="prod-short-detail">
                        <li><strong>{product.name}</strong></li>
                        <li>RS. {product.price} PKR</li>
                      </ul>
                      <button className='cart-button' onClick={()=>addToCart(product._id)}>Add to cart</button>
                    </div>
                    </div>
                    
                  ))
                )}
                
              </div>
              </div>
          
  )
}

export default ProductGridComponent