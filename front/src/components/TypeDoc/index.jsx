import React from 'react'
import { Doc } from './style'

const TypeDoc = ({children, ...rest}) => {
    return (
        <Doc {...rest}>
            {children}
        </Doc>
    )
}

export default TypeDoc
