import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import  { Hasil } from './pages/Hasil';
import Login from './pages/Login';
import { Perhitungan } from './pages/Perhitungan';
import { DataSiswa } from './pages/DataSiswa';
import { theme } from './components/theme';
import '@fontsource/inter';
import HomePages from './pages/HomePages';
import { DataKriteria } from './pages/DataKriteria';
import Authenticated from "./middleware/Authenticated";
import RequireAuth from "./middleware/RequireAuth";
import { PerhitunganSMART } from "./pages/PerhitunganSMART";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        
        <Routes>
        <Route path='/'>
          <Route index={true} element={<Navigate to={'/login'}/>}/>
        <Route path="login" element={<Authenticated ><Login /></Authenticated>} />
        <Route path="dashboard" element={<RequireAuth ><HomePages /></RequireAuth>} />
          <Route path="datasiswa" element={<RequireAuth ><DataSiswa /></RequireAuth>} />
          <Route path="datakriteria" element={<RequireAuth ><DataKriteria /></RequireAuth>} />
          <Route path="perhitungan" element={<RequireAuth ><Perhitungan /></RequireAuth>} />
          <Route path="hasil" element={<RequireAuth ><Hasil /></RequireAuth>} />
          <Route path="perhitungansmart" element={<RequireAuth ><PerhitunganSMART /></RequireAuth>} />
        </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
