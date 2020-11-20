import React from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function PlantsPanel(props) {
  return (
    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      {props.myPlants.map((plant,i) => (<Button 
        key={i}
        // onClick={()=>props.onClick({src:'https://cors-anywhere.herokuapp.com/' + plant.image_url,text:plant.common_name})}
        onClick={()=>props.onClick({src:plant.image_url,text:plant.common_name})}
        >{plant.common_name}</Button>))}
    </ButtonGroup>
  )
}
