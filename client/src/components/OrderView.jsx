import * as React from "react";
import check from "../assets/check.png";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  AppBar,
  Grid,
  Typography,
  Dialog,
  Toolbar,
  Slide,
  DialogContent
} from "@mui/material";
import '../App.css'

import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export default function OrderView({ open, setOpen, cart ,constantValue,totalPrice,details}) {
  const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrderConfirmation = () => {
    handleClose();
    setIsOrderConfirmed(true);
  };

  const handleCloseConfirmationPopup = () => {
    setIsOrderConfirmed(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              Order Summary
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOrderConfirmation}
            >
              Place The Order
            </Button>
          </Toolbar>
        </AppBar>

        <Card sx={{ m: 3, p: 3 ,overflow:'auto'}}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
             
            >
              <h1>Items</h1>
              {cart.map((eachItem) => (
                <CardContent key={eachItem.id}>
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
                          sx={{ borderRadius: "2px", width: "65px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">{eachItem.title}</Typography>
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
                          variant="h6"
                          sx={{ mb: 0 }}
                        >
                          ${eachItem.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Card style={{ border:'1px solid black'}} >
              
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                   
                  }}
                >
                  
                  <div>
                  <h1>Payment Details</h1>
                    <p className="order-total" style={{color:'black'}}>Subtotal : </p>
                    <p className="order-total" style={{color:'black'}}>Shipping : </p>
                    <p className="order-total" style={{color:'black'}}>Total(Incl. taxes) :</p>
                  </div>
                  <div style={{marginTop:'60px'}}>
                    <p className="order-total" style={{color:'grey'}}>${totalPrice}.00</p>
                    <p className="order-total" style={{color:'grey'}}>${constantValue}.00</p>
                    <p className="order-total" style={{color:'grey'}}>${totalPrice + constantValue}</p>
                  </div>
                </div>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                   
                  }}
                >
                  <div>
                  <h1>Shipping Details</h1>
                    <p className="order-total" style={{color:'black'}}>Name : </p>
                    <p className="order-total" style={{color:'black'}}>Email : </p>
                    <p className="order-total" style={{ color: 'black' }}>Contact :</p>
                    <p className="order-total" style={{ color: 'black' }}>Address :</p>
               
                  </div>
                  <div>
                    <p className="order-total" style={{ color: 'grey' }}>{details.firstName + details.lastName}</p>
                    <p className="order-total" style={{ color: 'grey' }}>{ details.email}</p>
                    <p className="order-total" style={{ color: 'grey' }}>{details.contact}</p>
                    <p className="order-total" style={{ color: 'grey' }}>{ details.houseNumber + details.area+details.state + details.zip}</p>
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <OrderConfirmationPopup
        open={isOrderConfirmed}
        onClose={handleCloseConfirmationPopup}
      />
    </React.Fragment>
  );
}

const OrderConfirmationPopup = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={check}
          style={{ height: "64px", width: "64px", color: "green" }}
        />
        <h2 className="order-confirm-text">Your Order is Confirmed!</h2>
        <p>Thank you for your purchase.</p>
      </DialogContent>
    </Dialog>
  );
};
