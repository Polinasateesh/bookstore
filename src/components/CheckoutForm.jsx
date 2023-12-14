import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Card, Button, TextField, Grid, CircularProgress, InputAdornment } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import '../App.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'


const CheckoutForm = ({ handleCheckout }) => {
  
const defaultValues = {
  name: '',
  cardNumber: '',
  expiration: '',
  cvv: '',


};

  const [isLoading, setIsLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(defaultValues);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
 
const handleSubmit=(event)=>{
  event.preventDefault()
  handleCheckout(shippingInfo)

}

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} xl={6}>
            <TextField
                name='name'
                label='Cardholders Name'
                type='text'
                value={shippingInfo.name}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                variant='outlined'
                sx={{
                  '& label.Mui-focused': {
                    color: '#ffffff', 
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffffff', 
                     
                    },
                  },
                }}
            />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
            <TextField
                name='cardNumber'
                label='Card Number'
                type='text'
                size="small"
                value={shippingInfo.cardNumber}
                onChange={handleChange}
                fullWidth
                required
                variant='outlined'
                sx={{
                  '& label.Mui-focused': {
                    color: '#ffffff', 
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffffff', 
                     
                    },
                  },
                }}
            />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
            <TextField
                name='expiration'
                label='DD/MM/YYYY'
                required
                size="small"
                type='date'
                value={shippingInfo.expiration}
                onChange={handleChange}
                fullWidth
                variant='outlined'
                sx={{
                  '& label.Mui-focused': {
                    color: '#ffffff', 
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffffff', 
                     
                    },
                  },
                }}
                InputProps={{
                    startAdornment: (
                        <EmailIcon
                            style={{
                                color: 'gray',
                                marginLeft: '-10px',
                                position: 'relative',
                                padding: '2px',
                            }}
                        />
                    ),
                }}


            />

        </Grid>

        <Grid item xs={12} sm={12} md={6} xl={6}>
            <TextField
                name='cvv'
                label='CVV'
                type='password'
                required
                size="small"
                value={shippingInfo.password}
                onChange={handleChange}
                fullWidth
                variant='outlined'
                sx={{
                  '& label.Mui-focused': {
                    color: '#ffffff', 
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffffff', 
                     
                    },
                  },
                }}
                
            />
        </Grid>

    </Grid>
    <div className='button-container'>
        <Button
            variant='contained'
            color='success'
            type='submit'
            disabled={isLoading}
           
            style={{ marginLeft: '15px' }}
        >
            {isLoading ? <CircularProgress size={24} /> : 'Check out ➡️'}
        </Button>
    </div>
</form>
  );
};

export default CheckoutForm;

