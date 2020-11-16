import React,{useEffect, useRef} from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function DrawPanel(props) {
  
  return (
    <ButtonGroup orientation='vertical' color="primary" className='draw-panel'>
      <Button color="green" onClick={() => props.onClick('/images/grass.jpg')} style={props.active==='/images/grass.jpg' ? {background:'green'} : {}}>Grass</Button>
      <Button color="blue" onClick={() => props.onClick('/images/concrete.jpg')} style={props.active==='/images/concrete.jpg' ? {background:'blue'} : {}}>Concrete</Button>
      <Button color="red" onClick={() => props.onClick('/images/mulch.jpg')} style={props.active==='/images/mulch.jpg' ? {background:'red'} : {}}>Mulch</Button>
      <Button color="yellow" onClick={() => props.onClick('/images/wood.jpg')} style={props.active==='/images/wood.jpg' ? {background:'yellow'} : {}}>Wood</Button>
    </ButtonGroup>
  )
}
