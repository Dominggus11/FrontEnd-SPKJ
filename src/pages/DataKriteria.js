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
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import MUIDataTable from 'mui-datatables';
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
    // {
    //   name: 'Kode',
    //   selector: (row, index) =>"C"+ (index+1),
    //   options: {
    //     sort: false,
    //     setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
    //     setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
    //   },
    // },
    
    {
      label: 'NAMA KRITERIA',
      name: 'nama_kriteria',
      selector: (row) => row.nama_kriteria,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'BOBOT KRITERIA',
      name:'bobot_kriteria',
      selector: (row) => row.bobot_kriteria,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'ACTION',
      name: 'aksi',
      options: {
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center', justifyContent:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
            <button style={{margin: '5px'}}> <CreateIcon color='warning'/></button> 
            <button> <DeleteIcon sx={{ color: pink[500]}}/></button>
            </div>    
          );
       }
    },
  }
    
    
  ];

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://192.168.140.1:8080/kriteria`).then((res) => {
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
              <MUIDataTable
                columns={columns}
                data={users}
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
