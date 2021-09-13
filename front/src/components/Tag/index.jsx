import React from 'react'
import {TagStruc} from './style'
const Tag = ({children, ...rest}) => {
    return (
        <TagStruc {...rest}>
            {children}
        </TagStruc>
    )
}

export default Tag
