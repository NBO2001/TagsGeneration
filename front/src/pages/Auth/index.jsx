import React, { useState, useContext } from 'react'
import api from '../../config';
import { useHistory } from "react-router-dom";
import {authContext} from '../../authContext';
import { PageBody, FormBack, FormLogin, Inputs, Buttons } from '../../components'

const Auth = () => {

    const [ user, setUser ] = useState({});

    let { setAuth } = useContext(authContext);

    let history = useHistory();

    const addValueUser = (e) => {
        setUser({
            [e.target.name]: (e.target.value ).toUpperCase() 
        })
    }
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }
    const sendBack = (e) => {
        e.preventDefault()
        api.post('/listUsers', user, headers)
        .then(({ data:datas }) => {
            const { data: [ user ] } = datas;
            user && setAuth({
                login: true,
                ...user
            })
            history.push('/home')
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
    return (
        <PageBody>
            <FormBack>
                <FormLogin onSubmit={sendBack}>
                    <Inputs type="text" name="name" required placeholder="Digite seu usuario" onChange={addValueUser}/>
                    <Buttons type="submit"> Entrar</Buttons>
                </FormLogin>
            </FormBack>
        </PageBody>
    )
}

export default Auth
