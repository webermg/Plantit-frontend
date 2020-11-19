import React, { useState, useEffect } from 'react'
import Polygon from '../Polygon/Polygon'
import PlanImage from '../PlanImage/PlanImage'
import Tooltip from '../Tooltip/Tooltip'
import Konva from "konva";
import { Stage, Layer, Line, Circle, Transformer, Rect } from "react-konva";
import _ from "lodash";
import PlanGrid from '../PlanGrid/PlanGrid';
import sceneStyle from './sceneStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TabMenu from '../TabMenu/TabMenu'
import useDidMountEffect from '../Hooks/useDidMountEffect';
import API from '../../../utils/API';
import util from './util'

const STAGE_HEIGHT = 800;
const STAGE_WIDTH = 800;
const RADIUS = 6;

export default function Scene(props) {
  const classes = sceneStyle;

  const [polygons, _setPolygons] = useState([])

  const [images, _setImages] = useState([])
  const [hoveredImage, setHoveredImage] = useState(null)

  const [selectedId, _selectShape] = React.useState(null);

  const [drawing, _setDrawing] = useState(false)
  const [temp, setTemp] = useState({
    points: []
  })

  const [mousePos, setMousePos] = useState({
    mouseX: 0,
    mouseY: 0
  });
  const [options, setOptions] = useState({ 
    displayGrid: true,
    gridSize: 50,
    snapDist: 20,
    gridSnap: true,
    lockBackground: false,
    lockForeground: false,
  })
  
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

  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    // setTimeout(loadFromLocalStorage,5000);
    if(props.userData.myGarden) loadFromUser()
    else loadFromLocalStorage()
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
        const toAdd = { ...temp }
        toAdd.id = Date.now() + Math.random();
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
    if(props.userData._id) saveToUser()
    else saveToLocalStorage()
  }, [polygons, images, options])

  const getPolygons = () => {
    let res = [];
    for (let i = 0; i < polysRef.current.length; i++) {
      res.push({ ...polysRef.current[i] });
    }
    return res;
  }

  const saveToLocalStorage = () => {
    const data = {
      polygons: polygons,
      images: images,
      options: options
    }
    window.localStorage.setItem("gardenData", JSON.stringify(data));
  }

  const loadFromLocalStorage = () => {
    let dataStr = window.localStorage.getItem("gardenData")
    if (dataStr !== null) {
      processLoadedData(dataStr)
    }
  }

  const saveToUser = () => {
    const data = {
      polygons: polygons,
      images: images,
      options: options
    }
    API.updateUserGarden(props.userData._id, {
      myGarden:JSON.stringify(data),
      myGardenImg:stageRef.current.toDataURL({mimetype:'image/jpeg',quality:0.1})
    }).then(res=>console.log("saved"));
  }

  const loadFromUser = () => {
    let dataStr = props.userData.myGarden;
    if(dataStr !== null) processLoadedData(dataStr)
  }

  const processLoadedData = (str) => {
    const data = JSON.parse(str);
    setPolygons(data.polygons);
    setImages(data.images);
    setOptions(data.options);
  }

  const handleOptionsChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  }
  
  const handleOptionsSliderChange = (e,v) => {
    if(v !== options[e.target.ariaLabel]) setOptions({ ...options, [e.target.ariaLabel]: v });
  }

  const handleStageClick = (e) => {
    console.log(e.target)
    if (!drawing) {
      // console.log(e)
      if (e.target instanceof Konva.Line || e.target instanceof Konva.Image) return
      selectShape(null)
    }
    else {

      const x = e.evt.layerX
      const y = e.evt.layerY
      const coords = [...temp.points]
      let distToFirst = 1000
      if (temp.points && temp.points.length > 2) {
        console.log(x + " " + y + " " + coords[0] + " " + coords[1])
        distToFirst = (x - coords[0]) ** 2 + (y - coords[1]) ** 2
      }
      console.log(options.snapDist)
      if (distToFirst <= options.snapDist**2) {
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
      if (e.keyCode === 46 && selectRef.current) {
        console.log(selectRef.current)
        deleteShape(selectRef.current)
      }
    }
  }

  const deleteShape = id => {
    let polys = getPolygons()
    polys = polys.filter(item => item.id !== id)
    setPolygons(polys)
    setImages(imagesRef.current.filter(item => item.id !== id))
    selectShape(null)
  }

  const handleDrawBtnClick = (imageURL) => {
    selectShape(null);
    if (drawing) {
      console.log("drawing off")
      setDrawing(false)
      setTemp({});
    }
    else {
      console.log("drawing on")
      setDrawing(true);
      setTemp({ points: [], fillPatternImage: imageURL })
    }
  }

  const handleImageMouseover = (props) => {
    if(props.tooltip_text) setHoveredImage(props)
  }

  const handleImageMouseout = () => {
    setHoveredImage(null)
  }

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
    // const stageX = stageRef.current.content.offsetLeft
    // const stageY = stageRef.current.content.offsetTop
    // const stageW = 800
    // const stageH = 800
    //TODO: make this more efficient
    const [newX, newY] = util.checkGridSnap(mouseX, mouseY, options.snapDist, options.gridSize, options.gridSize);
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

    let distToFirst = 1000;
    let xFirst, yFirst
    if (tempCopy.length >= 6) {
      xFirst = temp.points[0]
      yFirst = temp.points[1]
      distToFirst = (xFirst - coords[0]) ** 2 + (yFirst - coords[1]) ** 2
      // console.log(distToFirst)
    }

    if (distToFirst <= 400) {
      tempCopy.push(xFirst)
      tempCopy.push(yFirst)
      setMousePos({
        mouseX: xFirst,
        mouseY: yFirst
      })
    }
    else {
      const pos = util.checkGridSnap(coords[0], coords[1], options.snapDist, options.gridSize, options.gridSize)
      // console.log(pos)
      setMousePos({
        mouseX: pos[0],
        mouseY: pos[1]
      })
      tempCopy.push(pos[0])
      tempCopy.push(pos[1])
    }
    setTemp({ ...temp, points: tempCopy });
  }

  const handleObjectBtnClick = data => {
    const newObj = {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      src: data.src,
      tooltip_text: data.text,
      id: Date.now() + Math.random(),
    }
    const imgs = images.slice();
    imgs.push(newObj)
    setImages(imgs)
  }

  const testFunc = (e) => {

    // e.stopPropagation();
    // e.preventDefault();
    console.log(e)
  }

  

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TabMenu 
            onDrawClick={handleDrawBtnClick} 
            onForegroundClick={handleObjectBtnClick} 
            myPlants={props.userData.myPlants} 
            options={options} 
            onOptionChange={handleOptionsChange}
            onSliderChange={handleOptionsSliderChange}/>
          {/* <img src="/images/imageonline-co-split-image (26).png" alt="" onDragStart={testFunc} onDragMove={testFunc} onDragEnd={testFunc} onDrop={testFunc} onDropCapture={testFunc}/> */}
        </Paper>
      </Grid>
      <Grid item xs>
        <Stage className='garden-planner' ref={stageRef} height={STAGE_HEIGHT} width={STAGE_WIDTH} onDragOver={testFunc} onClick={handleStageClick} onMouseMove={handleMouseMove} style={{ display: 'inline-block', background: '#DDDDDD' }}>
          <Layer listening={!options.lockBackground}>
            {polygons.map((item, i) => <Polygon {...item}
              key={i}
              isSelected={item.id === selectedId}
              onDragMove={handleCircleDrag}
              onSelect={() => {
                selectShape(item.id)
              }}
              // onClick={e => handleClick(e, i)}
              num={i}
              radius={RADIUS} />)}
            

          </Layer>
          <Layer listening={!options.lockForeground}>
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
                  onMouseEnter={handleImageMouseover}
                  onMouseLeave={handleImageMouseout}
                />
              );
            })}
          </Layer>
          {options.displayGrid && <PlanGrid gridSize={options.gridSize} height={STAGE_HEIGHT} width={STAGE_WIDTH} />}
          <Layer>
            {temp.points && <Line closed points={temp.points} stroke='black' strokeWidth={2} />}
            {drawing && <Circle x={mousePos.mouseX} y={mousePos.mouseY} radius={5} fill='black' />}
            {temp.points && temp.points.length > 2 && temp.points[0] === temp.points[temp.points.length - 2] && temp.points[1] === temp.points[temp.points.length - 1] && <Circle
              x={temp.points[0]}
              y={temp.points[1]}
              radius={8}
              fill="green"
              stroke="black"
              strokeWidth={1}
              rotateEnabled={false}
            />}
            {hoveredImage && (
              <Tooltip {...hoveredImage}/>
            )}
          </Layer>
        </Stage>
      </Grid>
    </Grid>
  )
}
