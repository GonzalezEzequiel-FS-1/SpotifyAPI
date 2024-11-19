import PropTypes from "prop-types"
import styled from "styled-components"


export default function TextField({type, onChange, value, placeholder}) {
  return (
    <>
      <TextInput
            type={type} 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </>
  )
}

TextField.propTypes={
    type:PropTypes.string,
    onChange:PropTypes.func,
    value:PropTypes.string,
    placeholder:PropTypes.string

}
const TextInput = styled.input`
    height:2.5rem;
    padding: 0.5rem;
    width:20rem;
    border-radius:5px;
    border:2px solid  #999999;
    background-color:#00000000;
    font-family:"Palanquin", sans;
    font-weight: 600;
    letter-spacing:.10rem;
`