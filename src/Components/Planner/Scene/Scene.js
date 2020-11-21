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
  const [guideLines, setGuideLines] = React.useState([]);

  const [activeDraw, _setActiveDraw] = useState(null)
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
  const drawRef = React.useRef(activeDraw);
  const setActiveDraw = data => {
    drawRef.current = data;
    _setActiveDraw(data);
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
    if (activeDraw) {
      console.log(activeDraw)
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
  }, [activeDraw])

  useEffect(() => {
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
    const id = selectedId
    // selectShape(null)
    API.updateUserGarden(props.userData._id, {
      myGarden:JSON.stringify(data),
      myGardenImg:stageRef.current.toDataURL({mimetype:'image/jpeg',quality:0.1})
    }).then(res=>{
      selectShape(id)
      console.log("saved")});
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
    console.log(e)
    if(v !== options[e.target.ariaLabel]) setOptions({ ...options, [e.target.ariaLabel]: v });
  }

  const handleStageClick = (e) => {
    console.log(e.target)
    if (!activeDraw) {
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
        setActiveDraw(null)
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
        setActiveDraw(null)
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

  const handleDrawBtnClick = (imageURL,i) => {
    // console.log(activeDraw)
    selectShape(null);
    if (activeDraw) {
      console.log("drawing off")
      setActiveDraw(null)
      setTemp({});
    }
    else {
      console.log("drawing on")
      setActiveDraw(i);
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
    console.log(e.target.absolutePosition())
    const mouseX = e.evt.layerX
    const mouseY = e.evt.layerY
    const newPoints = [...polygons[index].points];
    
    //check vertex snap
    //if no vertex snap then check grid snap
    let pos = util.checkVertexSnap(mouseX, mouseY, options.snapDist, polygons, selectedId);
    if(pos[0] === mouseX && pos[1] === mouseY) pos = util.checkGridSnap(mouseX, mouseY, options.snapDist, options.gridSize, options.gridSize);
    
    newPoints[2 * circle] = pos[0];
    newPoints[2 * circle + 1] = pos[1];

    const absPos = e.target.absolutePosition()
    absPos.x=pos[0];
    absPos.y=pos[1];
    e.target.absolutePosition(absPos)
    // console.log(newPoints)
    const temp = getPolygons()
    temp[index].points = newPoints;
    setPolygons(temp);
  }

  const handleVertexDragStart = (e, index, circle) => {
    
  }

  const handleVertexDragEnd = (e, index, circle) => {
    
  }

  const handleMouseMove = (e) => {
    const coords = [e.evt.layerX, e.evt.layerY]
    if (!activeDraw) {

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
      let pos;
      //check vertex snap
      pos = util.checkVertexSnap(coords[0],coords[1],options.snapDist, polygons)
      //if no vertex snap check grid snap
      if(coords[0] === pos[0] && coords[1] === pos[1]) pos = util.checkGridSnap(coords[0], coords[1], options.snapDist, options.gridSize, options.gridSize)
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

  const handleObjectDrag = e => {
    const shapes = stageRef.current.find('Image')
    const thisShape = shapes.filter(image => image.attrs.id === e.target.attrs.id)[0];

    const lineGuideStops = util.getLineGuideStops(shapes, thisShape, STAGE_WIDTH, STAGE_HEIGHT);
    const itemBounds = util.getObjectSnappingEdges(thisShape);
    const guides = util.getGuides(lineGuideStops, itemBounds, options.snapDist);
    if(guides.length === 0) return;
    // console.log(thisObj.x + " " + thisObj.y)
    // console.log(lineGuideStops)
    // console.log(itemBounds)
    console.log(guides)
    let absPos = e.target.absolutePosition();
    guides.forEach((lg) => {
      switch (lg.snap) {
        case 'start': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
          }
          break;
        }
        case 'center': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
          }
          break;
        }
        case 'end': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
          }
          break;
        }
      }
    });
    e.target.absolutePosition(absPos);
    setGuideLines(guides)
  }

  const handleObjectDragEnd = () => {
    setGuideLines([])
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>
          <TabMenu 
            active={activeDraw}
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
        <Stage className='garden-planner' ref={stageRef} height={STAGE_HEIGHT} width={STAGE_WIDTH} onClick={handleStageClick} onMouseMove={handleMouseMove} style={{ display: 'inline-block', background: '#DDDDDD' }}>
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
                  onDragMove={handleObjectDrag}
                  onDragEnd={handleObjectDragEnd}
                />
              );
            })}
          </Layer>
            {options.displayGrid && <PlanGrid gridSize={options.gridSize} height={STAGE_HEIGHT} width={STAGE_WIDTH} />}
          <Layer>
            {temp.points && <Line closed points={temp.points} stroke='black' strokeWidth={2} />}
            {activeDraw && <Circle x={mousePos.mouseX} y={mousePos.mouseY} radius={5} fill='black' />}
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
            {guideLines.map((line,i) => {
              let points = [];
              if(line.orientation==='H') {
                points = [0,line.lineGuide,STAGE_WIDTH,line.lineGuide]
              }
              if(line.orientation==='V') {
                points = [line.lineGuide,0,line.lineGuide,STAGE_HEIGHT]
              }
              return (<Line key={i} points={points} stroke='rgb(0,161,255)' strokeWidth={1} dash={[4,6]}/>)
            })}
          </Layer>
        </Stage>
      </Grid>
    </Grid>
  )
}
