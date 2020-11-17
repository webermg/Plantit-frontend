import React, { useState, useEffect } from 'react'
import Polygon from '../Polygon/Polygon'
import PlanImage from '../PlanImage/PlanImage'
import Konva from "konva";
import { Stage, Layer, Line, Circle, Transformer } from "react-konva";
import _ from "lodash";
import PlanGrid from '../PlanGrid/PlanGrid';
import sceneStyle from './sceneStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TabMenu from '../TabMenu/TabMenu'
import useDidMountEffect from '../Hooks/useDidMountEffect';

export default function Scene(props) {
  const classes = sceneStyle;

  const [polygons, _setPolygons] = useState([])
  
  const [images, _setImages] = useState([])
  const [selectedId, _selectShape] = React.useState(null);

  const [drawing, _setDrawing] = useState(false)
  const [temp, setTemp] = useState({
    points: []
  })

  const[mousePos, setMousePos] = useState();
  const[options, setOptions] = useState({displayGrid: true})
  
  //refs
  const drawRef = React.useRef(drawing);
  const setDrawing = data => {
    drawRef.current = data;
    _setDrawing(data);
  };
  const selectRef = React.useRef(selectedId);
  const selectShape = data => {
    selectRef.current = data;
    _selectShape(data);
  };
  const polysRef = React.useRef(polygons);
  const setPolygons = data => {
    polysRef.current = data;
    _setPolygons(data);
  };
  const imagesRef = React.useRef(images);
  const setImages = data => {
    imagesRef.current = data;
    _setImages(data);
  };


  const stageRef = React.useRef();

  const RADIUS = 6;
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    // setTimeout(loadFromLocalStorage,5000);
    loadFromLocalStorage()
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [])


  useEffect(() => {
    //test drawing for effect
    if (drawing) {
      console.log(drawing)
    }
    else {
      if (temp.points && temp.points.length > 4) {
        console.log("added")
        console.log(temp.points)
        const toAdd = {...temp}
        toAdd.id=Date.now()+Math.random();
        console.log(toAdd)
        const polys = getPolygons()
        polys.push(toAdd);
        setPolygons(polys);
        // setTemp({})
      }
      setTemp({})
    }
    //test temp for completeness
    //if complete then add
    //if not complete then discard
    //
  }, [drawing])

  useDidMountEffect(() => {
    saveToLocalStorage()
  },[polygons,images,options])

  const getPolygons = () => {
    let res = [];
    for (let i = 0; i < polysRef.current.length; i++) {
      res.push({ ...polysRef.current[i] });
    }
    return res;
  }

  const saveToLocalStorage = () => {
    const data = {
      polygons:polygons,
      images:images,
      options:options
    }
    window.localStorage.setItem("gardenData",JSON.stringify(data));
  }

  const loadFromLocalStorage = () => {
    let data = window.localStorage.getItem("gardenData")
    if(data !== null) {
      console.log("loading...")
      data = JSON.parse(data);
      console.log(data)
      setPolygons(data.polygons);
      setImages(data.images);
      setOptions(data.options);
  }
}

  const handleOptionsChange = (e) => {
    console.log("hi")
    setOptions({ ...options, [e.target.name]: e.target.checked });
  }

  const handleStageClick = (e) => {
    console.log(e.target)
    if (!drawing) {
      // console.log(e)
      if (e.target instanceof Konva.Line || e.target instanceof Konva.Image) return
      // setSelected(null)
      selectShape(null)
    }
    else {

      const x = e.evt.layerX
      const y = e.evt.layerY
      const coords = [...temp.points]
      let distToFirst = 200
      if (temp.points && temp.points.length >= 3) {
        console.log(x + " " + y + " " + coords[0] + " " + coords[1])
        distToFirst = (x - coords[0]) ** 2 + (y - coords[1]) ** 2
      }
      if (distToFirst <= 150) {
        coords.pop()
        coords.pop()
        console.log("drawing off")
        setTemp({ ...temp, points: coords });
        setDrawing(false)
      }
      else {
        coords.push(x)
        coords.push(y)
        setTemp({ ...temp, points: coords });
      }
    }
  }

  const handleKeyPress = (e) => {
    console.log(e)
    if (drawRef.current) {
      
      e.preventDefault();

      if (e.keyCode === 27) {
        setTemp({})
      }
      if (e.keyCode === 27 || e.keyCode === 13) {
        console.log("drawing off")
        setDrawing(false)
      }
    }
    else {
      if(e.keyCode===46 && selectRef.current) {
        console.log(selectRef.current)
        deleteShape(selectRef.current)
      }
    }
  }

  const deleteShape = id => {
    let polys = getPolygons()
    console.log(polys)
    polys = polys.filter(item=>item.id!==id)
    console.log(polys)
    setPolygons(polys)
    setImages(imagesRef.current.filter(item=>item.id!==id))
    selectShape(null)
  }

  const handleDrawBtnClick = (imageURL) => {
    selectShape(null);
    if (drawing) {
      console.log("drawing off")
      setDrawing(false)
      // const polys = getPolygons()
      // polys.push(temp);
      // setPolygons(polys);
      setTemp({});
    }
    else {
      console.log("drawing on")
      setDrawing(true);
      setTemp({ points: [], fillPatternImage: imageURL })
    }

  }

  // const handleBeginCircleDrag = (circleX, circleY) => {
  
  // }

  const handleCircleDrag = (e, index, circle) => {
    console.log(e)
    const mouseX = e.evt.layerX
    const mouseY = e.evt.layerY
    const newPoints = [...polygons[index].points];
    // const xidx = newPoints.indexOf(circleX);
    // const yidx = newPoints.indexOf(circleY);
    // console.log(circle)
    // console.log(newPoints)
    // console.log(circleX + " " + circleY)
    // Changing the points state with new points while dragging the circle
    const stageX = stageRef.current.content.offsetLeft
    const stageY = stageRef.current.content.offsetTop
    const stageW = 800
    const stageH = 800
    //TODO: make this more efficient
    const [newX, newY] = checkGridSnap(mouseX,mouseY,15,50,50);
    // if (e.evt.clientX < stageX) newX = 0
    // else if (e.evt.clientX > stageX + stageW) newX = stageW
    // else 
    // newX = e.evt.layerX;
    // if (e.evt.clientY < stageY) newY = 0
    // else if (e.evt.clientY > stageY + stageH) newY = stageH
    // else 
    // newY = e.evt.layerY;
    newPoints[2 * circle] = newX;
    newPoints[2 * circle + 1] = newY;
    // console.log(e.evt.clientX + " " + e.evt.clientY)
    // console.log(stageRef.current.content.offsetLeft + " " + stageRef.current.content.offsetTop)
    // console.log(e.currentTarget.content.offsetX + " " + e.currentTarget.content.offsetY)

    
    // console.log(newPoints)
    const temp = getPolygons()
    temp[index].points = newPoints;
    setPolygons(temp);
  }

  const handleMouseMove = (e) => {
    const coords = [e.evt.layerX, e.evt.layerY]
    if (!drawing) {
      
      return;
    }
    // console.log("hi")
    const tempCopy = [...temp.points]
    // console.log(temp.points)
    if (tempCopy.length >= 2) {
      tempCopy.pop();
      tempCopy.pop();
    }
    // console.log(tempCopy.points)
    
    let distToFirst = 300;
    let xFirst,yFirst
    if(tempCopy.length > 6) {
      xFirst = temp.points[0]
      yFirst = temp.points[1]
      distToFirst = (xFirst - coords[0]) ** 2 + (yFirst - coords[1]) ** 2
    }

    if(distToFirst <= 225) {
      tempCopy.push(xFirst)
      tempCopy.push(yFirst)
      setMousePos({
        mouseX: xFirst,
        mouseY: yFirst
      })
    }
    else {
      const pos = checkGridSnap(coords[0],coords[1], 15, 50,50)
      setMousePos({
        mouseX: pos[0],
        mouseY: pos[1]
      })
      tempCopy.push(pos[0])
      tempCopy.push(pos[1])
    }
    setTemp({ ...temp, points: tempCopy });
  }

  const handleObjectBtnClick = src => {
    // const src = pics[type][Math.floor(Math.random()*pics[type].length)]
    const newObj = {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      src: src,
      id: Date.now()+Math.random(),
    }
    const imgs = images.slice();
    imgs.push(newObj)
    setImages(imgs)
  }

  const checkGridSnap = (x,y,snapDist,gridHeight,gridWidth) => {
    //determine grid box
    const gridCoordX = Math.floor(x/gridWidth);
    const gridCoordY = Math.floor(y/gridHeight);
    //check four corners
    const gridCornerUL = [gridCoordX * gridWidth, gridCoordY * gridHeight]
    const gridCornerUR = [(gridCoordX+1) * gridWidth, gridCoordY * gridHeight]
    const gridCornerLL = [gridCoordX * gridWidth, (gridCoordY+1) * gridHeight]
    const gridCornerLR = [(gridCoordX+1) * gridWidth, (gridCoordY+1) * gridHeight]
    // console.log(x + " " + y + " " + gridCornerUL + " " + gridCornerUR + " " + gridCornerLL + " " + gridCornerLR)
    let min = Number.MAX_SAFE_INTEGER;
    let closest;
    const distToUL = (x-gridCornerUL[0])**2 + (y-gridCornerUL[1])**2
    if(distToUL < min) {
      min=distToUL
      closest=gridCornerUL
    }
    const distToUR = (x-gridCornerUR[0])**2 + (y-gridCornerUR[1])**2
    if(distToUR < min) {
      min=distToUR
      closest=gridCornerUR
    }
    const distToLL = (x-gridCornerLL[0])**2 + (y-gridCornerLL[1])**2
    if(distToLL < min) {
      min=distToLL
      closest=gridCornerLL
    }
    const distToLR = (x-gridCornerLR[0])**2 + (y-gridCornerLR[1])**2
    if(distToLR < min) {
      min=distToLR
      closest=gridCornerLR
    }
    
    return min <= snapDist**2 ? closest : [x,y]
    //return corner point if distance from x,y to corner < snapDist
    //else return x,y
  }

  const testFunc = (e) => {
    
    // e.stopPropagation();
    // e.preventDefault();
    console.log(e)
  }

  const handleShapeSelect = () => {
    
  }
  
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TabMenu onDrawClick={handleDrawBtnClick} onForegroundClick={handleObjectBtnClick} myPlants={props.userData.myPlants} options={options} onOptionChange={handleOptionsChange}/>
          {/* <img src="/images/imageonline-co-split-image (26).png" alt="" onDragStart={testFunc} onDragMove={testFunc} onDragEnd={testFunc} onDrop={testFunc} onDropCapture={testFunc}/> */}
        </Paper>
      </Grid>
      <Grid item xs>
        <Stage className='garden-planner' ref={stageRef} height={800} width={800} onDragOver={testFunc} onClick={handleStageClick} onMouseMove={handleMouseMove} style={{ display: 'inline-block', background: '#DDDDDD' }}>
          {/* {options.displayGrid && <PlanGrid height={800} width={800} />} */}
          <Layer>
            {polygons.map((item, i) => <Polygon {...item}
              key={i}
              isSelected={item.id===selectedId}
              // selected={i === selected}
              onDragMove={handleCircleDrag}
              onSelect={()=>{
                selectShape(item.id)
              }}
              // onClick={e => handleClick(e, i)}
              num={i}
              radius={RADIUS} />)}
            {temp.points && <Line closed points={temp.points} stroke='black' strokeWidth={2} />}
            
          </Layer>
          <Layer>
            {images.map((img, i) => {
              return (
                <PlanImage
                  key={i}
                  shapeProps={img}
                  isSelected={img.id === selectedId}
                  onSelect={() => {
                    selectShape(img.id);
                  }}
                  onChange={(newAttrs) => {
                    const imgs = images.slice();
                    imgs[i] = newAttrs;
                    setImages(imgs);
                  }}
                />
              );
            })}
          </Layer>
          {options.displayGrid && <PlanGrid height={800} width={800} />}
          <Layer>
            {drawing && <Circle x={mousePos.mouseX} y={mousePos.mouseY} radius={5} fill='black'/>}
            {temp.points && temp.points.length>2 && temp.points[0]===temp.points[temp.points.length-2] && temp.points[1]===temp.points[temp.points.length-1] && <Circle
              x={temp.points[0]}
              y={temp.points[1]}
              radius={8}
              fill="green"
              stroke="black"
              strokeWidth={1}
              rotateEnabled={false}
            />}
          </Layer>
        </Stage>
      </Grid>
    </Grid>
  )
  // onMouseDown={handleMouseDown}onMouseMove={handleMouseMove}   style={{ background: '#BBBBBB' }}
}
