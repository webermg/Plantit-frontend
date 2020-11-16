import { Container } from '@material-ui/core'
import React from 'react'
import Scene from '../../Planner/Scene/Scene'
import '../MyGarden/MyGarden.css'
import API from '../../../utils/API'

export default function MyGarden() {
    const[userData,setUserData]=React.useState()

    React.useEffect(()=>{
        API.getUser('5fb293ce08c420f0f92a628c').then(res=>setUserData(res.data));
    },[])

    
    return (
        <Container>
            <h2>my Garden</h2>
            <Scene userData={userData}/>
        </Container>
    )
}
