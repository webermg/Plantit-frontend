import React, { useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Line, Circle, Transformer } from "react-konva";
import _ from "lodash";

export default function Polygon(props) {
  
  
  const polyRef = React.useRef();
  const circleRef = React.useRef();
  // const [circleOrder, setcircleOrder] = useState([])
  const circleOrder = []
  for(let i = 0; i < props.points.length; i+=2) {
    circleOrder.push(i/2);
  }
  useEffect(() => {
    // let cOrder = []
    // for(let i = 0; i < props.points.length; i+=2) {
    //   cOrder.push(i/2);
    // }
    // setcircleOrder(cOrder)
  }, []);

  // const handleCircleClick = (circleX,circleY) => {
  //   let cOrder = [...circleOrder]
  //   const circleNum = cOrder.filter(c => props.points[c*2] === circleX && props.points[c*2+1] === circleY)[0]
  //   console.log(circleNum);
  //   const cnidx = cOrder.indexOf(circleNum)
  //   cOrder.splice(cnidx,1)
  //   cOrder.unshift(circleNum)
  //   // cOrder[cnidx] = cOrder[0];
  //   // cOrder[0] = circleNum
  //   console.log(cOrder)
  //   console.log(props.points)
  //   setcircleOrder(cOrder)
  // }

  return (
    <React.Fragment>
          <Line
            closed
            fillPatternImage={props.fillPatternImage}
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
              strokeWidth={3}
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

//_.chunk(props.points, 2)
