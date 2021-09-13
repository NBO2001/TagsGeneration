import styled from 'styled-components'
import Select from 'react-select'

export const Sc = styled(Select)`
    width: ${(props) => props.width? props.width: "200px"};
    margin: 5px;
`