import React, { useEffect,useContext, useState} from 'react'
import { sectorContext } from '../../sectorContext';
import api from '../../config';
import { authContext } from '../../authContext';

const Dash = () => {

    const { auth } = useContext(authContext);
    const { config } = useContext(sectorContext);
    const [data, setData] = useState();

    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }

    useEffect(() => {
        api.post('/seachUep', {
            openingFor: auth.id,
            uepOpen: 1
        }, headers)
        .then(( { data }) => {
            
            if(!data.error && data.response.length){
                const [dtResp] = data.response;
                setData(dtResp)
            }
        })
        .catch(() => {
            console.log("Erro")
        })
    },[])

    const addUep = () => {
        api.post('/addUep', {
            openingFor: auth.id
        }, headers)
        .then(( { data }) => { 

            if(!data.error && data.response){
                setData(data.response)
            }
        })
        .catch((err) => console.log(err))
    }
    console.log(data)
    return (
        <div>
            {data? (
                <>
                <h2>UEP: {data.id}</h2>
                <h2>Quantidade de Boxs: {data.qntBoxs}</h2>
                </>
            ): (<button type="button" onClick={addUep}> Inserir Uep</button>)}
        </div>
    )
}

export default Dash
