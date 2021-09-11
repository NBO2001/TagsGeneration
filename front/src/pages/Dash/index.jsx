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
    const [ doctype, setDoctype] = useState([])
    const [configGobal, setConfigGobal] = useState({});
    
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }
   
    useEffect(() => {
        api.post('/seachUep', {
            client: config.client,
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
                        idBox: dataResp.lastIndex
                    })
                  }  
                }
            })
            .catch( () => console.log("Error"))
        }
    }
    const addUep = () => {
        api.post('/addUep', {
            client: parseInt(config.client),
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
        let [tempA] = boxs.idBox;
        const idBox = (tempA && tempA.idBox)? tempA.idBox: 0;

        const { data: dataResponse } = await api.post('/addBox', {
            uep: data.id,
            idBox: (idBox+1),
            idSector: config.sector,
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
                qntBoxs: (idBox+1)
            })
        }
    }
    const openModal = (id) => {
        setModal({...modal, isOpen: true, inClick: id})
    }
    const closedBox = (id) => {
        //Criar a logica de geração de espelho aqui ?
        api.put('/updateBox', {boxOpen: 0 ,id}, headers)
        .then((response) => {
            setData({
                ...data
            })
            setModal({...modal, isOpen: false})
        })

    }
    const showBoxs  = () => {
        if(boxs){
            
            let [idbx] = boxs.idBox? boxs.idBox: [];
            
            const buttonsNumbers = 3 - ((idbx && idbx.idBox)? parseInt(idbx.idBox): 0)
            
            return (<>
            {boxs && boxs.boxs.map((onlyBox) => (
                <div key={onlyBox.id}>
                    <h2>Index da Box:  {onlyBox.idBox}</h2>
                    {console.log(onlyBox)}
                    <h2> Setor: {onlyBox.idSector}</h2>
                    <button onClick={ () => openModal(onlyBox.id)}> Inserir dados</button>
                </div>
            ))} 
            { (buttonsNumbers != 0) && (<button onClick={addBox}> Add Box</button>) }
            </>)
        }  
    }
    
    const sendDataBack = async (e) => {
        e.preventDefault();
        const uep =parseInt(data.id)
        const idBox = parseInt(modal.inClick)
        const idSector = parseInt(config.sector)
        const client = parseInt(config.client)
        const keyOne = configGobal.keyOne
        const keyTwo = configGobal.keyTwo
        const dateStart = configGobal.dateStart
        const  dateEnd  = configGobal.dateEnd
        const lastUpdate = auth.id;
        const valuesData = {
            uep,
            idBox,
            idSector,
            client,
            keyOne,
            keyTwo,
            dateStart,
            dateEnd,
            lastUpdate
        }

        const dataSend = await doctype.map( async (doc) => {

            await api.post('/addTag', {
                ...valuesData,
                typeDoc: doc.label
            }, headers)
            .then((response) => console.log(response))
            .catch((err) => console.log(err))
        })
    }
    const inputsData = (e) => {
        let tempDataT = doctype;
        let repts = 0;
        const semDupli = tempDataT.map((dt) => {
            if(dt.id === e.target.value){
                repts = repts + 1;
                return false;
            }else{
                return {
                    id: dt.id,
                    label: dt.label
                }
            }
        })
        if(!repts){
            let [tempData] = doctype;
            let tempObj = [tempData, {
                id: e.target.value,
                label: e.target.name
            }]
            let endArray = tempObj.filter(sect => sect);
            setDoctype(endArray)    
        }else{
            let endArray = semDupli.filter(sect => sect);
            setDoctype(endArray)   
        }
        
    }
    const addConfigGobal = (e) => {
        setConfigGobal({...configGobal,
            [e.target.name]: e.target.value  
        })
    }
    const closedUep = (id) => {
        api.put('/updateUep', {
            uepOpen: false,
            id
        })
        .then((response) => setData({}))
        .catch(() => console.log("Err"))
    }
    console.log(data)
    return (
        <>
        <div>
            {data && data.id? (
                <>
                <h2>UEP: {data.idUep}</h2>
                <h2>Quantidade de Boxs: {data.qntBoxs}</h2>
                {showBoxs()}
                <button onClick={() => closedUep(data.id)}>Fechar Uep</button>
                </>
            ): (<button type="button" onClick={addUep}> Inserir Uep</button>)}
        
            

        </div>

        <Modal open={modal.isOpen} onClose={() => setModal({...modal, isOpen: (!modal.isOpen)})}> 
                <form onSubmit={sendDataBack}>
                    {config.checkList.map((check) => {
                        return(
                            <label>
                                {check.docType}
                                <input type="checkbox" onChange={inputsData} key={check.id} value={check.id} name={check.docType}></input>
                            </label>
                        )
                    })}

                    <input name="keyOne" onChange={addConfigGobal} placeholder="Primeira Chave" type="text" />
                    <input name="keyTwo" onChange={addConfigGobal} placeholder="Segunda chave" type="text" />
                    <input name="dateStart" onChange={addConfigGobal} type="date" />
                    <input name="dateEnd" onChange={addConfigGobal} type="date" />
                    <button> Send </button>
                </form>
                <button onClick={() => closedBox(modal.inClick)}>Fechar Box</button>
        </Modal>
        </>
    )
}

export default Dash
