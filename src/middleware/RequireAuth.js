import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import AppBarDrawer from '../components/AppBarDrawer';

function Main({children}) {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBarDrawer />
        {children}
      </Box>
    </div>
  );
}
function RequireAuth({children}) {
    const token = localStorage.getItem('jwtToken');
    const location = useLocation()
    if (token) {
        // Arahkan ke halaman login jika token tidak ada di local storage
        
        return <Main>{children}</Main>;
        
    }
  return <Navigate to='/' state={{from:location}} replace/>;
}

export default RequireAuth