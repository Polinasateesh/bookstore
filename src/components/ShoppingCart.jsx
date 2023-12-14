import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const ShoppingCart = ({cart,setCart,handleCheckout}) => {

  const handleRemove=({id})=>{
    const filteredBooks = cart.filter((eachBook) => eachBook.id !== id);
    setCart(filteredBooks)
  
  }
 

  return (
    <Container sx={{ py: 5, backgroundColor: '#eee' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Grid container>
                <Grid item lg={7}>
                  <Typography variant="h5">
                    <a href={'/Catalog'} style={{ textDecoration: 'none' }}>
                      <ShoppingCartIcon sx={{ marginRight: 1 }} />
                      Continue shopping
                    </a>
                  </Typography>

                  <hr />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Shopping cart
                      </Typography>
                      <Typography variant="body2">You have {cart.length} items in your cart</Typography>
                    </div>
                    <div>
                      <Typography>
                        <span style={{ color: '#cecece' }}>Sort by:</span>
                        <a href="#!" style={{ color: '#000' }}>
                          price
                        </a>
                      </Typography>
                    </div>
                  </div>

                  { cart.map((eachItem)=>(
                     <Card sx={{ mb: 3 }} key={eachItem.id}>
                     <CardContent>
                       <Grid container justifyContent="space-between">
                         <Grid item container alignItems="center" spacing={3}>
                           <Grid item>
                             <CardMedia
                               component="img"
                               alt="Shopping item"
                               height="100"
                               image={eachItem.formats['image/jpeg']}
                               sx={{ borderRadius: '3px', width: '65px' }}
                             />
                           </Grid>
                           <Grid item>
                             <Typography variant="h5">{eachItem.title}</Typography>
                             <Typography variant="body2" sx={{ mb: 0 }}>
                              {eachItem.authors[0].name}
                             </Typography>
                           </Grid>
                         </Grid>
                         <Grid item container alignItems="center" spacing={3}>
                           <Grid item>
                             <Typography variant="h5" sx={{ mb: 0 }}>
                               $900
                             </Typography>
                           </Grid>
                           <Grid item>
                             <Button onClick={()=>handleRemove(eachItem)}>Remove</Button>
                           </Grid>
                         </Grid>
                       </Grid>
                     </CardContent>
                   </Card>
                    
                  ))
                  
               }
                
                </Grid>

                <Grid item lg={5}>
                  {/* Card details form */}
                  <Card sx={{ backgroundColor: '#1976D2', color: '#fff', borderRadius: '3px' ,margin:'20px'}}>
                    <CardContent>
                    <CheckoutForm handleCheckout={handleCheckout} />
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
