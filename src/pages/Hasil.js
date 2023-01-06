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

export const Hasil = () => {
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
      name: 'Result Vi',
      selector: (row) => row.resultVi,
    },
    {
      name: 'Jurusan Akhir',
      selector: (row) => row.jurusan,
    },
    
  ];

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://192.168.1.110:8080/student`).then((res) => {
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
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1,}} variant="h5" color="initial" fontWeight={600}>HASIL AKHIR JURUSAN</Typography>
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
