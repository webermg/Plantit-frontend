import React, { useState } from 'react'
import API from './API'

export default function GetToken() {
    const [token, setToken] = useState("")
    function getNewToken() {
        API.getToken().then(result=> {
            setToken(result.data.token)
        },err=> console.log(err))
    }

    return (
        <div>
            <button onClick={getNewToken}>New token</button>
            <p>{token}</p>
        </div>
    )
}
