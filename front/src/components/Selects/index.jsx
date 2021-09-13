import React from 'react'
import {Sc} from './style'

const Selects = ({label,options,...rest}) => {
    if(options[0] && options[0].length){
        var opt = options[0];
    }else{
        var opt = options;
    }
    return (
        <>
            <label>{label}</label>
            <Sc  options={opt} {...rest} />
        </>
    )
}

export default Selects
