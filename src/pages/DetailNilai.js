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
function DetailNilai({handleCloseDetail, openDetail, handleSubmit, siswa}) {
  return (
    <Modal
      open={openDetail}
      onClose={handleCloseDetail}
    >
      <Box component='form' sx={style} onSubmit={(e) => handleSubmit(e, 'update')}>
        <Stack spacing={1}>
        <Typography variant='subtitle2'>DATA SISWA</Typography>
        <TextField size='small' disabled  label="Nama Siswa" value={siswa?.nama} name='nama'  variant='outlined'/>
          <TextField size='small' disabled  label="NISN" value={siswa?.nisn} name='nisn'  variant='outlined'/>
          <TextField size='small' disabled type={'number'}  label="Hasil Akhir SAW" value={siswa?.resultVi_saw} name='resultVi_saw' variant='outlined'/>
          <TextField size='small' disabled type={'number'} label="Hasil Akhir SMART" value={siswa?.resultVi_smart} name='resultVi_smart'  variant='outlined'/>
          {/* <TextField size='small' required  label="Minat Siswa" value={siswa?.minat} name='minat' onChange={handleChange} variant='outlined'/> */}
          <div>
            
            <Button color='error' variant="contained" sx={{m:1}} onClick={handleCloseDetail}>Cancel</Button>
          </div> 
        </Stack>
      </Box>
     </Modal>
  )
}

export default DetailNilai