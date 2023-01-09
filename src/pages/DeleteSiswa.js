import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React from 'react'

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

function DeleteSiswa({handleCloseDelete, openDelete, handleSubmit, siswa}) {
 return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
    >
      <Box component='form' sx={style} onSubmit={(e) => handleSubmit(e, 'delete')}>
        <Stack spacing={1}>
        <Typography variant='subtitle2'>Yakin ingin menghapus Data {siswa?.nama} ?</Typography>
          <div>
            <Button variant="contained" color='success' type='submit'>Ya</Button>
            <Button color='error' variant="contained" sx={{m:1}} onClick={handleCloseDelete}>Tidak</Button>
          </div> 
        </Stack>
      </Box>
     </Modal>
  )
}

export default DeleteSiswa