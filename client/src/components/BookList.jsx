import React from 'react';
import { Button, Card, Grid } from '@mui/material';
import '../App.css';

const BookList = ({ books, onBookClick, addToCart }) => {
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.slice(0, maxLength)}...`;
    }
    return str;
  };





  return (
    <Grid container spacing={2} justifyContent="start" className='books-card-container'>
      {books.map((book) => (
        <Grid item key={book.id} xs={books.length <= 2 ? 12 : 12} sm={books.length <= 2?6:6} md={books.length <= 2?6:6} lg={books.length <= 2?6:3} xl={books.length <= 2?6:2}>
          <Card className='books-card'>
            <div className='card-content'>
              <img src={book.image} alt={book.title} style={{ width: '100%', height: '200px' }} />
              <p className='title'> Name : {truncateString(book.title, 20)}</p>
              <p className='author'> Author : {book.author && truncateString(book.author, 20)}</p>
              <p className='price'> Price : ${book.price}</p>
            </div>
            <div className='button-container'>
              <Button variant='outlined' color='primary' size='small' onClick={() => onBookClick(book.id)}>Know More</Button>
              <div style={{ marginInline: '8px' }}></div>
              <Button variant='contained' color='success' size='small' onClick={()=>addToCart(book)}>Add To Cart</Button>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
