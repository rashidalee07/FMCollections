import React, { useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import HomePage from "./HomePage";
import FooterSection from "./FooterSection";
import Loader from "./Loader";
import ProductGridComponent from "./ProductGridComponent";
import './productgrid.css'
import {useSelector} from 'react-redux';

// import "./../App.css";


function ProductGrid() {

    const [backendData, setBackendData] = useState([{}]);
    const [imgUrl, setImgUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState('')
   
    
    const {page, limit} = useParams();

    // const currentPage = page || 1;
    // const itemsPerPage = limit || 21;
    
      useEffect(function (){
      
      async function fetchProducts() {
       try {
        setIsLoading(true); 
        // /api/v1/products?page=1&limit=3&sort=-price ?page=${currentPage}&limit=${itemsPerPage}
        const res = await fetch(`/api/v1/products`,
        {method:'GET', headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials:"include"
      }
        )
        // console.log(res)
        if(!res.ok) throw new Error("Something went wrong with fetching data")
        const data = await res.json()
        // works with single product
        // if(data.message==='fail') throw new Error('Unable to find product')
        // console.log(data.data[0])
        setBackendData(data);
        
       }catch(err) {
        console.error(err.message)
        setError(err.message)
       } finally{
        setIsLoading(false);
       }
    } 
      
      fetchProducts()
    
    }, []);  
    
    
    useEffect(function() {
    //   console.log(id)
        const imgPath = "images/";
  
      if (backendData.data) {
        const newImgUrl = backendData.data.map((item) => {
          const imgName = item.coverImage;
          return `${imgPath}${imgName}`;
        });
  
        setImgUrl(newImgUrl);
        // console.log(newImgUrl);
      }
    }, [backendData]);

    // useEffect(function(){
     
    // })

  return (
      <div>
          <HomePage />
         {isLoading && <Loader/>} 
        {!isLoading&&!error &&  <ProductGridComponent backendData={backendData} imgUrl={imgUrl}/>}
          {!isLoading && !error && <FooterSection/>}
            
        {error && <ErrorMessage message={error}/>}
</div>

  )
}


function ErrorMessage({message}){
  return (<p>{message}</p>)
}







export default ProductGrid