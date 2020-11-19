import React, { useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Line, Circle, Transformer } from "react-konva";
import _ from "lodash";
import useImage from "use-image";

export default function Polygon(props) {
  
  const polyRef = React.useRef();
  const circleRef = React.useRef();
  const[image]=useImage(props.fillPatternImage)
  
  const circleOrder = []
  for(let i = 0; i < props.points.length; i+=2) {
    circleOrder.push(i/2);
  }

  return (
    <React.Fragment>
          <Line
            closed
            fillPatternImage={image}
            ref={polyRef}
            stroke="black"
            strokeWidth={0}
            id={props.id}
            points={props.points}
            onClick={props.onSelect}
          />
          {props.isSelected && circleOrder.map((circle, i) => (
            <Circle
              ref={circleRef}
              x={props.points[circle*2]}
              y={props.points[circle*2+1]}
              key={i}
              radius={props.radius}
              fill="white"
              stroke="black"
              strokeWidth={1}
              rotateEnabled={false}
              draggable
              onDragMove={e => {
                props.onDragMove(e, props.num, circle);
              }}
              onClick={props.onClick}
            />
          ))}
    </React.Fragment>
  );
}
