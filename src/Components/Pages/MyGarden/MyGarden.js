import { Container } from '@material-ui/core'
import React from 'react'
import Scene from '../../Planner/Scene/Scene'
import '../MyGarden/MyGarden.css'

export default function MyGarden() {
    return (
        <Container>
            <h2>my Garden</h2>
            <Scene/>
        </Container>
    )
}
