import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config'
import { LogoTag, Tag, HeardTag, LineSector, FooterTag, 
    TagBody,TypeDoc, DocsDiv, BoxNumber } from '../../components'
import formatDate from '../../utils/format/formatDate'
import maskUep from  '../../utils/format/maskUep'
import returnDateOrder from '../../utils/format/returnDateOrder'

const LabelGenerator = () => {

    const [ configClient, setConfigClient ] = useState({})
    const [ boxs, setBoxs ] = useState([])

    const { seach } = useParams()
    
    const valueSeach = seach.split('=')

    const seachBoxs = async (response) => {
        var arrayEnd = []
        var stConfig;
        
        response.map(async (res) => {
            
            let box = {};

            const { data } = await api.get(`/tags/${res.id}`)
            
        if(!data.error){
            let  resp  = data.response
            
            let typeDocs = []
            
            resp.map((res) => {
                typeDocs.push(res.typeDoc)
                return true;
            })
            let [ aTem ] = data.lastDate? data.lastDate: [];
            let [ dtStart ] = data.firstDate;

            const dateStart = (dtStart && dtStart.dateStart)? dtStart.dateStart: [];
            
            const dateEnd  = (aTem && aTem.dateEnd)? aTem.dateEnd: [];
            
            if(dateStart){
                
                const { data:dataRes } = await api.get(`/seachBox/${aTem.idBox}`)
             
            box = {...box, typeDocs, dateStart, dateEnd}
            if(!dataRes.error){
                
                let  a2Tem  = dataRes.response;

                box = {...box, idBox: a2Tem.idBox}
               
                let configGob = {
                    uep: a2Tem.uep
                }
                
                const { data:dataSector } = await api.get(`/listSectors/${a2Tem.idSector}`)
    
                const clientResponse = dataSector.response;
    
                box = {...box, sector: clientResponse.sector}

                let tempAr = boxs;
                tempAr.push(box)
                setBoxs(tempAr)
                setConfigClient({...configClient, ...configGob,
                    clientName: clientResponse.clientName,
                    logoUrl: clientResponse.logoUrl 
                })                
            }
            }
            
        }})
    }

    const seachUep = async (id) => {
        
        const { data } = await api.get(`/getueps/${id}`)

        if(!data.error){
            const response = data.response;
            
            seachBoxs(response)

        }
    }

    useEffect(() => {
        if(valueSeach[0] === 'box'){
            seachBoxs([{id: valueSeach[1]}])
        }
        else{
            seachUep(valueSeach[1])
        }
    },[])
    
    return (
        <TagBody>
          {boxs && boxs.map((box) => {
              
                return(
                    <Tag key={box.idBox}>
                        <HeardTag>
                            <LogoTag src={configClient.logoUrl} alt={configClient.clientName} />
                            <BoxNumber>
                                <p>{`${maskUep('XXXXX',configClient.uep)}.${box.idBox}`}</p>
                            </BoxNumber>
                        </HeardTag>
                        
                        <LineSector sector={box.sector} /> 
                        <DocsDiv>
                            {box.typeDocs && box.typeDocs.map((doc) => {
                                return(<TypeDoc key={doc}> {doc} </TypeDoc>)
                            })}
                        </DocsDiv>
        
                        <FooterTag>
                            {returnDateOrder(formatDate(box.dateStart), formatDate(box.dateEnd))}
                        </FooterTag>
                    </Tag>
                )
            })}
        </TagBody>
    )
}

export default LabelGenerator
