import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import propTypes from 'prop-types';
import styled from 'styled-components';

export default function MUIField({label, onChange, type, value }) {
  return (
    <Box
      component="form"
      sx={{ width: '100%', '& .MuiTextField-root': { m: 1, width: '80%', background:'#00000000'} }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <TextField
          required
          id="outlined-required"
          label={label}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue=""
        />
        
    
      </Container>
    </Box>
  );
}

MUIField.propTypes = {
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