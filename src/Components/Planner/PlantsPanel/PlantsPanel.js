import React from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function PlantsPanel(props) {
  return (
    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      {props.myPlants.map((plant,i) => (<Button 
        key={i}
        onClick={()=>{
          const imgsrc = plant.image_url !== null ? plant.image_url : 'images/placeholder.png'
          props.onClick({
          src:imgsrc,
          text:plant.common_name})}}
        >{plant.common_name}</Button>))}
    </ButtonGroup>
  )
}
