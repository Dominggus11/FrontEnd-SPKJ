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
function UpdateCriteria({handleCloseUpdate, openUpdate, handleSubmit, kriteria, handleChange}) {
  
  
  return (
    <Modal
      open={openUpdate}
      onClose={handleCloseUpdate}
    >
      <Box component='form' sx={style} onSubmit={(e) => handleSubmit(e, 'update')}>
        <Stack spacing={1}>
        <Typography variant='subtitle2'>DATA KRITERIA</Typography>
            <TextField size='small' disabled  label="Nama Kriteria" value={kriteria?.nama} name='nama' onChange={handleChange} variant='outlined'/>
            <TextField size='small' required type={'number'} label="Bobot kriteria" value={kriteria?.bobot} name='bobot' onChange={handleChange} variant='outlined'/>
          <div>
            <Button variant="contained" color='success' type='submit'>Update</Button>
            <Button color='error' variant="contained" sx={{m:1}} onClick={handleCloseUpdate}>Cancel</Button>
          </div> 
        </Stack>
      </Box>
     </Modal>
  )
}

export default UpdateCriteria