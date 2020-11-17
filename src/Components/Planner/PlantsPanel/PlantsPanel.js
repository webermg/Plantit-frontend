import React from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function PlantsPanel(props) {
  return (
    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      {props.myPlants.map(plant => (<Button onClick={()=>props.onClick(plant.image_url)}>{plant.common_name}</Button>))}
    </ButtonGroup>
  )
}
