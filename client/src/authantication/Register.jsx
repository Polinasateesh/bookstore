import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Card, Button, TextField, Grid, CircularProgress, InputAdornment } from '@mui/material';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';

import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'



const defaultValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    showPassword: false,

};

const Register = () => {
    useEffect(() => {
        const isRegister = window.localStorage.getItem('isRegister')
        if (isRegister === 'true') {
            navigate('/Login')
        }
        else {
            navigate('/')  
        }
         
   },[])
    const [value, setValue] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const[error,setError]=useState('')
    const navigate = useNavigate();


    const handleClose = () => {
        setValue(defaultValues)
    };
    
    // Handle input on change
    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setValue({ ...value, [inputName]: inputValue });

    };

    const handleClickShowPassword = () => {
        setValue({ ...value, showPassword: !value.showPassword })
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const newValues = {
            firstName: value.firstName,
            lastName: value.lastName,
            userName: value.userName,
            password: value.password,
        }

        try {
            const response = await axios.post('http://localhost:5000/register', newValues)
            console.log('response', response.data);
            if (response && response.data.message) {
                setIsLoading(false);
                setValue(defaultValues);
                navigate('/Login')
                window.localStorage.setItem('isRegister', true)
            } else {
               
                console.log('Registration Failed')
                window.localStorage.setItem('isRegister', false)

            }
           
          } catch (error) {
            console.log('Error', error);
            setIsLoading(false);
            window.localStorage.setItem('isRegister', false)
            
          } 

    };

    return (
        <>
           
            <Card className='card-container'>

                <p className='card-heading'> ➡️ Register Form</p>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} xl={6}>
                            <TextField
                                name='firstName'
                                label='First Name'
                                type='text'
                                value={value.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={6}>
                            <TextField
                                name='lastName'
                                label='Last Name'
                                type='text'
                                size="small"
                                value={value.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={6}>
                            <TextField
                                name='userName'
                                label='User Name'
                                required
                                size="small"
                                type='email'
                                value={value.userName}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'
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
                                name='password'
                                label='Password'
                                type={value.showPassword ? 'text' : 'password'}
                                required
                                size="small"
                                value={value.password}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'
                                InputProps={{
                                    startAdornment: (
                                        <LockIcon
                                            style={{
                                                color: 'gray',
                                                marginLeft: '-10px',
                                                position: 'relative',
                                                padding: '2px',
                                            }}
                                        />
                                    ),
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                            }}
                                        >
                                            {' '}
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }

                                            >
                                                {' '}
                                                {value.showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>{' '}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                    </Grid>
                    <div className='button-container'>
                        <Button variant='outlined' color='warning' onClick={handleClose} startIcon={
                            <CloseIcon style={{ fontSize: '16px' }} />
                        }>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isLoading}
                            startIcon={
                                <SendIcon style={{ fontSize: '16px' }} />
                            }
                            style={{ marginLeft: '15px' }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                    </div>
                </form>

            </Card>
        </>
    );
};

export default Register;
