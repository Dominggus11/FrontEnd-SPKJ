import * as React from 'react';
import {
  Typography,
  Toolbar,
  Box,
  Container,
  Grid,
} from '@mui/material';
import { styles } from '../components/styles';
const HomePages = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={styles.titlePage}>
            <Typography variant="h5" color="initial" fontWeight={600}>
              Home Page
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item xs={12} style={styles.PageSPK} marginTop="50px">
            <Typography variant="h3" color="initial" fontWeight={600} >
              Selamat Datang di SPKJ
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item xs={12} style={styles.PageSPK} marginTop="20px">
            <Typography variant="h6" color="initial" fontWeight={600} fontStyle="italic">
              Sistem Pendukung Keputusan Jurusan
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HomePages;
