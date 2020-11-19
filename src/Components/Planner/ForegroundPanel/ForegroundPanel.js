import React,{useEffect, useRef} from 'react'
import {Button, ButtonGroup} from '@material-ui/core'
import pics from './pics'

export default function ForeGroundPanel(props) {
  
  return (
    
    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      <h4>Trees</h4>
      {pics.tree.map(t=>(<Button onClick={() => props.onClick({src:t,text:""})}><img src={t} alt="" height={50} width={50}/></Button>))}
      <br/>
      <h4>Bushes</h4>
      {pics.bush.map(b=>(<Button onClick={() => props.onClick({src:b,text:""})}><img src={b} alt="" height={50} width={50}/></Button>))}
    </ButtonGroup>
  )
}