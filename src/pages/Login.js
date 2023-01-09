import * as React from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styles } from '../components/styles';
import axios from '../api/axios';

const Login = () => {

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    {
      axios.post(`${process.env.REACT_APP_BACKEND}/login`, {username: user.username, password: user.password})
        .then(response => {
          console.log(response.data.message);
          console.log(user.ID)
          // window.location.reload() 
          console.log(typeof response.status);
          if (response.status == 200){
            window.location.href = '/dashboard';
          }
        });

      console.log(event.target); 
    }
  }

  const handleChange = (event) => {
    if (event.target.name === 'username')(
      setUser(prev => ({...prev, username: event.target.value}))
    )
    else if (event.target.name === 'password')(
      setUser(prev => ({...prev, password: event.target.value}))
    )
    console.log(event.target.name)
  }



  return (
    <Box sx={styles.bgLogin}>
      <Box sx={styles.formLogin}>
      <Typography id="modal-modal-title" variant="h3" fontWeight="700" paddingBottom={"20px"} color="#242E6F">
         S P K J 
        </Typography>
      <input type="image" img src={'/img/logo bm.png'} width="100px" alt="logo" />
        <Typography id="modal-modal-title" variant="h6" fontWeight="700" color="#242E6F">
          SMA Swasta
        </Typography>
        <Typography id="modal-modal-title" variant="h5" fontWeight="700" color="#242E6F"> 
          Budi Mulia Tumbajae
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              id="outlined-required"
              label="Username"
              onChange={handleChange}
              value={user?.username}
              name='username'
              sx={{ mt: 3 }}
            />
            <TextField
              required
              onChange={handleChange}
              id="outlined-required"
              label="Password"
              type="password"
              value={user?.password}
              name='password'
              sx={{ mt: 3 }}
            />
            <Box display="flex">
              <Button 
                variant="contained"
                color="info"
                type="submit"
                sx={{ width: '100%', ml: 8, mr: 8}}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
export default Login;
