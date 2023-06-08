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
  const [kriterias, setKriterias] = React.useState([]);
  const [kriteria, setKriteria] = useState(null);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleCloseUpdate = () => setOpenUpdate(false); 
  // const [siswas, setSiswas] = React.useState([]);
  const handleOpenUpdate = (kriteria) => {
    setKriteria(kriteria)
    console.log(kriteria)
    setOpenUpdate (prev => ({...prev, update: true}))
  };
 
  const options = {
    selectableRows: false,
  };

  const handleSubmit = (event, type) => {
    event.preventDefault()
    if (type === 'update') {
      axios.put(`${process.env.REACT_APP_BACKEND}/kriteria/${kriteria.id}`, {nama: kriteria.nama, bobot: kriteria.bobot})
        .then(response => {
          console.log(response.data.data);
          console.log(kriteria.ID)
          handleCloseUpdate()
        });

      console.log(event.target);
    }
  }

  const handleChange = (event, value) => {
    if (event.target.name === 'nama')(
      setKriteria(prev => ({...prev, nama: event.target.value}))
    )
    else if (event.target.name === 'bobot')(
      setKriteria(prev => ({...prev, bobot: parseFloat(event.target.value)}))
    )
    console.log(event.target.name)
    // else if (event  === 'first')(
    //   console.log(event)
    // )
    
  }

  const handleChangecheckbox = (data) => {
    setKriterias((prevKriterias) =>
      prevKriterias.map((kriteria) =>
        kriteria.id === data.id
          ? { ...kriteria, is_active: !kriteria.is_active }
          : kriteria
      )
    );
    if(data.is_active == 1)
    {
      data.is_active = 2
    }
    else{
      data.is_active = 1
    }
    axios
      .put(`${process.env.REACT_APP_BACKEND}/kriteria_active/${data.id}`, {
        is_active: data.is_active,
      })
      .then((response) => {
        console.log(response.data.data);
        console.log(data.is_active);
        handleCloseUpdate();
      });

      axios.get(`${process.env.REACT_APP_BACKEND}/normalisasi`).then((res) => {
        
      });
    console.log(kriterias);
    console.log(data);
  };

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
    label: 'ACTIVE',
    name: 'active',
    selector: (row) => row.nama,
    options: {
      setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px", textAlign:'center', justifyContent:'center'}}),
      setCellHeaderProps: () => ({ style: { textAlign:'center', justifyContent:'center', float:'end' }}),
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <div>
            <input type='checkbox' onChange={()=>handleChangecheckbox(kriterias[dataIndex])}
             style={{width: "28px", height: "28px"}} 
           
            //  checked={kriterias[dataIndex].is_active}
            checked={kriterias[dataIndex].is_active == 1}
             />
          </div>    
        );
     }
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
          <button onClick={() => handleOpenUpdate(kriterias[dataIndex])} value={true} style={{margin: '5px'}}> <CreateIcon color='warning'/></button> 
          </div>    
        );
     }
  },
},
];

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/kriteria`).then((res) => {
      const responseKriterias = res.data.message;
      setKriterias(responseKriterias);
    });
  }, [setKriterias]);

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
                options={options}
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
