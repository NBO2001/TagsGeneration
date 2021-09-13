import React from 'react'
import { Button } from './style'

const Buttons = ({children, ...rest}) => {
    return (
        <Button {...rest}>
            {children}
        </Button>
    )
}

export default Buttons
