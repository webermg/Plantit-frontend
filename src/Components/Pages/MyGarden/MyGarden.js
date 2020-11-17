import { Container } from '@material-ui/core'
import React, { Suspense } from 'react'
import Scene from '../../Planner/Scene/Scene'
import '../MyGarden/MyGarden.css'
import API from '../../../utils/API'

export default function MyGarden() {
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        API.getUser('5fb293ce08c420f0f92a628c').then(res => {
            setUserData(res.data);
            console.log(res.data)
        });
    }, [])

    if(!userData) return <h1>loading...</h1>

    return (
    <Container>
        <h2>my Garden</h2>
        <Scene userData={userData} />
    </Container>)


}
