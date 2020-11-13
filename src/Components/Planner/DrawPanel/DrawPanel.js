import React,{useEffect, useRef} from 'react'

export default function DrawPanel(props) {
  let _grass,_concrete,_mulch,_wood;
  const grass = useRef(_grass)
  const concrete = useRef(_concrete)
  const mulch = useRef(_mulch)
  const wood = useRef(_wood)
  useEffect(() => {
    grass.current = new Image();
    grass.current.src = '/images/grass.jpg'
    concrete.current = new Image();
    concrete.current.src = '/images/concrete.jpg'
    mulch.current = new Image();
    mulch.current.src = '/images/mulch.jpg'
    wood.current = new Image();
    wood.current.src = '/images/wood.jpg'
  }, [])

  return (
    <div className='draw-panel'>
      <button color="green" onClick={() => props.onClick(grass.current)}style={props.active===grass.current ? {background:'green'} : {}}>Grass</button>
      <button color="blue" onClick={() => props.onClick(concrete.current)}style={props.active===concrete.current ? {background:'blue'} : {}}>Concrete</button>
      <button color="red" onClick={() => props.onClick(mulch.current)}style={props.active===mulch.current ? {background:'red'} : {}}>Mulch</button>
      <button color="yellow" onClick={() => props.onClick(wood.current)}style={props.active===wood.current ? {background:'yellow'} : {}}>Wood</button>
    </div>
  )
}
