import React, { useContext, useState, useEffect } from 'react'
import { useHistory  } from "react-router-dom"
import { sectorContext } from '../../sectorContext';
import { PageBody, FormBack, Selects, ModalHeard, 
    ButtonsIcons, Buttons,ConteinnerUeps, DivItem, TagUep } from '../../components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../config';
import maskUep from '../../utils/format/maskUep'

function Home() {

    const { setConfig } = useContext(sectorContext);
    const [ clients, setClients] = useState();
    const [ datas, setDatas] = useState({});
    const [ sectors, setSectors] = useState()
    const [ ueps, setUeps ] = useState([]);

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
    const notify = (msg) => toast.error(msg);

    const chnClient = async (e) => {
       const { data } = await api.post('/listSectors', {client: e.value}, headers)
       if(!data.error){
            setDatas({
                client: e.value
            })
            const { data:dataueps } = await api.get(`/seachUep/${e.value}`)
            if(!dataueps.error && dataueps.response.length){
                setUeps(dataueps.response)
            }
            if(data.response.length){
                setSectors(data.response)
            }else{
                setSectors([])
                setUeps([])
                notify("Nenhum setor encontrado!!")
            }
            
       }
        
    }
    console.log(ueps)
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
    
    const addValue = (e) => {
        
        const sect = sectors.map((sector) => (parseInt(sector.id) === parseInt(e.value)) && {
            id: sector.id,
            sector: sector.sector
        })
        
        const [result] = sect.filter(sect => sect);
        setDatas({
            ...datas,
            ...result
        })
        console.log(e.value)
        seachCheckList(result.id)
    }
    
    const redPage = () => {
        if(sectors && sectors.length){
            setConfig(datas)
            history.push('/dash')
        }else{
            notify('Nenhum Setor definido')
        }
    }
    
    const insertClient = () => {
        history.push('/adm/clients')
    }
    let arraTempClient = [];
    let arraTemSector = [];
    console.log(ueps)
    return (
        <PageBody>
            <ToastContainer />
            <FormBack>
                <ModalHeard>
                    <ButtonsIcons type="button" onClick={() => insertClient()} />
                </ModalHeard>

                <div>

                    <Selects label="Cliente" onChange={chnClient} options={clients? clients.map((clien) => {
                    arraTempClient.push({
                        value: `${clien.client}`,
                        label: `${clien.client}`
                    })
                    return arraTempClient
                    }): []} />
                    <Selects label="Setor"  onChange={addValue} options={sectors? sectors.map((sector) => {
                        arraTemSector.push({
                            value: `${sector.id}`,
                            label: `${sector.sector}`
                        })
                        return arraTemSector
                    }): []} />
                    <Buttons width="200px" type="button" onClick={() => redPage()}> Next </Buttons>
                </div>
                <div></div>
            </FormBack>
            <FormBack>
                    <ConteinnerUeps>
                        {ueps && ueps.map((uep) => {
                            return(
                                <DivItem key={uep.id}>
                                    <TagUep>
                                        <p>{uep.client}</p>
                                        <p>{maskUep('XXXXX',uep.idUep)}</p>
                                    </TagUep>
                                </DivItem>
                            )
                        })}
                        
                       
                    </ConteinnerUeps>
            </FormBack>
        </PageBody>
    )
}

export default Home
