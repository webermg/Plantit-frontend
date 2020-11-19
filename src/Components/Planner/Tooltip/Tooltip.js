import React from 'react'
import { Text, Rect, Group } from 'react-konva'
import Konva from 'konva'

export default function Tooltip(props) {
  const textRef = React.useRef(null)
  textRef.current = new Konva.Text({
    x: props.x + Math.floor(props.width / 2),
    y: props.y + props.height + 20,
    padding:5,
    text:props.tooltip_text,
  })
  // React.useEffect(() => {
  //   textRef.current = new Konva.Text({
  //     text:props.tooltip_text
  //   })
  // },[])

  return (
    <Group>
      <Rect 
        x={props.x + Math.floor((props.width - textRef.current.width()) / 2)}
        y={props.y + props.height + 10}
        width={textRef.current.width()}
        height={textRef.current.height()}
        fill="white"
        stroke="black"
        strokeWidth={1}
        />
      <Text
        x={props.x + Math.floor((props.width - textRef.current.width()) / 2)}
        y={props.y + props.height + 10}
        padding={5}
        text={props.tooltip_text}
      />
    </Group>
  )
}

