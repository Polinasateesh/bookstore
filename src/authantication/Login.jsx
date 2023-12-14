import {
    Card,
    Grid,
    CircularProgress,
    InputAdornment,
    TextField,
    Button,
    IconButton
} from '@mui/material'

import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled } from '@mui/system'
import { ValidatorForm } from 'react-material-ui-form-validator'
import img from '../assets/bookstore.jpg'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock'


const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '20px',
    display:'flex',
    position: 'relative',
    justifyContent:'center',
    alignItems:'center',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    height: '50vh',
    borderRadius:'10px'
}))

const JWTRoot = styled(JustifyBox)(() => ({
   
    minHeight: '100% !important',

    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '3rem',
        padding:'1rem'

    },
}))

const defaultValues = {
    userName: '',
    password: '',
    showPassword: false,
  

}
const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
const [errorMessage,setErrorMessage]=useState(false)
    const [userInfo, setUserInfo] = useState(defaultValues)
    const isUserRegistered = JSON.parse(window.localStorage.getItem('userInfo'))
    const isLogin=window.localStorage.getItem('isLogedIn')

    useEffect(() => {
        const isUserRegistered = JSON.parse(window.localStorage.getItem('userInfo'))
        const isLogin=window.localStorage.getItem('isLogedIn')
        console.log('isUserRegistered',isUserRegistered);
        console.log('isLogin',isLogin);
        if (isUserRegistered===null) {
           navigate('/');
        }else if (isLogin==='true'){
            console.log('isLogin',typeof( isLogin))
            navigate('/Catalog')
        }else{

        }
    }, [isUserRegistered,isLogin]);

    const handleChange = (event) => {
    
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value})

    }
    const handleClickShowPassword = () => {
        setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const userInfoFromLocal=JSON.parse(window.localStorage.getItem('userInfo'))
        console.log('userInfoFromLocal',userInfoFromLocal)
        console.log('');

        if(userInfoFromLocal.userName===userInfo.userName && userInfoFromLocal.password===userInfo.password){
            console.log('matched cred');
            window.localStorage.setItem('isLogedIn',true)
            navigate('/Catalog')

        }else{
            window.localStorage.setItem('isLogedIn',false)
            setErrorMessage(true)
            console.log('not matched cred');


        }
        
    }

    return (
        <>
            <JWTRoot>
                <Card className="card">
                    <Grid container>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <JustifyBox p={4} >
                                <IMG
                                    src={img}
                                    alt="logo"
                                />
                            </JustifyBox>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12} xs={12}>
                            <ContentBox>
                                <ValidatorForm onSubmit={handleFormSubmit}>
                                    <TextField
                                        autoComplete="new-password"
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Email"
                                        onChange={handleChange}
                                        type="text"
                                        name="userName"
                                        required
                                        value={userInfo.userName}
                                        validators={['required', 'isEmail']}
                                        errormessages={[
                                            'this field is required',
                                            'email is not valid',
                                        ]}
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
                                    <TextField
                                        autoComplete="new-password"
                                        sx={{ mb: '12px', width: '100%' }}
                                        label="Password"
                                        id="Password"
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChange}
                                        required
                                        name="password"
                                        type={
                                            userInfo.showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={userInfo.password}
                                        validators={['required']}
                                        errormessages={[
                                            'this field is required',
                                        ]}
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
                                                        {userInfo.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>{' '}
                                                </InputAdornment>
                                            ),
                                        }}

                                    />{' '}


                                    <Box py={'10px'} />

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={loading}

                                        style={{ marginLeft: '15px' }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Login'}
                                    </Button>
                                    {errorMessage&&<p style={{color:'red',fontSize:'16px',fontFamily:'sans-serif'}}>Invalid credentials</p>}

                                </ValidatorForm>
                               
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card>
            </JWTRoot>
        </>

    )
}

export default Login
