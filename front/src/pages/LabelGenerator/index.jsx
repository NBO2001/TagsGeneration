import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config'
import { LogoTag, Tag, HeardTag } from '../../components'

const LabelGenerator = () => {

    const [ configClient, setConfigClient ] = useState({})
    const [ boxs, setBoxs ] = useState([])

    const { seach } = useParams()
    
    const valueSeach = seach.split('=')

    const exeSeach = async () => {

        if(valueSeach[0] === 'box'){

            const { data } = await api.get(`/tags/${valueSeach[1]}`)
            
            if(!data.error){
                let  resp  = data.response
                let box = {};
                let typeDocs = []
                
                resp.map((res) => {
                    typeDocs.push(res.typeDoc)
                    return true;
                })
                
                let [ aTem ] = data.firstDate;
                
                let [ dtStart ] = data.lastDate;

                const dateStart = dtStart.dateStart;

                const dateEnd = aTem.dateStart;
                
                const { data:dataRes } = await api.get(`/seachBox/${aTem.idBox}`)
                box = {...box, typeDocs, dateStart, dateEnd}
                if(!dataRes.error){

                    let [ a2Tem ] = dataRes.response;

                    box = {...box, idBox: a2Tem.idBox}
                    
                    let configGob = {
                        uep: a2Tem.uep
                    }
                    
                    const { data:dataSector } = await api.get(`/listSectors/${a2Tem.idSector}`)
        
                    const clientResponse = dataSector.response;
        
                    box = {...box, sector: clientResponse.sector}
                   
                    setConfigClient({...configClient, ...configGob,
                        clientName: clientResponse.clientName,
                        logoUrl: clientResponse.logoUrl 
                    })
                    setBoxs([...boxs,box])

                }
            }
        }
    }
    console.log(boxs)
    useEffect(() => {
        exeSeach()
    },[])
    return (
        <>
          {boxs && boxs.map((box) => {
              console.log(box.idBox)
                return(
                    <Tag key={box.idBox}>
                        <HeardTag>
                            <LogoTag src="https://www.accion.org/static/accion-logo.png" alt="accion" />
                            <div>
                                <p>BOX 454</p>
                            </div>
                        </HeardTag>
                        <div>
                            <label>Setor</label>
                            <p>{box.sector}</p>
                        </div>
                        <div>
                            {box.typeDocs.map((doc) => {
                                return(<p key={doc}> {doc} </p>)
                            })}
                        </div>
        
                        <div>
                            <p>Periodo</p>
                            <p>{box.dateStart} - {box.dateEnd}</p>
                        </div>
                    </Tag>
                )
            })}
        </>
    )
}

export default LabelGenerator
