import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';
import { Tooltip } from '@material-ui/core'

export default function PlanImage({ shapeProps, isSelected, onSelect, onChange, onMouseEnter, onMouseLeave }) {

  const [image] = useImage(shapeProps.src, 'Anonymous');
  const imgRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      console.log("hi")
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        image={image}
        onMouseDown={onSelect}
        onTap={onSelect}
        ref={imgRef}
        {...shapeProps}
        onMouseEnter={()=>{
          onMouseEnter({
            x:shapeProps.x,
            y:shapeProps.y,
            width:shapeProps.width,
            height:shapeProps.height,
            tooltip_text:shapeProps.tooltip_text
          })
        }}
        onMouseLeave={onMouseLeave}
        draggable
        onDragStart={onMouseLeave}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>

  );
}