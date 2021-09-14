import React, { useEffect,useContext, useState} from 'react'
import { sectorContext } from '../../sectorContext';
import api from '../../config';
import { Modal, PageBody, FormBack, Selects, FormLogin, Buttons, Inputs,
     DivConnteiner, ConnteinerDocs, ContennerButtons, ContennerBoxs }from '../../components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import maskUep from '../../utils/format/maskUep';
import { Redirect  } from "react-router-dom";

const Dash = ({location, ...rest}) => {

    const userId = localStorage.getItem('auth/id')
    const { config } = useContext(sectorContext);
    const [data, setData] = useState({});
    const [ boxs, setBoxs ] = useState();
    const [modal, setModal] = useState({isOpen:false})
    const [ doctype, setDoctype] = useState([])
    const [configGobal, setConfigGobal] = useState({});
    const [listDocs, setListDocs ] = useState([])
    
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }

   const notify = (tost,msg) => {
        switch(tost){
            case "Error":
                return toast.error(msg);
            case "Warn":
                return toast.warn(msg);
            case "Success":
                return toast.success(msg);
                
            default:
                return toast(msg);
        }
   };
    useEffect(() => {
        config && api.post('/seachUep', {
            client: config.client,
            openingFor: userId,
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
        if(data && data.idUep){
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
            openingFor: userId
        }, headers)
        .then(( { data }) => { 

            if(!data.error && data.response){
                setData(data.response)
            }
        })
        .catch((err) => console.log(err))
    }
    
    const addBox = async () => {
        try{
            let [tempA] = boxs.idBox;
        const idBox = (tempA && tempA.idBox)? tempA.idBox: 0;

        const { data: dataResponse } = await api.post('/addBox', {
            uep: data.id,
            idSector: config.sector,
            openingFor:  userId
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
        }catch(err){
            console.log(err)
            notify('Error', "Ocorreu um error inesperado")
        }
        
    }
    const  searchDocs = async (id) => {
        
        const { data:respData } = await api.get(`/tags/everytag/${id}`)

        if(!respData.error){
            setListDocs(respData.response)
        }
        
    }
    const openModal = (id) => {
        searchDocs(id)
        setModal({...modal, isOpen: true, inClick: id})
    }
    const closedBox = (id) => {
        //Criar a logica de geração de espelho aqui ?
        api.put('/updateBox', {boxOpen: 0 ,id}, headers)
        .then((response) => {
            setData({
                ...data
            })
            notify('Success',"Box Fechada com sucesso")
            // openTags(`box=${id}`)
            setModal({...modal, isOpen: false})
        })

    }
  
    const showBoxs  = () => {

        if(boxs){
            
            let [idbx] = boxs.idBox? boxs.idBox: [];
            
            const buttonsNumbers = 3 - ((idbx && idbx.idBox)? parseInt(idbx.idBox): 0)
            
            return (<>
            {boxs && boxs.boxs.map((onlyBox) => {
                
                if(onlyBox){
                    if(onlyBox.idSector === config.sector){
                        return (
                            <ContennerBoxs key={onlyBox.id}>
                                <h2>Index da Box:  {onlyBox.idBox}</h2>
                                <h2> Setor: {onlyBox.idSector}</h2>
                                <Buttons height="40px" width="50%" onClick={ () => openModal(onlyBox.id)}> Inserir dados</Buttons>
                            </ContennerBoxs>
                        )
                    }else{
                        return (
                            <div key={onlyBox.id}>
                                <h2>Index da Box:  {onlyBox.idBox}</h2>
                                <h2> Setor: {onlyBox.idSector}</h2>
                            </div>
                        )
                    }
                } })} 
            { (buttonsNumbers != 0) && (<Buttons width="50%" onClick={addBox}> Add Box</Buttons>) }
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
        const lastUpdate = userId;
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
        
        await doctype.map( async (doc) => {

            await api.post('/addTag', {
                ...valuesData,
                typeDoc: doc.label
            }, headers)
            .then(({data}) => { 
                
                if(!data.error){
                    searchDocs(idBox)
                    notify('Success', "Documento adicionado com sucesso")
                }else{
                    notify('Error', "Documento não adicionado")
                }
        })
            .catch((err) => {
                notify('Error', "Documento não adicionado")
            })
        })
    }
    const inputsData = (e) => {
        setDoctype(e) 
        
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
        .then((response) => {
            setData({})
            notify('Success', 'Uep Fechada com sucesso')
            openTags(`uep=${data.id}`)

        })
        .catch(() => console.log("Err"))
    }

    const openTags = (uep) => {
        window.open(`/generator/${uep}`, '_blank');
    }
    if(!config){
        return(
           <Redirect
                   to={{
                     pathname: "/home",
                     state: { from: location }
                   }}
                 />
         )
      }
    let typeDoc = [];
    return (
        <>
          <ToastContainer />
        <PageBody>
            <FormBack height="80vh" width="50vw">
                {data && data.id? (
                    <>
                    <div>
                        <h2>UEP: {maskUep('XXXXX',data.idUep)}</h2>
                        <h2>Quantidade de Boxs: {data.qntBoxs}</h2>

                    </div>
                    {showBoxs()}
                    <ContennerButtons>
                        <Buttons width="50%" onClick={() => openTags(`uep=${data.id}`)}> GerarTags </Buttons>
                        <Buttons width="50%" onClick={() => closedUep(data.id)}>Fechar Uep</Buttons>
                    </ContennerButtons>
                    </>
                ): (<ConnteinerDocs><Buttons width="90%" type="button" onClick={addUep}> Inserir Uep</Buttons></ConnteinerDocs>)}
            </FormBack>

        </PageBody>

        <Modal minwidth="90vw" open={modal.isOpen} onClose={() => setModal({...modal, isOpen: (!modal.isOpen)})}> 
            <DivConnteiner>

                <FormLogin width="50%" height="200px" onSubmit={sendDataBack}>
                    <Selects width="100%" isMulti onChange={inputsData} options={config && config.checkList ? config.checkList.map((check) => {
                    typeDoc.push({
                        value: `${check.id}`,
                        label: `${check.docType}`
                    })
                    return typeDoc
                    }): []} />
                    

                    <div>
                        <Inputs height="40px" width="47%" name="keyOne" onChange={addConfigGobal} placeholder="Primeira Chave" type="text" />
                        <Inputs height="40px" width="47%" name="keyTwo" onChange={addConfigGobal} placeholder="Segunda chave" type="text" />
                    </div>
                    <div>
                        <Inputs height="40px" width="47%" name="dateStart" onChange={addConfigGobal} type="date" />
                        <Inputs height="40px" width="47%" name="dateEnd" onChange={addConfigGobal} type="date" />
                    </div>
                    <Buttons type="submit"> Enviar </Buttons>
                    <Buttons type="button" onClick={() => setModal({...modal, isOpen: (!modal.isOpen)})}>Sair sem finalizar</Buttons>
                
                    <Buttons type="button" onClick={() => closedBox(modal.inClick)}>Fechar Box</Buttons>
                </FormLogin>

                <FormBack>
                    <ConnteinerDocs>
                    { listDocs && listDocs.map((listDoc) => {
                        return(<p key={listDoc.id}>{listDoc.typeDoc} - {listDoc.keyOne} - {listDoc.keyTwo} </p>)
                    })}
                    </ConnteinerDocs>
                    
                </FormBack>

            </DivConnteiner>
               
        </Modal>
        </>
    )
}

export default Dash
