import React from 'react'
import { Footer, PeriodLeg, Period } from './style'
const FooterTag = ({ children}) => {
    return (
        <Footer>
            <PeriodLeg>Período</PeriodLeg>
            <Period>{ children}</Period>
            
        </Footer>
    )
}

export default FooterTag
