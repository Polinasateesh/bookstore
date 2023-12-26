import { Card, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css'


const BookDetails = ({ id }) => {
  console.log('id', id);
  const [book, setBook] = useState({});
  const books = useSelector((state) => state.books.books);
  const navigate = useNavigate()

  useEffect(() => {

    const getBooks = books.filter((each) => each.id === parseInt(id));

    // if (getBooks.length > 0) {
    setBook(getBooks[0]);
    // }
  }, []);

  console.log('book', book);

  const backToCatalogPage = () => {
    navigate('/Catalog')

  }



  return (
    <>
    <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '90%', height: '90%', backgroundColor: ' #FFFFFF', margin: '20px', padding: '5px' }}>
     
      <Grid container spacing={2} >
     
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
       
          <img src={book.image}alt={book.title} style={{ width: '100%', height: '80vh' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
          <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} >
            <div>
              <p>Title : <span>{book.title}</span></p>
              <p>Author :<span> {book.author && book?.author}</span></p>
              <p>Price : <span>${book.price}</span></p>
              <p>Rating : <span>{book.rating}</span></p>
              <p>Category : <span>{book.category}</span></p>
            </div>
            <div>
              <Button variant='contained' onClick={backToCatalogPage}  >⬅️Back</Button>
            </div>
          </div>
        </Grid>
      </Grid>

    </Card>
    </>
  );
};

export default BookDetails;

