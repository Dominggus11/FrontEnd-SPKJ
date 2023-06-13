import React from 'react'
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  Autocomplete,
} from '@mui/material';
import { Stack } from '@mui/system';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign:'center',
  borderRadius:'10px',
};
function CreateSiswa({handleCloseCreate, openCreate, handleSubmit, siswa, handleChange}) {
  const options = [
    "IPA", "IPS",
  ]
  return (
    <Modal
      open={openCreate}
      onClose={handleCloseCreate}
    >
      <Box component='form' sx={style} onSubmit={(e) => handleSubmit(e, 'create')}>
        <Stack spacing={1}>
        <Typography variant='subtitle2'>DATA SISWA</Typography>
          <TextField size='small' required  label="Nama Siswa" value={siswa?.nama} name='nama' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required  label="NISN" value={siswa?.nisn} name='nisn' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'}  label="Ujian Sekolah" value={siswa?.ujian_sekolah} name='ujian_sekolah' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'} label="Rerata raport" value={siswa?.rerata_raport} name='rerata_raport' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'} label="Nilai IPA" value={siswa?.ipa} name='ipa' onChange={handleChange} variant='outlined'/>
          <Autocomplete
            options={options}
            value={siswa?.minat}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Minat" variant="outlined" />}
          />
          <div>
            <Button variant="contained" color='success' type='submit'>Tambah</Button>
            <Button color='error' variant="contained" sx={{m:1}} onClick={handleCloseCreate}>Cancel</Button>
          </div> 
        </Stack>
      </Box>
     </Modal>
  )
}

export default CreateSiswa