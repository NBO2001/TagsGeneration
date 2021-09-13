import React from 'react'
import { Form } from './style'
const FormLogin = ({ children, ...rest}) => {
    return (
        <Form {...rest}>
            {children}
        </Form>
    )
}

export default FormLogin
