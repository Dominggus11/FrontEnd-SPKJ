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

export const DataKriteria = () => {

  const [ foundName,setFoundName] = useState('')
  
  const handleOnChangeSearch = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = users?.filter((data) => {
        return data?.nama_kriteria?.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundName(results);
    } else {
      setFoundName(users);
    } 

  };


  const columns = [
    {
      name: 'Kode',
      selector: (row, index) =>"C"+ (index+1),
    },
    
    {
      name: 'Nama Kriteria',
      selector: (row) => row.nama_kriteria,
    },
    {
      name: 'Bobot Kriteria',
      selector: (row) => row.bobot_kriteria,
    },
    
    
  ];

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://192.168.1.110:8080/kriteria`).then((res) => {
      const responseUsers = res.data.message;
      setUsers(responseUsers);
      setFoundName(responseUsers);
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
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1, width:"100%"}} variant="h5" color="initial" fontWeight={600}>DATA KRITERIA</Typography>
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
