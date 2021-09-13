import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width? props.width:  "80%"};
    height:  ${(props) => props.height? props.height:  "80%"};
`