import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex',  width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
      <CircularProgress />
    </Box>
  );
}