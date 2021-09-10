import React, { useMemo, useState } from 'react'
import { sectorContext } from '../../sectorContext';

const ProvaiderConfig = ({ children }) => {

    const [ config, setConfig] = useState()

    const provaiderConfig = useMemo(() => ({ config, setConfig }) ,[ config, setConfig] )

    return (
        <sectorContext.Provider value={provaiderConfig}>
            { children }
        </sectorContext.Provider>
    )
}

export default ProvaiderConfig
