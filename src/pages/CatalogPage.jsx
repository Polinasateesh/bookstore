import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { fetchBooks } from '../redux/reducers/bookslicer';

const CatalogPage = () => {

  
 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const books=useSelector((state)=>state.books.books)
 

  useEffect( () => {
    const isUserRegistered = JSON.parse(window.localStorage.getItem('userInfo'))
        const isLogin=window.localStorage.getItem('isLogedIn')
        console.log('isUserRegistered',isUserRegistered);
        console.log('isLogin',isLogin);
        if (isUserRegistered===null) {
           navigate('/');
        }else if (isLogin==='false'){
            console.log('isLogin',typeof( isLogin))
            navigate('/Login')
        }else{

        }
    const fetchData=async()=>{
      const response=await axios.get('https://gutendex.com/books')
   
      dispatch(fetchBooks( response.data.results))

    }
    fetchData()
    
  }, []);


  const onBookClick=(id)=>{
    navigate(`/book/${id}`)
  }

  const addToCart=(id)=>{
    navigate('/checkout',{state:{id:id}})
  }

  const onSearch= async(search)=>{
    console.log('search',search);
    const response=await axios.get(`https://gutendex.com/books?search=${search}`)
   
    dispatch(fetchBooks( response.data.results))


  }

  return (
    <div>
    <div style={{display:'flex',justifyContent:'flex-end'}}>
    <SearchBar onSearch={onSearch}/>

    </div>
   
      <BookList books={books} onBookClick={onBookClick} addToCart={addToCart} />
    </div>
  );
};

export default CatalogPage;
