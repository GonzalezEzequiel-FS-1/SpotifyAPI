import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import propTypes from 'prop-types';
import styled from 'styled-components';

export default function MUISearchField({label, onChange, type, value }) {
  return (
    <Box
      component="form"
      sx={{ width: '100%', '& .MuiTextField-root': {color:"white", m: 1, width: '80%',  '& fieldset': {
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
      <Container>
        <TextField
          required
          id="standard-search"
          label={label}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue="search"
        />
        
    
      </Container>
    </Box>
  );
}

MUISearchField.propTypes = {
    label: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    type: propTypes.string,
    value: propTypes.string
}
const Container = styled.div`
width: 100%;
display: flex;
justify-content:center;
`