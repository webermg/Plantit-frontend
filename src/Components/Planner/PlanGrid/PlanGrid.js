import React from 'react'
import { Layer, Line } from 'react-konva'
import _ from "lodash";

export default function PlanGrid(props) {
  const WIDTH = 50,HEIGHT=50
  const lines = [];
  
  for(let i = 0; i <= props.height; i+=HEIGHT) {
    lines.push(0);
    lines.push(i);
    lines.push(props.width);
    lines.push(i)
  }
  
  for(let i = 0; i <= props.width; i+=WIDTH) {
    lines.push(i);
    lines.push(0);
    lines.push(i);
    lines.push(props.height)
  }

  return (
    <Layer>
      {_.chunk(lines, 4).map(coords => (
        <Line
          stroke="#AAAAAA"
          strokeWidth={1}
          points={coords}
        />
      ))}
    </Layer>
  )
}
