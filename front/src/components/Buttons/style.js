import styled from 'styled-components';

export const Button = styled.button`
    height: 50px;
    border: 0.3px solid #0CF5F5;
    border-radius: 10px;
    background: linear-gradient(90deg, #177AEB 0%, #0B9ED4 100%); 
    padding: 5px;
    font-size: 19px;
    cursor: pointer;
    margin: 3px;
    width: ${(props) => props.width? props.width: "100%" };
    :hover{
        background: linear-gradient(90deg, #0B9ED4 0%, #177AEB 100%); ;    
    }
`