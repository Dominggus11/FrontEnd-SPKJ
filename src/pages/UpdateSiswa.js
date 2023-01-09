import React from 'react'
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
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
  textAlign:'center'
};
function UpdateSiswa({handleCloseUpdate, openUpdate, handleSubmit, siswa, handleChange}) {
  
  
  return (
    <Modal
      open={openUpdate}
      onClose={handleCloseUpdate}
    >
      <Box component='form' sx={style} onSubmit={(e) => handleSubmit(e, 'update')}>
        <Stack spacing={1}>
        <Typography variant='subtitle2'>DATA SISWA</Typography>
        <TextField size='small' required  label="Nama Siswa" value={siswa?.nama} name='nama' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required  label="NISN" value={siswa?.nisn} name='nisn' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'}  label="Ujian Sekolah" value={siswa?.ujian_sekolah} name='ujian_sekolah' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'} label="Rerata raport" value={siswa?.rerata_raport} name='rerata_raport' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'} label="Nilai IPA" value={siswa?.ipa} name='ipa' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required type={'number'} label="Nilai IPS" value={siswa?.ips} name='ips' onChange={handleChange} variant='outlined'/>
          <TextField size='small' required  label="Minat Siswa" value={siswa?.minat} name='minat' onChange={handleChange} variant='outlined'/>
          <div>
            <Button variant="contained" color='success' type='submit'>Update</Button>
            <Button color='error' variant="contained" sx={{m:1}} onClick={handleCloseUpdate}>Cancel</Button>
          </div> 
        </Stack>
      </Box>
     </Modal>
  )
}

export default UpdateSiswa