import React, { useState } from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
  Checkbox,
  TextField,
} from '@mui/material';
import { styles } from '../components/styles';
import DataTable from 'react-data-table-component';
import axios from '../api/axios';
import { display } from '@mui/system';
import { useEffect } from 'react';


export const Perhitungan = () => {
  
  const [ foundName,setFoundName] = useState('')
  
  const handleOnChangeSearch = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = users?.filter((data) => {
        return data?.nama?.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundName(results);
    } else {
      setFoundName(users);
    } 

  };
  
  
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index+1,
    },
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
      name: 'Ci Raport',
      selector: (row) => row.ci_rerata_raport,
    },
    {
      name: 'Ci IPA',
      selector: (row) => row.ci_ipa,
    },
    {
      name: 'Ci IPS',
      selector: (row) => row.ci_ips,
    },
    {
      name: 'Ci Minat',
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
    axios.get(`http://192.168.140.1:8080/normalisasi`).then((res) => {
      const responseUsers = res.data.message;
      setUsers(responseUsers);
      setFoundName(responseUsers);
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
            <Grid item xs={12} sx={{ p: 4}}>
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1, width:"100%"}} variant="h5" color="initial" fontWeight={600}>DATA PERHITUNGAN</Typography>
              <TextField sx={{mb:1, alignItems:"end", display:"flex", flexDirection:"column"}} placeholder='Search...' size='small'  
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={handleOnChangeSearch}
    />
              <DataTable
                columns={columns}
                data={foundName}
                pagination
                selectableRowsComponentProps={selectableRowsComponentProps}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};


