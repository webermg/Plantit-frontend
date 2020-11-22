import React from 'react'
import {Button, ButtonGroup} from '@material-ui/core'
import pics from './pics'

export default function ForeGroundPanel(props) {
  
  return (
    <React.Fragment>

    <ButtonGroup orientation='vertical' color="primary" className='object-panel'>
      <h4>Trees</h4>
      {pics.tree.map((t,i)=>(<Button key={i} onClick={() => props.onClick({src:t.src,text:"",w:t.w,h:t.h})}><img src={t.src} alt="" width={100}/></Button>))}
      <hr/>
      <h4>Bushes</h4>
      {pics.bush.map((b,i)=>(<Button key={i} onClick={() => props.onClick({src:b.src,text:"",w:b.w,h:b.h})}><img src={b.src} alt="" width={100}/></Button>))}
      <h4>Fences</h4>
      {pics.fence.map((f,i)=>(<Button key={i} onClick={() => props.onClick({src:f.src,text:"",w:f.w,h:f.h})}><img src={f.src} alt="" width={100}/></Button>))}
      <h4>Furniture</h4>
      {pics.furniture.map((f,i)=>(<Button key={i} onClick={() => props.onClick({src:f.src,text:"",w:f.w,h:f.h})}><img src={f.src} alt="" width={100}/></Button>))}
      <h4>Water</h4>
      {pics.water.map((w,i)=>(<Button key={i} onClick={() => props.onClick({src:w.src,text:"",w:w.w,h:w.h})}><img src={w.src} alt="" width={100}/></Button>))}
      <h4>Paths</h4>
      {pics.path.map((p,i)=>(<Button key={i} onClick={() => props.onClick({src:p.src,text:"",w:p.w,h:p.h})}><img src={p.src} alt="" width={100}/></Button>))}
    </ButtonGroup>
      {/* <a href='https://www.freepik.com/free-vector/top-view-park-city-elements-flat-icon-set_9650855.htm'>Vector images created by pch.vector - www.freepik.com</a> */}
    </React.Fragment>
  )
}