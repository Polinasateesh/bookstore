import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BookList from "../components/BookList";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/reducers/bookslicer";
import loader from "../assets/loader.gif";

const CatalogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  console.log("books", books);
  useEffect(() => {
    const jwtToken = window.localStorage.getItem('jwtToken')
    const isRegister = window.localStorage.getItem('isRegister')
    if (isRegister!=='true') {
        navigate('/');
    } else if (!jwtToken) {
        navigate('/Login');
    } else {
      navigate('/Catalog')
        
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetchingAllBooks");
      dispatch(fetchBooks(response.data));
      setIsLoading(false);
      } catch (error) {
        console.log('Error',error)
      }
      
    };
    fetchData();
  }, []);

  const onBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const addToCart = async (book) => {
    try {
      console.log('book', book)
      const response = await axios.post("http://localhost:5000/addTocart", book)
      navigate("/checkout");
    }  catch (error) {
      console.log('Error',error)
    }
  };

  const onSearch =async (event) => {
    setSearchTerm(event.target.value);
    try{
    const response = await axios.get(`http://localhost:5000/search?query=${event.target.value}`)
    console.log('response', response);
      dispatch(fetchBooks(response.data));
    } catch (error) {
      console.log('Error',error)
    }

    
  };

  const selectCategory = async (event, selectedOption) => {
    try{
    const response = await axios.get(`http://localhost:5000/category?selectedOption=${selectedOption.label}`)
    console.log('response', response);
      dispatch(fetchBooks(response.data));
    } catch (error) {
      console.log('Error',error)
    }
    
  };
  if (isLoading) {
    return (
      <img
        src={loader}
        alt={"loader"}
        
      />
    );
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginRight: "auto",
            justifyContent: "flex-end"
          }}
        >
          <SearchBar
            onSearch={onSearch}
            searchTerm={searchTerm}
            selectCategory={selectCategory}
          />
        </div>

        <BookList
          books={books}
          onBookClick={onBookClick}
          addToCart={addToCart}
        />
      </div>
    );
  }
};

export default CatalogPage;
