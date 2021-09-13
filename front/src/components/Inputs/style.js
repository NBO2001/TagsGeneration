import styled from 'styled-components'

export const Input = styled.input`
    min-height: ${(props) => props.height? props.height: "50px"};
    min-width: ${(props) => props.width? props.width: "50px"};
    border: 0.3px solid #0CF5F5;
    border-radius: 15px;
    margin: 3px;
    padding: 5px;
    font-size: 19px;
`