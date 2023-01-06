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


export const DataSiswa = () => {

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
      name: 'Ujian Sekolah',
      selector: (row) => row.ujian_sekolah,
    },
    {
      name: 'Rerata Raport',
      selector: (row) => row.rerata_raport,
    },
    {
      name: 'Nilai IPA',
      selector: (row) => row.ipa,
    },
    {
      name: 'Nilai IPS',
      selector: (row) => row.ips,
    },
    {
      name: 'Minat Siswa',
      selector: (row) => row.minat,
    },
  ];

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://192.168.1.110:8080/student`).then((res) => {
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
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1, width:"100%"}} variant="h5" color="initial" fontWeight={600}>DATA SISWA</Typography>
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
                selectableRows={false}
                selectableRowsComponentProps={selectableRowsComponentProps}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
