import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function Authenticated({children}) {
    const token = localStorage.getItem('jwtToken');
    const location = useLocation()
    if (!token) {
        // Arahkan ke halaman login jika token tidak ada di local storage
        
        return children;
        
    }
  return <Navigate to='/dashboard' state={{from:location}} replace/>;
}

export default Authenticated