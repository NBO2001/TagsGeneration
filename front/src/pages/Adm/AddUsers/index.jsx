import React, { useState, memo } from 'react'
import { useHistory } from "react-router-dom";
import api from '../../../config';

const AddUsers = () => {
    const [ name, setName ] = useState({});

    let history = useHistory();

    const addName = (e) => {
        setName({
            [e.target.name]: (e.target.value).toUpperCase() 
        })
        
    }
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
   }
    const sendBack = (e) => {
        e.preventDefault();
        api.post('/addUsers', name ,headers)
        .then(() => {
            history.push('/')
        });
    }
    return (
        <div>
            <form onSubmit={sendBack}>
                <input type="text" name="name" onChange={addName} />
                <button type="submit"> Add user </button>
            </form>
        </div>
    )
}

export default memo(AddUsers)
