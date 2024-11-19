import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import propTypes from 'prop-types';

export default function MUISearchField({label, onChange, type, value }) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': {width:'100%',color:"white",'& fieldset': {
            borderColor: '#555555',
          },
          '&:hover fieldset': {
            borderColor: 'blue',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'red', 
          }},'& .MuiInputLabel-root': {
          color: '#555555',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'blue',
        },'& .MuiOutlinedInput-root': {
          '& input': {
            color: 'white', 
          },
        } }}
      noValidate
      autoComplete="off"
    >
   
        <TextField sx={{height:'10rem'}}
          required
          id="standard-search"
          label={label}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue="search"
        />
        
    
      
    </Box>
  );
}

MUISearchField.propTypes = {
    label: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    type: propTypes.string,
    value: propTypes.string
}
