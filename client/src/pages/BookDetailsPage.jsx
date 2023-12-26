import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import { useSelector } from 'react-redux';

const BookDetailsPage = () => {
  const { id } = useParams();
  

  return (
    <>
      {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',width:'90%' }}> */}
        <BookDetails id={id} />
      {/* </div> */}
    </>
  );
};

export default BookDetailsPage;
