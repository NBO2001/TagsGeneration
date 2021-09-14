import React from 'react'
import {BackForm} from './styled'
const FormBack = ({ children, ...rest }) => {
    return (
        <BackForm {...rest}>
            { children }
        </BackForm>
    )
}

export default FormBack
