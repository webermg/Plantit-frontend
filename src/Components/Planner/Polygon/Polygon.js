import React from "react";
import { Line, Circle } from "react-konva";
import useImage from "use-image";

export default function Polygon(props) {
  
  const polyRef = React.useRef();
  const[image]=useImage(props.fillPatternImage)

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
            draggable
            onDragStart={props.onDragStart}
            onDragEnd={e=>props.onDragEnd(e,props.num)}
          />
    </React.Fragment>
  );
}
