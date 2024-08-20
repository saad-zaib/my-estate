import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation, userAuthApi } from '../../services/userAuthApi';
import "./UserLogin.css"
import Image from "../../assets/Login.png"

const UserLogin = () => {
  // server error when logins
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    
    // any server errors
    if (res.error) {

      setServerError(res.error.data.errors)
    }
  
    // server data
    if (res.data) {
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/dashboard')
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])


  return <>
    {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
    {server_error.email ? console.log(server_error.email[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
      {server_error.is_active ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.is_active[0]}</Typography> : ""}
      <Box textAlign='center'>
        {isLoading ? <CircularProgress style={{color:"#2B2B2B"}} /> : <Button type='submit' variant='contained' style={{backgroundColor:"#2B2B2B"}} sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
      </Box>
      <NavLink style={{ textDecoration: 'none', color:"#2B2B2B" }} to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      <Box mt={2} > 
      {server_error.non_field_errors ? <Alert  severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
      <Box textAlign='center'>
          <Box component="img" mt={10} src={Image} alt="Shop Image" sx={{ width: '100px', height: 'auto' }} />
          </Box>
      </Box>
    </Box>
  </>;
};

export default UserLogin;