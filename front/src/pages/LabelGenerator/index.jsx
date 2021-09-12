import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config'
const LabelGenerator = () => {
    const { seach } = useParams()
    const valueSeach = seach.split('=');
    const itensSeach = {
        [valueSeach[0]]: parseInt(valueSeach[1]) 
    }
    if(valueSeach[0] === 'box'){
        api.get(`/tags/${valueSeach[1]}`)
        .then(({data}) => console.log(data))
        .catch((err) => console.log(err))
    }
    return (
        <>
            <div>
                
            </div>
        </>
    )
}

export default LabelGenerator
