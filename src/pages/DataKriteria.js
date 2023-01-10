import React, { useState } from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Container,
} from '@mui/material';
import { styles } from '../components/styles';
import axios from '../api/axios';
import CreateIcon from '@mui/icons-material/Create';
import MUIDataTable from 'mui-datatables';
import UpdateCriteria from './UpdateCriteria';

export const DataKriteria = () => {
  React.useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (!token) {
			// Arahkan ke halaman login jika token tidak ada di local storage
      window.location.href = '/';
		}
	}, []);
  const [kriterias, setKriterias] = React.useState([]);
  const [kriteria, setKriteria] = useState(null);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (kriteria) => {
    setKriteria(kriteria)
    console.log(kriteria)
    setOpenUpdate (prev => ({...prev, update: true}))
  };
  const handleCloseUpdate = () => setOpenUpdate(false); 
  
  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };
  
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/kriteria`).then((res) => {
      const responseKriterias = res.data.message;
      setKriterias(responseKriterias);
    });
  }, []);

  const handleSubmit = (event, type) => {
    event.preventDefault()
    if (type === 'update') {
      axios.put(`${process.env.REACT_APP_BACKEND}/kriteria/${kriteria.ID}`, {nama: kriteria.nama, bobot: kriteria.bobot})
        .then(response => {
          console.log(response.data.data);
          console.log(kriteria.ID)
          handleCloseUpdate()
          // window.location.reload() 
        });

      console.log(event.target);
    }
  }

  const handleChange = (event) => {
    if (event.target.name === 'nama')(
      setKriteria(prev => ({...prev, nama: event.target.value}))
    )
    else if (event.target.name === 'bobot')(
      setKriteria(prev => ({...prev, bobot: parseFloat(event.target.value)}))
    )
    console.log(event.target.name)
  }

  const columns = [
    {
      name: 'CODE',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (rowIndex, dataIndex) => "C"+(dataIndex.rowIndex + 1 ),
          setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
          setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
        }
    },
    {
      label: 'NAMA KRITERIA',
      name: 'nama',
      selector: (row) => row.nama,
      options: {
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center'}}),
        setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      },
    },
    {
      label: 'BOBOT KRITERIA',
      name:'bobot',
      selector: (row) => row.bobot,
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
            <button onClick={() => handleOpenUpdate(kriterias[dataIndex])} style={{margin: '5px'}}> <CreateIcon color='warning'/></button> 
            </div>    
          );
       }
    },
  }
    
    
  ];

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
                data={kriterias}
              />

              <UpdateCriteria 
               handleCloseUpdate={handleCloseUpdate}
               openUpdate={openUpdate}
               handleSubmit={handleSubmit}
               handleChange={handleChange}
               kriteria = {kriteria}
               />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
