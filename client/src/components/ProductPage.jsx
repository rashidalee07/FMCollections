import {useEffect,useState}  from 'react'
import {useParams} from 'react-router-dom';
import './productpage.css'


function ProductPage() {
    const [backendData, setBackendData] = useState({});
    const [colImages, setCollectionImages] = useState([]); 
    const [title, setTitle] = useState('');
    
    // let imgPath = "images/";
    
     const {id} = useParams();
    useEffect(function() {
      // /api/v1/products?page=1&limit=3&sort=-price
      
      fetch(`/api/v1/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
         
        });
    }, [id]);

    useEffect(() => {
    
        if (backendData.data) {
          
           const imgPath  =`/images/`
          console.log(backendData.data.product.collectionImages)
          const newImgUrl = backendData.data.product.collectionImages.map((item) => {

            const imgName = item;
            return `${imgPath}${imgName}`;
          
          });
          setCollectionImages(newImgUrl)

          if(backendData.data)
          {
            document.title=backendData.data.product.name;
          }
        }
      }, [backendData.data]);

    
   
  return (
    <div> {typeof backendData.data==='undefined' ? (<p>Loading...</p>)
    :
    <div className='grid-col-2'>
    <div className='img-grid-col-2'>
      
      {/* <img src={imgCoverUrl} alt='Product' /> */}
      {colImages.map((image,i)=>(<figure key={i}><img src={image} alt='Product' /></figure>))}
      
      
     
    </div>
    <div className='container-div'>
     
     {/* {typeof backendData.data === 'undefined'? (<p>Loading...</p>) */}
     <div>{
     <ul>
        <li>Product: {backendData.data.product.name}</li>
        <li>Rs.{backendData.data.product.price} PKR</li>
        <li>Available: {backendData.data.product.available}</li>
        <li>Season: {backendData.data.product.collectionSeason}</li>
        <span> {backendData.data.product.colors
    .map(color => color.charAt(0).toUpperCase() + color.slice(1))
    .join(' ')}</span> </ul>
}</div>
    
    <div className='order-flex'>
   <div>
     <button className='button-circle'>-</button>
    <input value={1}/>
    <button className='button-circle'>+</button>
   </div>
    <button className='cart-button'>Add to Cart</button>
    <button className='favorite-icon'><ion-icon name="heart-outline"></ion-icon></button>
    </div> 
    <div>
    <button className='social-icon'><ion-icon name="logo-whatsapp"></ion-icon><span>Whatsapp to order</span></button>
    </div>  
    </div>
    </div>

}</div>  )
}

export default ProductPage