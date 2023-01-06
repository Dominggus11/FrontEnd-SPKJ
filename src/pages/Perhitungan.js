import React from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
  Checkbox,
} from '@mui/material';
import { styles } from '../components/styles';
import DataTable from 'react-data-table-component';
import axios from '../api/axios';
import { display } from '@mui/system';

export const Perhitungan = () => {
  const columns = [
    {
      name: 'NISN',
      selector: (row) => row.nisn,
    },
    
    {
      name: 'Nama',
      selector: (row) => row.nama,
    },
    {
      name: 'Ci Ujian Sekolah',
      selector: (row) => row.ci_ujian_sekolah,
    },
    {
      name: 'Ci Rerata Raport',
      selector: (row) => row.ci_rerata_raport,
    },
    {
      name: 'Ci Nilai IPA',
      selector: (row) => row.ci_ipa,
    },
    {
      name: 'Ci Nilai IPS',
      selector: (row) => row.ci_ips,
    },
    {
      name: 'Ci Minat Siswa',
      selector: (row) => row.ci_minat,
    },
    {
      name: 'R Ujian Sekolah',
      selector: (row) => row.r_ujian_sekolah,
    },
    {
      name: 'R Rerata Raport',
      selector: (row) => row.r_rerata_raport,
    },
    {
      name: 'R Nilai IPA',
      selector: (row) => row.r_ipa,
    },
    {
      name: 'R Nilai IPS',
      selector: (row) => row.r_ips,
    },
    {
      name: 'R Minat Siswa',
      selector: (row) => row.r_minat,
    },
  ];

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://192.168.1.110:8080/normalisasi`).then((res) => {
      const responseUsers = res.data.message;
      setUsers(responseUsers);
      console.log(res);
    });
  }, []);
  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Box>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6}}>
          <Grid container spacing={3} >
            <Grid item xs={12} style={styles.titlePage} >
            </Grid>
            <Grid item xs={12} sx={{ p: 4,}}>
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1,}} variant="h5" color="initial" fontWeight={600}>DATA PERHITUNGAN</Typography>
              <DataTable
                // title="DATA SISWA"
                columns={columns}
                data={users}
                pagination
                selectableRows
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={selectableRowsComponentProps}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
