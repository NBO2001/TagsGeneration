import styled from 'styled-components'

export const BackForm = styled.div`
    width: ${(props) => props.width? props.width: "500px"};
    height: ${(props) => props.height? props.height: "400px"};;
    background: #ffffff;
    border-radius: 20px;
    display: flex;
    margin: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width:922px) {
          width: 96%;
     }
`