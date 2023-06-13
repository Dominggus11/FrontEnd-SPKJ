import React from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
} from '@mui/material';
import { styles } from '../components/styles';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';


export const PerhitunganSMART = () => {
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
      
    },
    {
      label: 'Ci Ujian Sekolah',
      name:'ci_ujian_sekolah',
      selector: (row) => row.ci_ujian_sekolah,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'Ci Raport',
      name:'ci_rerata_raport',
      selector: (row) => row.ci_rerata_raport,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'Ci IPA',
      name:'ci_ipa',
      selector: (row) => row.ci_ipa,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'R Ujian Sekolah',
      name:'r_ujian_sekolah_smart',
      selector: (row) => row.r_ujian_sekolah,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'R Rerata Raport',
      name:'r_rerata_raport_smart',
      selector: (row) => row.r_rerata_raport,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'R Nilai IPA',
      name:'r_ipa_smart',
      selector: (row) => row.r_ipa,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
  ];

  

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/normalisasi`).then((res) => {
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
            <Grid item xs={12} sx={{ p: 4}}>
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1, width:"100%"}} variant="h5" color="initial" fontWeight={600}>DATA PERHITUNGAN SMART</Typography>
              
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


