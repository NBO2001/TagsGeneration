import React from 'react'
import { DocList } from './style'

const DocsDiv = ( {children, ...rest}) => {
    return (
        <DocList {...rest}>
            {children}
        </DocList>
    )
}

export default DocsDiv
