import React from 'react'
import { Line, SectorLeg, SectorName } from './style'
const LineSector = ({sector}) => {
    return (
        <Line>
            <SectorLeg>Setor: </SectorLeg>
            <SectorName>{sector}</SectorName>
        </Line>
    )
}

export default LineSector
