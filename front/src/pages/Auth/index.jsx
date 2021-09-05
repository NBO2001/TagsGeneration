import React, { useState, useContext } from 'react'
import api from '../../config';
import { useHistory } from "react-router-dom";
import {authContext} from '../../authContext';

const Auth = () => {

    const [ user, setUser ] = useState({});

    let { setAuth } = useContext(authContext);

    let history = useHistory();

    const addValueUser = (e) => {
        setUser({
            [e.target.name]: e.target.value 
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
        <div>
            <form onSubmit={sendBack}>
                <input type="text" name="name" onChange={addValueUser}/>
                <button type="submit"> Entrar</button>
            </form>
        </div>
    )
}

export default Auth
