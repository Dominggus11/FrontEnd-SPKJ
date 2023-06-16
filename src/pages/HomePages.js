import * as React from 'react';
import {
  Typography,
  Toolbar,
  Box,
  Container,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import axios from '../api/axios';
import { styles } from '../components/styles';
import { CChart } from '@coreui/react-chartjs';
import { useNavigate } from 'react-router-dom';
const HomePages = () => {
  const [totalWeightActive, setTotalWeightActive] = React.useState(0);
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [kriterias, setKriterias] = React.useState([]);
  const [siswas, setSiswas] = React.useState([]);
  const [jumlah90Saw, setjumlah90Saw] = React.useState(0);
  const [jumlah80Saw, setjumlah80Saw] = React.useState(0);
  const [jumlah70Saw, setjumlah70Saw] = React.useState(0);
  const [jumlah60Saw, setjumlah60Saw] = React.useState(0);
  const [jumlah50Saw, setjumlah50Saw] = React.useState(0);

  const [jumlah90Smart, setjumlah90Smart] = React.useState(0);
  const [jumlah80Smart, setjumlah80Smart] = React.useState(0);
  const [jumlah70Smart, setjumlah70Smart] = React.useState(0);
  const [jumlah60Smart, setjumlah60Smart] = React.useState(0);
  const [jumlah50Smart, setjumlah50Smart] = React.useState(0);

  const [jumlahSiswaIPA, setjumlahSiswaIPA] = React.useState(0);
  const [jumlahSiswaIPS, setjumlahSiswaIPS] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student`).then((res) => {
      const response = res.data.message;
      const jumlahSiswaIPA = response.filter(siswa => siswa.minat === 'IPA').length;
      const jumlahSiswaIPS = response.filter(siswa => siswa.minat === 'IPS').length;
      
      const jumlah90Saw = response.filter(siswa => siswa.resultVi_saw >=90).length;
      const jumlah80Saw = response.filter(siswa => siswa.resultVi_saw >=80 && siswa.resultVi_saw <90 ).length;
      const jumlah70Saw = response.filter(siswa => siswa.resultVi_saw >=70 && siswa.resultVi_saw <80 ).length;
      const jumlah60Saw = response.filter(siswa => siswa.resultVi_saw >=60 && siswa.resultVi_saw <70 ).length;
      const jumlah50Saw = response.filter(siswa => siswa.resultVi_saw <60 ).length;

      const jumlah90Smart = response.filter(siswa => siswa.resultVi_smart >=90).length;
      const jumlah80Smart = response.filter(siswa => siswa.resultVi_smart >=80 && siswa.resultVi_smart <90 ).length;
      const jumlah70Smart = response.filter(siswa => siswa.resultVi_smart >=70 && siswa.resultVi_smart <80 ).length;
      const jumlah60Smart = response.filter(siswa => siswa.resultVi_smart >=60 && siswa.resultVi_smart <70 ).length;
      const jumlah50Smart = response.filter(siswa => siswa.resultVi_smart <60 ).length;




      setjumlahSiswaIPA(jumlahSiswaIPA);
      setjumlahSiswaIPS(jumlahSiswaIPS);
      setjumlah90Saw(jumlah90Saw);
      setjumlah80Saw(jumlah80Saw);
      setjumlah70Saw(jumlah70Saw);
      setjumlah60Saw(jumlah60Saw);
      setjumlah50Saw(jumlah50Saw);


      setjumlah90Smart(jumlah90Smart);
      setjumlah80Smart(jumlah80Smart);
      setjumlah70Smart(jumlah70Smart);
      setjumlah60Smart(jumlah60Smart);
      setjumlah50Smart(jumlah50Smart);

        axios.get(`${process.env.REACT_APP_BACKEND}/normalisasi`).then((res) => {
          const response = res.data.message;
          setSiswas(response);
          console.log(res);
        });
    });
  }, [jumlah90Saw, jumlah80Saw,jumlah70Saw,jumlah60Saw, jumlah50Saw, jumlah90Smart, jumlah80Smart,jumlah70Smart, jumlah60Smart, jumlah50Smart ,jumlahSiswaIPA, jumlahSiswaIPS]);
  
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/kriteria`).then(res => {
      const responseKriterias = res.data.message;
      console.log(responseKriterias);
      setKriterias(responseKriterias);
  
      const totalWeightActive = responseKriterias.reduce((sum, kriteria) => {
        if (kriteria.is_active === 1) {
          return sum + kriteria.bobot;
        }
        return sum;
      }, 0);
      setTotalWeightActive(totalWeightActive);
      console.log(totalWeightActive)
  
      
      if (totalWeightActive !== 100) {
        setError('Total bobot kriteria harus sama dengan 100.');
        navigate('/datakriteria');
      }
  
      
    });
  }, [setKriterias, navigate]);
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
        labels: ['Nilai 90-100', 'Nilai 80-89','Nilai 70-79', 'Nilai 60-69', 'Nilai <60'],
        datasets: [
          {
            backgroundColor: ['#4aed00', '#2557ff', '#f8fe00','#fe0101', '#fb6c03'],
            data: [jumlah90Saw, jumlah80Saw,jumlah70Saw, jumlah60Saw, jumlah50Saw],
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
        labels: ['Nilai 90-100', 'Nilai 80-89','Nilai 70-79', 'Nilai 60-69', 'Nilai <60'],
        datasets: [
          {
            backgroundColor: ['#4aed00', '#2557ff', '#f8fe00','#fe0101', '#fb6c03'],
            data: [jumlah90Smart, jumlah80Smart,jumlah70Smart, jumlah60Smart, jumlah50Smart],
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
            backgroundColor: ['#2557ff', '#f8fe00'],
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
