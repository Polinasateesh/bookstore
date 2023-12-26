const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create a connection to  database
const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore"
});

// Checking database conntection

DB.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  } else {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`The App is Running at ${port}`);
    });
  }
});

app.post('/register', (request, response) => {
  try {
      const { firstName, lastName, userName, password } = request.body;

      // Check if the userName already exists
      const checkQuery = `SELECT id FROM register WHERE userName = ?`;
      DB.query(checkQuery, [userName], (checkError, checkResult) => {
          if (checkError) {
              response.status(500).json({ error: 'Internal Server Error' });
          } else if (checkResult.length > 0) {
              // If userName already exists, send a response
              response.status(409).json({ error: 'UserName already exists' });
          } else {
              // If userName doesn't exist, insert the data into the database
              const postQuery = `INSERT INTO register (firstName, lastname, userName, password) VALUES (?, ?, ?, ?)`;
              DB.query(postQuery, [firstName, lastName, userName, password], (error, result) => {
                  if (error) {
                      response.status(500).json({ error: 'Register Failed' });
                  } else {
                    response.json({ message: 'Register Successfully' });
                  }
              });
          }
      });
  } catch (error) {
      response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', (request, response) => {
  try {
    const { userName, password } = request.body;

    const getQuery = `SELECT * FROM register WHERE userName = ? AND password = ?`;

    DB.query(getQuery, [userName, password], (error, results) => {
      if (error) {
        response.status(500).json({ message: 'Login Failed' });
      } else {
        if (results.length > 0) {
          const jwtToken = jwt.sign({ userName }, 'sateesh', { expiresIn: '1h' });

          const insertUserQuery = 'INSERT INTO Users (userName, password) VALUES (?, ?)';
          DB.query(insertUserQuery, [userName, password], (insertError, result) => {
            if (insertError) {
              response.status(500).json({ message: 'User data insertion failed' });
            } else {

              console.log('result',result);
              const userData = {
                userId: result.insertId, 
                userName: userName,
              };

              response.json({ message: 'Login Successful', jwtToken, userData });
            }
          });
        } else {
          response.status(401).json({ message: 'Invalid username or password' });
        }
      }
    });
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' });
  }
});



// API to retrieve books from the database
app.get("/fetchingAllBooks", (request, response) => {
  try {
    const getQuery = `SELECT * FROM books`;

    DB.query(getQuery, (err, results) => {
      if (err) {
        response.status(500).json({ error: "Failed to retrieve books" });
      } else {
        response.json(results);
      }
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

app.get("/fetchingCartDetails", (request, response) => {
  try {
    const getCartQuery = `SELECT * FROM cart`;

    DB.query(getCartQuery, (error, result) => {
      if (error) {
        response.status(500).json({ error: "Failed to retrieve cart Books" });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

app.get("/fetchcustomerDetails", (request, response) => {
  try {
    const fetchcustomerDetailsQuery = `SELECT * FROM shippingdetails WHERE id=${1}`;

    DB.query(fetchcustomerDetailsQuery, (error, result) => {
      if (error) {
        response.status(500).json({ error: "Failed to retrieve fetch customer Details" });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addTocart", (request, response) => {
  try {
    const { id, title, author, image, rating, price, category } = request.body;
    const postQuery = `INSERT INTO cart (id,title,author,image,rating,price,category) VALUES ('${id}', '${title}', '${author}', '${image}', '${rating}', '${price}', '${category}')`;

    DB.query(postQuery, (err, results) => {
      if (err) {
        console.log("error", err);
        response.status(500).json({ error: "Failed to add to the cart" });
      } else {
        response.json({ message: "book added successful" });
      }
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});


app.post("/shippingDetails", (request, response) => {
  try {
    const {
      userId,
      name,
      cardNumber,
      expiration,
      cvv,
      firstName,
      lastName,
      email,
      contact,
      houseNumber,
      area,
      state,
      zip
    } = request.body;

    const postQuery =
      "INSERT INTO shippingdetails (userId, name, cardNumber, expiration, cvv, firstName, lastName, email, contact, houseNumber, area, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    DB.query(
      postQuery,
      [
        userId,
        name,
        cardNumber,
        expiration,
        cvv,
        firstName,
        lastName,
        email,
        contact,
        houseNumber,
        area,
        state,
        zip
      ],
      (err, results) => {
        if (err) {
          console.log("error", err);
          response
            .status(500)
            .json({ error: "Failed to add to the shippinginfo" });
        } else {
          response.json({ message: "Shipping info added successfully" });
        }
      }
    );
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});


app.delete("/deleteItem", (request, response) => {
  try {
    const { id } = request.body;
    const deleteQuery = `DELETE FROM cart WHERE id=${id}`;
    DB.query(deleteQuery, (err, results) => {
      if (err) {
        response.status(500).json({ error: "Failed to delete Book" });
      } else {
        response.json({ message: "Book deleted successfully" });
      }
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});


app.get('/category', (req, res) => {
  try {
    const { selectedOption } = req.query;

    if (!selectedOption) {
      return res.status(400).json({ error: 'Invalid or missing category parameter' });
    }

    const categoryQuery = 'SELECT * FROM books WHERE category = ?';

    DB.query(categoryQuery, [selectedOption], (error, results) => {
      if (error) {
        console.error('Error executing category query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'No books found for the given category' });
      }

      res.json(results);
    });
  } catch (error) {
    console.error('Error processing /category request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/search', (req, res) => {
  const { query } = req.query;
  const searchQuery = `%${query}%`;

  const sql = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
  
  DB.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('Error executing search query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

  
  
