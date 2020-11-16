import React,{useEffect, useRef} from 'react'
import {Button, ButtonGroup} from '@material-ui/core'

export default function ForeGroundPanel(props) {
  
  return (
    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      <Button color="green" onClick={() => props.onClick('tree')}>Tree</Button>
      <Button color="blue" onClick={() => props.onClick('bush')}>Bush</Button>
    </ButtonGroup>
  )
}