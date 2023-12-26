import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { CartDetails } from '../redux/reducers/bookslicer';


const CheckoutPage = () => {

  const dispatch=useDispatch()
  const cart=useSelector((state)=>state.books.cart)
  useEffect(() => {
   
    fetchingCartDetails()
   
  }, []);

  const fetchingCartDetails=async()=>{
    const response = await axios.get("http://localhost:5000/fetchingCartDetails");
    console.log('response',response.data)
     await dispatch(CartDetails(response.data))
  }
  const handleDeleteData = async (id) => {
    console.log('id',id)
    try {
        const response = await axios.delete('http://localhost:5000/deleteItem', {  data: { id: id } });

        if (response.data && response.data.message) {
            // toast.success(response.data.message, {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 500,
            // })
            
            fetchingCartDetails()
        } else {
            console.log('Error deleting data:', response.error);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
  return (
    <div style={{marginTop:'30px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <ShoppingCart cart={cart} handleDeleteData={handleDeleteData}/>
     
    </div>
  );
};

export default CheckoutPage;
