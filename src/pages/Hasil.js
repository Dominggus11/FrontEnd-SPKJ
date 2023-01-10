import React from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
} from '@mui/material';
import { styles } from '../components/styles';
import axios from '../api/axios';
import MUIDataTable from 'mui-datatables';

export const Hasil = () => {
  const [siswas, setSiswas] = React.useState([]);
  const options = {
    selectableRows: false,
  };
  const columns = [
    {
      name: 'NO',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (rowIndex, dataIndex) => (dataIndex.rowIndex + 1 ),
          setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
          setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
        }
    },
    {
      label:'NISN',
      name: 'nisn',
      selector: (row) => row.nisn,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    
    {
      label:'Nama',
      name:'nama',
      selector: (row) => row.nama,
      options:{
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      }
      
    },
    {
      label:"Hasil Akhir",
      name: 'resultVi',
      selector: (row) => row.resultVi,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'Jurusan',
      name: 'jurusan',
      selector: (row) => row.jurusan,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    
  ];

  React.useEffect(() => {
    axios.get(`http://192.168.140.1:8080/student`).then((res) => {
      const response = res.data.message;
      setSiswas(response);
      console.log(res);
    });
  }, []);
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
              <MUIDataTable
                
                data={siswas}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
