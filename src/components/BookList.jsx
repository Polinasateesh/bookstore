import React from 'react';
import { Button, Card, Grid } from '@mui/material';
import '../App.css'


const BookList = ({ books, onBookClick,addToCart }) => {
  console.log('books',books);
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.slice(0, maxLength)}...`;
    }
    return str;
  };
  const generateRandomPrice=()=>{
    const price=(Math.random()*100).toFixed(2)
   return price

  }
  
  return (
    
    <Grid container spacing={2} justifyContent="start" className='books-card-container'>
     {books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} xl={2} >
          <Card className='books-card'>
            <div>
            <img src={book.formats["image/jpeg"]} alt={book.title} style={{ width: '100%', height:'200px' }} />
            <p className='title'> Name : {truncateString(book.title,20)}</p>
            <p className='author'> Author :{book.authors&&truncateString(book.authors[0].name,20)}</p>
            <p className='price'> Price : ${generateRandomPrice()}</p>
            </div>
            <div className='button-container'>
              <Button variant='outlined' color='primary' size='small' onClick={() => onBookClick(book.id)} >Know More</Button>
              <div style={{ marginInline: '8px' }}></div>
              <Button variant='contained' color='success' size='small' onClick={()=>addToCart(book.id)}>Add To Cart</Button>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
};

export default BookList;
