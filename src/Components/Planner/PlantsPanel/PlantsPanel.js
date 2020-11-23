import React from 'react'
import {Button, ButtonGroup} from '@material-ui/core'
import HelpOutline from '@material-ui/icons/HelpOutline'
import {Link} from 'react-router-dom'

export default function PlantsPanel(props) {
  return (
    <ButtonGroup orientation='vertical' fullWidth color="primary" className='object-panel' style={{width:'100%'}}>
      {props.myPlants.map((plant,i) => (<ButtonGroup color="primary" style={{width:'100%'}}>
      <Button 
        key={i}
        onClick={()=>{
          const imgsrc = plant.image_url !== null ? plant.image_url : 'images/placeholder.png'
          props.onClick({
          src:imgsrc,
          text:plant.common_name})}}
        >{plant.common_name}</Button>
        <Button
        color='primary'
        size='small'
        onClick={()=>console.log("")}
        style={{width:'10%'}}>
            <Link target={"_blank"} to={'plant/'+plant.slug}><HelpOutline/></Link>
        </Button>
        </ButtonGroup>))}
    </ButtonGroup>
  )
}
