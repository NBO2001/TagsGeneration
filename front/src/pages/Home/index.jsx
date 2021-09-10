import React, { useContext, useState, useEffect } from 'react'
import { useHistory  } from "react-router-dom"
import { authContext } from '../../authContext';
import { sectorContext } from '../../sectorContext';
import api from '../../config';
function Home() {

    const { auth } = useContext(authContext);
    const { setConfig } = useContext(sectorContext);
    const [ clients, setClients] = useState();
    const [ datas, setDatas] = useState({});
    const [ sectors, setSectors] = useState()

    let history = useHistory();

    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }
    useEffect(() => {
        api.get('/listClients')
        .then((response) => {
            const { data } = response;
            if(!data.error){
                setClients(data.response)
            }
            
        })
    },[])
    const chnClient = async (e) => {
       const { data } = await api.post('/listSectors', {client: e.target.value}, headers)
       if(!data.error){
            setDatas({
                client: e.target.value
            })
           setSectors(data.response)
       }
        
    }
    const seachCheckList = (id) => {
        api.post('/listCheck', {
            client: parseInt(datas.client),
            sector: parseInt(id)
        })
        .then(( {data} ) => {
            if(!data.error){
                setDatas(
                    {
                        ...datas,
                        sector: id,
                        checkList: data.response
                    }
                )
            }
        })
    }
    console.log(datas)
    const addValue = (e) => {
        const sect = sectors.map((sector) => (parseInt(sector.id) === parseInt(e.target.value)) && {
            id: sector.id,
            sector: sector.sector
        })
        const [result] = sect.filter(sect => sect);
        setDatas({
            ...datas,
            ...result
        })
        seachCheckList(result.id)
    }
    
    const redPage = () => {
        if(sectors && sectors.length){
            setConfig(datas)
            history.push('/dash')
        }
    }
   
    return (
        <div>
            <select onChange={chnClient}>
                <option> --- </option>
                { clients && clients.map((clien) => (<option value={clien.client} key={clien.client}>{clien.client}</option>))}
            </select>

            <h3>Setor:</h3>
            <select onChange={addValue}>
                <option value="null">----</option>
                { sectors && sectors.map((sector) => ( <option key={sector.sector} value={sector.id}>{sector.sector}</option>))}
            </select>

            <button type="button" onClick={() => redPage()}> Next </button>
        </div>
    )
}

export default Home
