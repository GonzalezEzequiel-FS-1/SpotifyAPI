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
    type:PropTypes.string.isRequired,
    onChange:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,

}
const TextInput = styled.input`
    height:2rem;
    border-radius:5px;
    border:2px solid  #99999950;
    background-color:#00000000
`