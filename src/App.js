import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AppBarDrawer from './components/AppBarDrawer';
import  { Hasil } from './pages/Hasil';
import Login from './pages/Login';
import { Perhitungan } from './pages/Perhitungan';
import { DataSiswa } from './pages/DataSiswa';
import { theme } from './components/theme';
import '@fontsource/inter';
import HomePages from './pages/HomePages';
import { DataKriteria } from './pages/DataKriteria';

function Main() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarDrawer />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/datasiswa" element={<DataSiswa />} />
          <Route path="/datakriteria" element={<DataKriteria />} />
          <Route path="/perhitungan" element={<Perhitungan />} />
          <Route path="/hasil" element={<Hasil />} />
        </Routes>
      </Box>
    </div>
  );
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/*" element={<Main />} />
          
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
