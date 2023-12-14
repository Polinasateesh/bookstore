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
    <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '90%', height: '100vh', backgroundColor: '#FF9933 #FFFFFF #138808', margin: '20px', padding: '5px' }}>
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
          <img src={book.formats && book.formats["image/jpeg"]} alt={book.title} style={{ width: '100%', height: '80vh' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
          <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} >
            <div>
              <p>Title : <span>{book.title}</span></p>
              <p>Author :<span> {book.authors && book?.authors[0]?.name}</span></p>
              <p>Price : <span>${book.price}</span></p>
              <p>Subjects : <span>{book.subjects && book.subjects.map((subject) => (<ul key={subject}><li>{subject}</li></ul>))}</span></p>
              <p>Languages:<span> {book.languages && book.languages.length > 0 && book.languages[0]?.toUpperCase()}</span></p>

            </div>
            <div>
              <Button variant='contained' onClick={backToCatalogPage}  >⬅️Back</Button>

            </div>

          </div>



        </Grid>
      </Grid>

    </Card>
  );
};

export default BookDetails;

