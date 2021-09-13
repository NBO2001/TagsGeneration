import React from 'react'
import { ButtonCog, Icons } from './style'
const ButtonsIcons = ({children,...rest}) => {
    return (
        <ButtonCog {...rest}>
            <Icons className="fas fa-cog">{children}</Icons>
        </ButtonCog>
    )
}

export default ButtonsIcons
