import React from 'react'
import { Button, ButtonDanger, ButtonDangerOutLine } from './style'

const Buttons = ({typeButton,children, ...rest}) => {
    switch(typeButton){
        case "Danger":
            return (
                <ButtonDanger {...rest}>
                    {children}
                </ButtonDanger>
            )
        case 'Danger-Outline':
            return (
                <ButtonDangerOutLine {...rest}>
                    {children}
                </ButtonDangerOutLine>
            )
        default:
            return (
                <Button {...rest}>
                    {children}
                </Button>
            )
    }
    
}

export default Buttons
