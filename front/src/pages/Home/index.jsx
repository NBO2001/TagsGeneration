import React, { useContext } from 'react'
import { authContext } from '../../authContext';
function Home() {
    
    const { auth } = useContext(authContext);
    console.log(auth)
    return (
        <div>
            <p>Home</p>
        </div>
    )
}

export default Home
