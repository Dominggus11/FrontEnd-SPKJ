import React, { useState } from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { styles } from '../components/styles';
import axios from '../api/axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CreateSiswa from './CreateSiswa';
import UpdateSiswa from './UpdateSiswa';
import MUIDataTable from "mui-datatables";
import DeleteSiswa from './DeleteSiswa';
import { useNavigate } from 'react-router-dom';

export const DataSiswa = () => {
  const navigate = useNavigate();
  const [totalWeightActive, setTotalWeightActive] = useState(0);
  const [error, setError] = React.useState(null);
  const [kriterias, setKriterias] = React.useState([]);
  const [siswas, setSiswas] = React.useState([]);
  const [siswa, setSiswa] = useState(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate(false); 
  const handleCloseDelete = () => setOpenDelete(false);
  const [SnackBarIsOpen, setSnackBarIsOpen] = React.useState(false);
  const [SnackBarCreateIsOpen, setSnackBarCreateIsOpen] = React.useState(false);
  const [SnackBarUpdateIsOpen, setSnackBarUpdateIsOpen] = React.useState(false);
  const [SnackBarDeleteIsOpen, setSnackBarDeleteIsOpen] = React.useState(false);
  const handleOpenCreate = () => {
    setSiswa(null);
    setOpenCreate(true)
  };

  const handleOpenUpdate = (siswa) => {
    setSiswa(siswa)
    console.log(siswa)
    setOpenUpdate(prev => ({...prev, update: true}))
  };  
  
  const handleOpenDelete = (siswa) => {
    setSiswa(siswa)
    console.log(siswa)
    setOpenDelete(prev => ({...prev, update: true}))
  };
  
  const options = {
    selectableRows: false,
  };
  
  const handleSubmit = (event, type) => {
    event.preventDefault()

    if (type === 'create') {
      
      axios.post(`${process.env.REACT_APP_BACKEND}/student`, {nama: siswa.nama, nisn: siswa.nisn, ujian_sekolah: siswa.ujian_sekolah, rerata_raport: siswa.rerata_raport, ipa: siswa.ipa, minat: siswa.minat})
        .then(res => {
          const response = res.data.message;
          console.log(res.data.message);
          setSiswas(response);
          setSnackBarCreateIsOpen(true);
          handleCloseCreate()
        })
        .catch(err => {
          console.log(err.response.data.error)
          setSnackBarIsOpen(true);
        });

      console.log(event.target);
      console.log(type)

    }
    else if (type === 'update') {
      axios.put(`${process.env.REACT_APP_BACKEND}/student/${siswa.ID}`, {nama: siswa.nama, nisn: siswa.nisn, ujian_sekolah: siswa.ujian_sekolah, rerata_raport: siswa.rerata_raport, ipa: siswa.ipa, minat: siswa.minat})
        .then(res => {
          const response = res.data.message;
          setSiswas(response);
          console.log(res);
          setSnackBarUpdateIsOpen(true);
          handleCloseUpdate()
        })
        .catch(err => {
          console.log(err.response.data.error)
          setSnackBarIsOpen(true);
        });

      console.log(event.target);
    }
    else if (type === 'delete') {
      axios.delete(`${process.env.REACT_APP_BACKEND}/student/${siswa.ID}`)
      .then(res => {
        const response = res.data.message;
        setSiswas(response);
        console.log(res.data.message)
        setSnackBarDeleteIsOpen(true);
        handleCloseDelete()

      })
      .catch(err => {
        console.log(err.response.data.error)
      });
    }
    
  }

  const handleChange = (event, value) => {
    if (event.target.name === 'nama')(
      setSiswa(prev => ({...prev, nama: event.target.value}))
    )
    else if (event.target.name === 'nisn')(
      setSiswa(prev => ({...prev, nisn: event.target.value}))
    )
    else if (event.target.name === 'ujian_sekolah')(
      setSiswa(prev => ({...prev, ujian_sekolah: parseFloat(event.target.value)}))
    )
    else if (event.target.name === 'rerata_raport')(
      setSiswa(prev => ({...prev, rerata_raport: parseFloat(event.target.value)}))
    )
    else if (event.target.name === 'ipa')(
      setSiswa(prev => ({...prev, ipa: parseFloat(event.target.value)}))
    )
    else (
      setSiswa(prev => ({...prev, minat: value}))
    )
    console.log(event.target.name)
  }

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
        sort:true,
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      }
      
    },
    {
      label:'Ujian Sekolah',
      name: 'ujian_sekolah',
      selector: (row) => row.ujian_sekolah,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'Rerata Raport',
      name: 'rerata_raport',
      selector: (row) => row.rerata_raport,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'IPA',
      name: 'ipa',
      selector: (row) => row.ipa,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label:'Minat',
      name: 'minat',
      selector: (row) => row.minat,
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
            <button onClick={() => handleOpenUpdate(siswas[dataIndex])} style={{margin: '5px'}}> <CreateIcon color='warning'/></button> 
            <button onClick={() => handleOpenDelete(siswas[dataIndex])}> <DeleteIcon sx={{ color: pink[500]}}/></button>
            </div>    
          );
       }
    }
  }
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
  
      // const totalWeight = responseKriterias.reduce((sum, kriteria) => sum + kriteria.bobot, 0);
      // console.log(totalWeight)
      if (totalWeightActive !== 100) {
        setError('Total bobot kriteria harus sama dengan 100.');
        // Redirect ke halaman yang diinginkan jika bobot tidak valid
        navigate('/datakriteria');
      }
  
      
    });
  }, [setKriterias, navigate]);

  return (
    <>
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
            <Grid item xs={12} sx={{ p: 4}} >
              <Typography sx={{backgroundColor:"white", textAlign:"center", mb:1, width:"100%"}} variant="h5" color="initial" fontWeight={600}>DATA SISWA</Typography>
              
              <div>
                <Button onClick={handleOpenCreate} variant="contained" sx={{mb:1, alignItems:"end", display:"flex"}} color="success">
                  <PersonAddAlt1Icon sx={{marginRight:1}}/>  SISWA
                </Button>
              </div>
                            
              <MUIDataTable
                data={siswas}
                columns={columns}
                options={options}
              />
              
              <CreateSiswa
              handleCloseCreate={handleCloseCreate}
              openCreate={openCreate}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              siswa = {siswa}
              />
              <UpdateSiswa
              handleCloseUpdate={handleCloseUpdate}
              openUpdate={openUpdate}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              siswa = {siswa}
              />
              <DeleteSiswa
              handleCloseDelete={handleCloseDelete}
              openDelete={openDelete}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
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
    <Snackbar 
    open={SnackBarIsOpen} 
    onClose={() => setSnackBarIsOpen(false)}
    autoHideDuration={5000}>
      <Alert severity="error" sx={{ width: '100%' }}>
            NISN Sudah Terdaftar
      </Alert>

    </Snackbar>
    <Snackbar 
    open={SnackBarUpdateIsOpen} 
    onClose={() => setSnackBarUpdateIsOpen(false)}
    autoHideDuration={5000}>
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Siswa berhasil Di Update
      </Alert>

    </Snackbar>
    <Snackbar 
    open={SnackBarDeleteIsOpen} 
    onClose={() => setSnackBarDeleteIsOpen(false)}
    autoHideDuration={5000}>
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Siswa berhasil Di Delete
      </Alert>

    </Snackbar>
    <Snackbar 
    open={SnackBarCreateIsOpen} 
    onClose={() => setSnackBarCreateIsOpen(false)}
    autoHideDuration={5000}>
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Siswa berhasil Di Tambah
      </Alert>

    </Snackbar>
  </>
  );
};
