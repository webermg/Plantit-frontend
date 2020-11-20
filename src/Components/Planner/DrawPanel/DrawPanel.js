import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export default function DrawPanel(props) {
  const imgs = ['/images/grass.jpg',
    '/images/concrete.jpg',
    '/images/mulch.jpg',
    '/images/wood.jpg']
  return (
    <ButtonGroup orientation='vertical' className='draw-panel'>
      {imgs.map((img, i)=>(<Button key={i} variant='contained' color={props.active === i+1 ? 'primary' : ''} onClick={() => props.onClick(img,i+1)}>
        <img src={img} width={100} height={100} alt=""/>
      </Button>))}
    </ButtonGroup>
  )
}
