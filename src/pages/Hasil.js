import React from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { styles } from '../components/styles';
import axios from '../api/axios';
import MUIDataTable from 'mui-datatables';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailNilai from './DetailNilai';
import { useNavigate } from 'react-router-dom';

export const Hasil = () => {
  const [totalWeightActive, setTotalWeightActive] = React.useState(0);
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [kriterias, setKriterias] = React.useState([]);
  const [siswas, setSiswas] = React.useState([]);
  const [siswa, setSiswa] = React.useState(null);
  const handleCloseDetail = () => setOpenDetail(false); 
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleOpenDetail = (siswa, saw, smart) => {
    setSiswa(siswa)
    console.log(siswa)
    setOpenDetail(prev => ({...prev, update: true}))
  }; 
  const options = {
    selectableRows: false,
  };

  const handleSubmit = (event, type) => {
    event.preventDefault()

    
    if (type === 'update') {    
      axios.get(`${process.env.REACT_APP_BACKEND}/student/${siswa.ID}`).then((res) => {
        const response = res.data.message;
        setSiswas(response);
        console.log(res);
      });
    }
  }
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student`).then((res) => {
      const response = res.data.message;
      setSiswas(response);
      console.log(res);
    });
    axios.get(`${process.env.REACT_APP_BACKEND}/normalisasi`).then((res) => {
      const response = res.data.message;
      setSiswas(response);
      console.log(res);
    });
  }, []);
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
      label:"MINAT",
      name: 'minat',
      selector: (row) => row.minat,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'HASIL SAW',
      name: 'resultVi_saw',
      selector: (row) => row.jurusan,
      options: {
        // sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'HASIL SMART',
      name: 'resultVi_smart',
      selector: (row) => row.jurusan,
      options: {
        // sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    // {
    //   label:'ACTION',
    //   name: 'aksi',
    //   options: {
    //     setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center', justifyContent:'center'}}),
    //     setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
    //     filter: false,
    //     sort: false,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <div>
    //         <button onClick={() => handleOpenDetail(siswas[dataIndex])} style={{margin: '5px'}}> <VisibilityIcon color='success'/></button> 
    //         </div>    
    //       );
    //    }
    // }
  // }  
  ];


  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/student`).then((res) => {
      const response = res.data.message;
      setSiswas(response);
      console.log(res);
    });
  }, []);

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
              <DetailNilai
              handleCloseDetail={handleCloseDetail}
              openDetail={openDetail}
              handleSubmit={handleSubmit}
              siswa = {siswa}
              />

            {error && (
              <Snackbar
                open={true}
                autoHideDuration={5000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert onClose={() => setError(null)} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
