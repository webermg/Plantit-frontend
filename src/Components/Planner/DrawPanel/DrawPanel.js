import React,{useEffect, useRef} from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function DrawPanel(props) {
  // console.log(props.active)
  return (
    <ButtonGroup orientation='vertical' className='draw-panel'>
      <Button variant='contained' color={props.active==='/images/grass.jpg' ? 'primary' : ''} onClick={() => props.onClick('/images/grass.jpg')}>Grass</Button>
      <Button variant='contained' onClick={() => props.onClick('/images/concrete.jpg')} style={props.active==='/images/concrete.jpg' ? {background:'gray'} : {}}>Concrete</Button>
      <Button variant='contained' onClick={() => props.onClick('/images/mulch.jpg')} style={props.active==='/images/mulch.jpg' ? {background:'gray'} : {}}>Mulch</Button>
      <Button variant='contained' onClick={() => props.onClick('/images/wood.jpg')} style={props.active==='/images/wood.jpg' ? {background:'gray'} : {}}>Wood</Button>
    </ButtonGroup>
  )
}
