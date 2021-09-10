import React, { useEffect,useContext, useState} from 'react'
import { sectorContext } from '../../sectorContext';
import api from '../../config';
import { authContext } from '../../authContext';
import { Modal }from '../../components'

const Dash = () => {

    const { auth } = useContext(authContext);
    const { config } = useContext(sectorContext);
    const [data, setData] = useState({});
    const [ boxs, setBoxs ] = useState();
    const [modal, setModal] = useState({isOpen:false})

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
    useEffect(() => {
        seachBox()
    },[data])

    const seachBox = () => {
        if(data && data.id){
            api.post('/seachBox',{
                uep: data.id,
                boxOpen: 1
            }, headers)
            .then(({data: dataResp}) => {
                if(!dataResp.error){
                    
                  if(dataResp.response){
                    setBoxs({
                        boxs: dataResp.response,
                        qnt: dataResp.response.length
                    })
                  }  
                }
            })
            .catch( () => console.log("Error"))
        }
    }
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
    const addBox = async () => {
        const { data: dataResponse } = await api.post('/addBox', {
            uep: data.id,
            idBox: (boxs.qnt+1),
            idSector: config.id,
            openingFor:  auth.id
        });
     
        if(!dataResponse.error){
            const { box } = dataResponse.response;
            
            const objTemp = {
            ...boxs,
            boxs: [...boxs.boxs, box]
            
            }
            setBoxs(objTemp)
            setData({
                ...data,
                qntBoxs: box.idBox
            })
        }
    }
    const openModal = (id) => {
        console.log(id)
        setModal({...modal, isOpen: true, inClick: id})
    }
    const showBoxs  = () => {
        if(boxs){

            const buttonsNumbers = 3 - boxs.qnt
            
            return (<>
            {boxs && boxs.boxs.map((onlyBox) => (
                <div key={onlyBox.id}>
                    <h2>Index da Box:  {onlyBox.idBox}</h2>
                    <h2> Setor: {onlyBox.idSector}</h2>
                    <button onClick={ () => openModal(onlyBox.id)}> Inserir dados</button>
                </div>
            ))} 
            { (buttonsNumbers > 0) && (<button onClick={addBox}> Add Box</button>) }
            </>)
        }  
    }
    boxs && console.log(config)
    return (
        <>
        <div>
            {data? (
                <>
                <h2>UEP: {data.id}</h2>
                <h2>Quantidade de Boxs: {data.qntBoxs}</h2>
                {showBoxs()}
                </>
            ): (<button type="button" onClick={addUep}> Inserir Uep</button>)}
        
            

        </div>
        
        <Modal open={modal.isOpen} onClose={() => setModal({...modal, isOpen: (!modal.isOpen)})}> 
        
                <p>uep: {data.id}</p>
                <p>idBox: {modal.inClick}</p>
                <p>idSetor: {config.id}</p>
                <p>client: {config.client} </p>
                {config.checkList.map((check) => {
                    return(
                        <p key={check.id}>{check.docType}</p>
                    )
                })}

                <p>, ,  ,  , , keyOne, keyTwo, dateStart, dateEnd</p>
        </Modal>
        </>
    )
}

export default Dash
