import * as React from 'react';
import {
  Typography,
  Toolbar,
  Box,
  Container,
  Grid,
} from '@mui/material';
import axios from '../api/axios';
import { styles } from '../components/styles';
import { CChart } from '@coreui/react-chartjs';
const HomePages = () => {
  const [siswas, setSiswas] = React.useState([]);
  const [jumlahSiswaIPASaw, setjumlahSiswaIPASaw] = React.useState(0);
  const [jumlahSiswaIPSSaw, setjumlahSiswaIPSSaw] = React.useState(0);
  const [jumlahSiswaIPASmart, setjumlahSiswaIPASmart] = React.useState(0);
  const [jumlahSiswaIPSSmart, setjumlahSiswaIPSSmart] = React.useState(0);
  const [jumlahSiswaIPA, setjumlahSiswaIPA] = React.useState(0);
  const [jumlahSiswaIPS, setjumlahSiswaIPS] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student`).then((res) => {
      const response = res.data.message;
      // console.log(response);
      const jumlahSiswaIPA = response.filter(siswa => siswa.minat === 'IPA').length;
      const jumlahSiswaIPS = response.filter(siswa => siswa.minat === 'IPS').length;
      const jumlahSiswaIPASaw = response.filter(siswa => siswa.jurusan_saw === 'IPA').length;
      const jumlahSiswaIPSSaw = response.filter(siswa => siswa.jurusan_saw === 'IPS').length;
      const jumlahSiswaIPASmart = response.filter(siswa => siswa.jurusan_smart === 'IPA').length;
      const jumlahSiswaIPSSmart = response.filter(siswa => siswa.jurusan_smart === 'IPS').length;
      setjumlahSiswaIPA(jumlahSiswaIPA);
      setjumlahSiswaIPS(jumlahSiswaIPS);
      setjumlahSiswaIPASaw(jumlahSiswaIPASaw);
      setjumlahSiswaIPSSaw(jumlahSiswaIPSSaw);
      setjumlahSiswaIPASmart(jumlahSiswaIPASmart);
      setjumlahSiswaIPSSmart(jumlahSiswaIPSSmart);

        axios.get(`${process.env.REACT_APP_BACKEND}/normalisasi`).then((res) => {
          const response = res.data.message;
          setSiswas(response);
          console.log(res);
        });
    });
  }, [jumlahSiswaIPASaw, jumlahSiswaIPSSaw, jumlahSiswaIPASmart, jumlahSiswaIPSSmart, jumlahSiswaIPA, jumlahSiswaIPS]);
  
  return (
    <>
    
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} style={styles.titlePage}>
            <Typography variant="h5" color="initial" fontWeight={600}>
              Home Page
            </Typography>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} >
          <Grid item xs={12} style={styles.PageSPK} marginTop="10px">
            <Typography variant="h3" color="initial" fontWeight={600} >
              Selamat Datang di SPKJ
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item xs={12} style={styles.PageSPK} marginTop="10px">
            <Typography variant="h6" color="initial" fontWeight={600} fontStyle="italic">
              Sistem Pendukung Keputusan Jurusan
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"center" }}>
      <Box
        sx={{
          width: '30%', // Atur lebar Box sesuai kebutuhan (misalnya 20%)
          p: 2, // Atur padding sesuai kebutuhan
        }}
      >
         <Grid item xs={12} style={styles.PageSPK} marginTop="10px">
            <Typography variant="h6" color="initial" fontWeight={100} fontStyle="bold">
              Metode SAW
            </Typography>
          </Grid>
    {/* Chart 1 */}
    <CChart
      type="doughnut"
      data={{
        labels: ['IPA', 'IPS'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#00D8FF'],
            data: [jumlahSiswaIPASaw, jumlahSiswaIPSSaw],
          },
        ],
      }}
    />
    </Box>
    <Box
        sx={{
          width: '30%', // Atur lebar Box sesuai kebutuhan (misalnya 20%)
          p: 2, // Atur padding sesuai kebutuhan
        }}
      >
        <Grid item xs={12} style={styles.PageSPK} marginTop="20px">
            <Typography variant="h6" color="initial" fontWeight={100} fontStyle="bold">
              Metode SMART
            </Typography>
          </Grid>
    {/* Chart 2 */}
    <CChart
      type="polarArea"
      data={{
        labels: ['IPA', 'IPS'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#00D8FF'],
            data: [jumlahSiswaIPASmart, jumlahSiswaIPSSmart],
          },
        ],
      }}
    />
    </Box>
    <Box
        sx={{
          width: '30%', // Atur lebar Box sesuai kebutuhan (misalnya 20%)
          p: 2, // Atur padding sesuai kebutuhan
        }}
      >
        <Grid item xs={12} style={styles.PageSPK} marginTop="20px">
            <Typography variant="h6" color="initial" fontWeight={100} fontStyle="bold">
              Minat Jurusan Siswa
            </Typography>
          </Grid>
    {/* Chart 2 */}
    <CChart
      type="pie"
      data={{
        labels: ['IPA', 'IPS'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#00D8FF'],
            data: [jumlahSiswaIPA, jumlahSiswaIPS],
          },
        ],
      }}
    />
    </Box>
    </Box>
    </Box>
    </>
  );
};
export default HomePages;
