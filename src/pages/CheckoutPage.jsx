import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CheckoutPage = () => {

  const location =useLocation()
  const id=location.state.id

  const [cart, setCart] = useState([]);

  const books=useSelector((state)=>state.books.books)
  useEffect(() => {
    const filteredBooks = books.filter((eachBook) => eachBook.id === id);
    setCart((prevCart) => [...prevCart, ...filteredBooks]);
  }, [id]);
 





  const handleCheckout = (shippingInfo) => {
    // Implement checkout logic
    // Redirect to confirmation page or handle as needed
  };

  return (
    <div style={{marginTop:'30px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <ShoppingCart setCart={setCart}cart={cart} handleCheckout={handleCheckout}/>
     
    </div>
  );
};

export default CheckoutPage;
