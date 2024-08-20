import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';

const Registration = () => {
  const [server_error, setServerError] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [nicFrontUploaded, setNicFrontUploaded] = useState(false);
  const [nicBackUploaded, setNicBackUploaded] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    if (!nicFrontUploaded || !nicBackUploaded) {
      setServerError({ ...server_error, nic_images: ['NIC front and back images are required.'] });
      return;
    }
  
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      address: data.get('address'),
      city: data.get('city'),
      phone_number: data.get('phone_number'),
      nic: data.get('nic'),
      nic_front: data.get('nic_front'),
      nic_back: data.get('nic_back'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
    };
  
    // Ensure files are appended to FormData
    const formData = new FormData();
    for (const key in actualData) {
      formData.append(key, actualData[key]);
    }
    formData.append('nic_front', data.get('nic_front'));
    formData.append('nic_back', data.get('nic_back'));
  
    const res = await registerUser(formData); // Pass formData directly
  
    if (res.error) {
      setServerError(res.error.data.errors);
    }
  
    if (res.data) {
      storeToken(res.data.token);
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };
  

  const handleFileChange = (e) => {
    if (e.target.name === 'nic_front') {
      setNicFrontUploaded(!!e.target.files[0]);
    } else if (e.target.name === 'nic_back') {
      setNicBackUploaded(!!e.target.files[0]);
    }
  };

  return (
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit} encType="multipart/form-data" style={{ overflow: "auto" }}>
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      {server_error.name && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {server_error.email && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='address' name='address' label='Address' />
      {server_error.address && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.address[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='city' name='city' label='City' />
      {server_error.city && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.city[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='phone_number' name='phone_number' label='Phone' />
      {server_error.phone_number && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.phone_number[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='nic' name='nic' label='National ID' />
      {server_error.nic && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.nic[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography>}

      <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
      {server_error.password2 && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography>}

      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="nic_front"
        name="nic_front"
        type="file"
        onChange={handleFileChange}
        required
      />
      <label htmlFor="nic_front">
        <Button variant="contained" component="span" fullWidth style={{ backgroundColor: nicFrontUploaded ? "#4caf50" : "#2B2B2B", marginTop: '16px' }}>
          {nicFrontUploaded ? "NIC Front Uploaded" : "Upload NIC Front"}
        </Button>
      </label>
      {server_error.nic_front && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.nic_front[0]}</Typography>}

      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="nic_back"
        name="nic_back"
        type="file"
        onChange={handleFileChange}
        required
      />
      <label htmlFor="nic_back">
        <Button variant="contained" component="span" fullWidth style={{ backgroundColor: nicBackUploaded ? "#4caf50" : "#2B2B2B", marginTop: '16px' }}>
          {nicBackUploaded ? "NIC Back Uploaded" : "Upload NIC Back"}
        </Button>
      </label>
      {server_error.nic_back && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.nic_back[0]}</Typography>}

      <FormControlLabel control={<Checkbox value={true} style={{ color: "#3c3c3c" }} name="tc" id="tc" />} label="I agree to term and condition." />
      {server_error.tc && <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.tc[0]}</span>}

      <Box textAlign='center'>
        {isLoading ? <CircularProgress style={{ color: "#2B2B2B" }} /> : <Button type='submit' variant='contained' style={{ backgroundColor: "#2B2B2B" }} sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>}
      </Box>

      {registrationSuccess && (
        <Alert severity='success' style={{ marginTop: '10px' }}>
          Registration successful! An email is sent to you please verify
        </Alert>
      )}

      {server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>}
      {server_error.nic_images && <Alert severity='error'>{server_error.nic_images[0]}</Alert>}
    </Box>
  );
};

export default Registration;
