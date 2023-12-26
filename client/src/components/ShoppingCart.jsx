import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { CartDetails } from "../redux/reducers/bookslicer";

const ShoppingCart = ({ cart,handleDeleteData}) => {
  return (
    <Container sx={{ py: 5, backgroundColor: "#eee" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Grid container>
                <Grid
                  item
                  lg={7}
                >
                  <Typography variant="h5">
                    <a
                      href={"/Catalog"}
                      style={{ textDecoration: "none" }}
                    >
                      <ShoppingCartIcon sx={{ marginRight: 1 }} />
                      Continue shopping
                    </a>
                  </Typography>

                  <hr />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4
                    }}
                  >
                    <div>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1 }}
                      >
                        Shopping cart
                      </Typography>
                      <Typography variant="body2">
                        You have {cart.length} items in your cart
                      </Typography>
                    </div>
                  </div>

                  {cart.map((eachItem) => (
                    <Card
                      sx={{ mb: 3 }}
                      key={eachItem.id}
                    >
                      <CardContent>
                        <Grid
                          container
                          justifyContent="space-between"
                        >
                          <Grid
                            item
                            container
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>
                              <CardMedia
                                component="img"
                                alt="Shopping item"
                                height="100"
                                image={eachItem.image}
                                sx={{ borderRadius: "3px", width: "65px" }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="h5">
                                {eachItem.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ mb: 0 }}
                              >
                                {eachItem.author}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>
                              <Typography
                                variant="h5"
                                sx={{ mb: 0 }}
                              >
                                ${eachItem.price}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteData(eachItem.id)}
                              >
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        
                      </CardContent>
                    </Card>
                  ))}
                </Grid>

                <Grid
                  item
                  lg={5}
                >
                  {/* Card details form */}
                  <Card
                    sx={{
                      backgroundColor: "#1976D2",
                      color: "#fff",
                      borderRadius: "4px",
                      margin: "20px"
                    }}
                  >
                    <CardContent>
                      <CheckoutForm cart={cart}/>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShoppingCart;
