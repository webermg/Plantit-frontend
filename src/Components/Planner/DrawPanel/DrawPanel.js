import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export default function DrawPanel(props) {
  const imgs = ['/images/background/grass.jpg',
    '/images/background/concrete.jpg',
    '/images/background/mulch.jpg',
    '/images/background/wood.jpg',
    '/images/background/gravel.jpg',
    '/images/background/shingle.jpg',
  ]
  return (
    <ButtonGroup orientation='vertical' className='draw-panel'>
      {imgs.map((img, i)=>(<Button key={i} variant='contained' color={props.active === i+1 ? 'primary' : ''} onClick={() => props.onClick(img,i+1)}>
        <img src={img} width={100} alt=""/>
      </Button>))}
    </ButtonGroup>
  )
}
