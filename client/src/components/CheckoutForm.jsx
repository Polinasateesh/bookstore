import React, { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import "../App.css";
import axios from "axios";
import OrderView from "./OrderView";

const CheckoutForm = ({ cart }) => {
  const defaultValues = {
    name: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    houseNumber: "",
    area: "",
    state: "",
    zip: ""
  };
  const [open, setOpen] = React.useState(true);

  const [shippingInfo, setShippingInfo] = useState(defaultValues);
  const [details,setDetails]=useState({})


  useEffect(() => {
    const fetchcustomerDetails = async () => {
      const response = await axios.get('http://localhost:5000/fetchcustomerDetails')
      console.log('response from order summary',response)
      setDetails(response.data[0])
    }
    fetchcustomerDetails()
  },[])

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "http://localhost:5000/shippingDetails",
        shippingInfo
      );
      console.log("response from checkoutform", response);

      if (response.statusText === "OK") {
        setOpen(true);
        setShippingInfo(defaultValues);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const totalPrice =
  cart.length === 1
    ? parseInt(cart[0].price, 10)
    : cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const constantValue = 20;

  console.log("Total Price:", totalPrice);

  console.log('details',details)

  return (
    <>
      <OrderView
        open={open}
        setOpen={setOpen}
        cart={cart}
        totalPrice={totalPrice}
        constantValue={constantValue}
        details={details}
      />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Card details</h2>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            xl={6}
          >
            <TextField
              name="name"
              label="Cardholders Name"
              type="text"
              value={shippingInfo.name}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            xl={6}
          >
            <TextField
              name="cardNumber"
              label="Card Number"
              type="number"
              size="small"
              value={shippingInfo.cardNumber}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="expiration"
              // label='DD/MM/YYYY'
              required
              size="small"
              type="date"
              value={shippingInfo.expiration}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="cvv"
              label="CVV"
              type="password"
              required
              size="small"
              value={shippingInfo.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="firstName"
              label="First Name"
              type="text"
              required
              size="small"
              value={shippingInfo.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="lastName"
              label="Last Name"
              type="text"
              required
              size="small"
              value={shippingInfo.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="email"
              label="Email"
              type="email"
              required
              size="small"
              value={shippingInfo.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="contact"
              label="Contact"
              type="contact"
              required
              size="small"
              value={shippingInfo.contact}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="houseNumber"
              label="H.No/Building No"
              type="text"
              required
              size="small"
              value={shippingInfo.houseNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="area"
              label="Area/Locality"
              type="text"
              required
              size="small"
              value={shippingInfo.area}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="state"
              label="State"
              type="text"
              required
              size="small"
              value={shippingInfo.state}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            <TextField
              name="zip"
              label="Zip"
              type="number"
              required
              size="small"
              value={shippingInfo.zip}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& label.Mui-focused": {
                  color: "#ffffff"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
            />
          </Grid>
        </Grid>
        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px"
          }}
        >
          <div>
            <p className="order-total">Subtotal : </p>
            <p className="order-total">Shipping : </p>
            <p className="order-total">Total(Incl. taxes) :</p>
          </div>
          <div>
            <p className="order-total">${totalPrice}</p>
            <p className="order-total">${totalPrice>0?constantValue:0}</p>
            <p className="order-total">${totalPrice>0?parseInt(totalPrice + constantValue):0}</p>
          </div>
        </div>
        <div className="button-container">
          <Button
            variant="contained"
            color="success"
            type="submit"
            style={{ marginLeft: "15px" }}
          >
            <span className="total">${totalPrice>0?parseInt(totalPrice + constantValue):0}</span>
            Check out ➡️
          </Button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
