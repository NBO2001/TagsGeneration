import React, { useState, useEffect } from 'react'
import api from '../../../config'
import { Modal }from '../../../components'

const ManagerClients = () => {
    
    const [ dataForBack, setDataForBack ] = useState({});
    const [ clientList, setClientList] = useState([])
    const [ modal, setModal] = useState({openned: false})
    const [ sector, setSector] = useState({})
    const [ listSector, setListSector] = useState([])
    useEffect(() => {
        api.get('/listClients', headers)
        .then(({ data }) => {
            if(!data.error){
                setClientList(data.response)
            }
        })
        .catch((err) => console.log(err))
    },[])
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }

    const addInformations = (e) => {
        setDataForBack({
            [e.target.name]: e.target.value
        })
    }
    const sendDataBack = (e) => {
        e.preventDefault();
        api.post('/addClient', dataForBack, headers)
        .then(({data}) => {
            if(!data.error){
                let dt = data.response
                setClientList([ ...clientList,
                    dt])

            }
        })
        .catch((err) => console.log(err))

    }
    const sendModal = (id) => {
        listSectors(modal.inClicked)
        setModal({
            ...modal,
            openned: true,
            inClicked: id
        })
    }
    const addSetor = (e) => {
        setSector({
            client: modal.inClicked,
            [e.target.name]: e.target.value
        })
    }
    const sendBackData = (e) => {
        e.preventDefault();
        api.post('/addSector', sector, headers)
        .then(({data}) => console.log(data))
        .catch((err) => console.log(err))
    }

    const listSectors = (id) => {
        api.post('/listSectors', { client: id }, headers)
        .then(({data}) => {
            if(!data.error){
                setListSector(data.response)
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <>  
            <div>
                <form onSubmit={sendDataBack}>
                    <input type="number" name="client" placeholder='Nº Cliente' min="1" onChange={addInformations} />
                    <button type="submit"> Adicionar Cliente</button>
                </form>
                <div>
                    {clientList && clientList.map((client) => {
                        return (
                            <>
                                <p key={client.id}>id: { client.id } client: {client.client}</p>
                                <button onClick={() => sendModal(client.client)}> Detalhes de setores</button>
                            </>
                        )
                    })}
                </div>
            </div>

            <Modal open={modal.openned} onClose={() => setModal({...modal, openned: (!modal.openned) })}>
                <div>
                    <p>{modal.inClicked}</p>
                    <form onSubmit={sendBackData}>
                        <input type="text" name="sector" placeholder="Qual setor?" onChange={addSetor} />
                        <button type='submit'> Adicionar Setor</button>
                    </form>
                    {listSector && listSector.map((scs) => {
                        return (<p>Um</p>)
                    })}                    
                </div>
            </Modal>
        </>
    )
}

export default ManagerClients
