import React,{useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataSuccess} from './actionsCart';




function CartIcon() {

    const dispatch = useDispatch();
   
    // let numberOfItems = useSelector((state) => state.productsData.length= || 0);
    let numberOfItems =  2;
    
    useEffect(() => {
        dispatch(fetchUserDataSuccess());
    }, [dispatch]);
    
  // useEffect(() => {
  //   // Perform actions with updated userData here
  //   console.log(totalItemsInCart);
  // }, [totalItemsInCart]);
  

  return (
    <div className="cart-icon">
    <li>
      <ion-icon name="cart-outline"></ion-icon>
    </li>
    {numberOfItems > 0 && <span className="cart-badge">{numberOfItems}</span>}
  </div>
  )
}

export default CartIcon
