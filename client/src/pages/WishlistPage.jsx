import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'; 
import HomePage from '../components/HomePage'
import './wishlist.css'

function WishlistPage() {
    const [backendData, setBackendData] = useState([{}]);
    const [imagesUrl, setImgUrl] = useState([]);
    useEffect(function (){
      
        async function fetchFavoriteProducts() {
         try {
        //   setIsLoading(true); 
          // /api/v1/products?page=1&limit=3&sort=-price ?page=${currentPage}&limit=${itemsPerPage}
          const res = await fetch(`/api/v1/users/your-favorites`,
          {method:'GET', headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        //   credentials:"include"
        }
          )
          // console.log(res)
          if(!res.ok) throw new Error("Something went wrong with fetching data")
          const data = await res.json()
          setBackendData(data.data.user.favoriteProducts)
        console.log(data.data.user.favoriteProducts)
         }catch(err) {
          console.error(err.message)
        //   setError(err.message)
         } finally{
        //   setIsLoading(false);
         }
      } 
        
      fetchFavoriteProducts()
      
      }, []);

      useEffect(function() {
        //   console.log(id)
            const imgPath = "images/";
            let newImgUrl;
          if (backendData) {
             newImgUrl = backendData.map((item) => {
              const imgName = item.coverImage;
            //   item.price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              return `${imgPath}${imgName}`;
            });
      
            setImgUrl(newImgUrl);
            console.log(newImgUrl);
          }
        }, [backendData]);
    
     const removeFromFavorites = async(productId) =>{
        const filteredArray = backendData.filter(item =>item._id!==productId);
        setBackendData(filteredArray);
        const res= await fetch(`/api/v1/users/favorites/${productId}`, {
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
        });

        const data = await res.json();
        console.log(data)
     }


    
  return (
    <div>
        <HomePage/>
        <div className='heading-container'>
            <h3 className='heading-supplementry'>Your Wishlist</h3>
        </div>

    {/* <div> */}
        <div className="product-grid">
                {typeof backendData=== "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  backendData.map((product, i) => (
                    <div key={i} className="product-card">
                      <div className="img-container">
                      <figure >
                        <Link to={`/products/${product._id}`}>
                        <img 
                          className="product-image"
                          src={imagesUrl[i]}
                          alt='Cover'
                        />
                        </Link>
                      </figure>
                     
                      <button className='grid-fav-btn'onClick={()=>removeFromFavorites(product._id)}><ion-icon name="trash-outline"></ion-icon></button>
                     
                      <div className='message'>Remove from wishlist</div>
                      </div>
                      <div className="short-detail">
                      <ul className="prod-short-detail">
                        <li><strong>{product.name}</strong></li>
                        <li>RS. {product.price} PKR</li>
                      </ul>
                      <button className='cart-button'>Add to cart</button>
                    </div>
                    </div>
                    
                  ))
                )}
                
              </div>   
    {/* </div> */}
    </div>
  )
}

export default WishlistPage