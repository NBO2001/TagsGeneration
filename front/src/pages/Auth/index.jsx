import React, { useState, useContext } from 'react'
import api from '../../config';
import { useHistory } from "react-router-dom";
import { PageBody, FormBack, FormLogin, Inputs, Buttons } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth = () => {

    const [ user, setUser ] = useState({});
    const notify = (msg) => toast.error(msg);

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
        if(!user.name){

            notify("Preencha todos os campos")
            return false;
        }
        api.post('/listUsers', user, headers)
        .then(({ data:datas }) => {
            const { data: [ user ] } = datas;
            localStorage.removeItem('auth/id')
            localStorage.removeItem('auth/name')
            localStorage.removeItem('auth/login')
            if(!user){
                notify("Senha ou Usuário incorreto")
            return false;
            }

            user && localStorage.setItem('auth/id', user.id)
            user && localStorage.setItem('auth/name', user.name)
            user && localStorage.setItem('auth/login', true)

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
                     <ToastContainer />
                    <Inputs type="text" name="name" placeholder="Digite seu usuario" onChange={addValueUser}/>
                    <Buttons type="submit"> Entrar</Buttons>
                </FormLogin>
            </FormBack>
        </PageBody>
    )
}

export default Auth
