import React, { useState, useEffect } from 'react'
import Polygon from '../Polygon/Polygon'
import PlanImage from '../PlanImage/PlanImage'
import Tooltip from '../Tooltip/Tooltip'
import Konva from "konva";
import { Stage, Layer, Line, Circle, Rect } from "react-konva";
import PlanGrid from '../PlanGrid/PlanGrid';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TabMenu from '../TabMenu/TabMenu'
import API from '../../../utils/API';
import util from './util'
import Toolbar from '../Toolbar/Toolbar';

const STAGE_HEIGHT = 800;
const STAGE_WIDTH = 800;
const RADIUS = 8;

export default function Scene(props) {
  

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
    mouseX: -1,
    mouseY: -1
  });
  const [options, setOptions] = useState({ 
    displayGrid: true,
    gridSize: 50,
    snapDist: 20,
    gridSnap: true,
    vertexSnap: true,
    objectSnap: true,
    lockBackground: false,
    lockForeground: false,
    hideBackground: false,
    hideForeground: false,
    alwaysShowTooltips: false
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
    if(props.userData.myGarden) loadFromUser()
    else loadFromLocalStorage()
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //test drawing for effect
    if (activeDraw) {
      return
    }
    else {
      if (temp.points && temp.points.length > 4) {
        const toAdd = { ...temp }
        toAdd.id = Date.now() + Math.random();
        toAdd.x=0;
        toAdd.y=0;
        const polys = getPolygons()
        polys.push(toAdd);
        setPolygons(polys);
        // setTemp({})
      }
      setTemp({points:[]})
    }
    //test temp for completeness
    //if complete then add
    //if not complete then discard
    // eslint-disable-next-line
  }, [activeDraw])

  useEffect(() => {
    if(props.userData._id) saveToUser()
    else saveToLocalStorage()
    // eslint-disable-next-line
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
    }).then(res=>{
      console.log("saved")});
  }

  const loadFromUser = () => {
    let dataStr = props.userData.myGarden;
    if(dataStr !== null) processLoadedData(dataStr)
  }

  const publishGardenImg = () => {
    API.updateUserGardenImg(props.userData._id, {
      myGardenImg:stageRef.current.toDataURL({mimetype:'image/jpeg',quality:0.5})
    })
    .then(res => console.log(""))
    .catch(err => {throw err})
  }

  const processLoadedData = (str) => {
    const data = JSON.parse(str);
    setPolygons(data.polygons);
    setImages(data.images);
    setOptions(data.options);
  }

  const cancelDraw = () => {
    setTemp({points:[]})
    setActiveDraw(null)
  }

  const completeDraw = (e) => {
    const tempPoints = [...temp.points]
    if(e.type==="click") {
      // tempPoints.pop()
      // tempPoints.pop()
    }
    setTemp({...temp, points:tempPoints})
    setActiveDraw(null)
  }

  const dragPolygon = () => {
    selectShape(null)
  }

  const endDragPolygon = (e, index) => {
    const polyPoints = [...polygons[index].points]
    const offsetX = e.target.attrs.x;
    const offsetY = e.target.attrs.y;
    for(let i = 0; i < polyPoints.length; i++) {
      if(i%2===0) polyPoints[i] += offsetX
      else polyPoints[i] += offsetY
    }
    const polys = getPolygons()
    polys[index].points = polyPoints;
    setPolygons(polys);
    e.target.absolutePosition({x:0,y:0})
  }

  const handleOptionsChange = (e) => {
    if(/ground/.test(e.target.name)) selectShape(null)
    setOptions({ ...options, [e.target.name]: e.target.checked });
  }
  
  const handleSnapDistSliderChange = (e,v) => {
    if(v !== options.snapDist) setOptions({ ...options, snapDist: v });
  }
  
  const handleGridSizeSliderChange = (e,v) => {
    if(v !== options.gridSize) setOptions({ ...options, gridSize: v });
  }

  const handleStageClick = (e) => {
    if (!activeDraw) {
      if (e.target instanceof Konva.Line || e.target instanceof Konva.Image) return
      selectShape(null)
    }
    else {

      const x = e.evt.layerX ? e.evt.layerX : e.evt.touches[0].pageX-stageRef.current.content.offsetLeft
      const y = e.evt.layerY ? e.evt.layerY : e.evt.touches[0].pageY-stageRef.current.content.offsetTop
      const coords = [...temp.points]
      let distToFirst = 1000
      if (temp.points && temp.points.length > 2) {
        distToFirst = (x - coords[0]) ** 2 + (y - coords[1]) ** 2
      }
      if (distToFirst <= 25**2) {
        setTemp({ ...temp, points: coords });
        setActiveDraw(null)
      }
      else {
        let pos = options.vertexSnap ? util.checkVertexSnap(x, y, options.snapDist, polygons) : [x,y];
        if(pos[0] === x && pos[1] === y && options.gridSnap) pos = util.checkGridSnap(x, y, options.snapDist, options.gridSize, options.gridSize);
        coords.push(pos[0])
        coords.push(pos[1])
        setTemp({ ...temp, points: coords });
      }
    }
  }

  const handleKeyPress = (e) => {
    if (drawRef.current) {
      e.preventDefault();
      if (e.keyCode === 27) {
        cancelDraw()
      }
    }
    else {
      if (e.keyCode === 46 && selectRef.current) {
        deleteShape(selectRef.current)
      }
    }
  }

  const deleteShape = id => {
    let polys = getPolygons()
    polys = polys.filter(item => item.id !== id)
    selectShape(null)
    setPolygons(polys)
    setImages(imagesRef.current.filter(item => item.id !== id))
  }

  const clearAll = () => {
    setPolygons([])
    setImages([])
  }

  const bringToFront = id => {
    //figure out which collection
    let collection, func;
    let item = polygons.find(poly=>id===poly.id);
    if(item) {
      collection=polygons.slice()
      func=setPolygons
    }
    else {
      collection=images.slice()
      func=setImages
      item = images.find(img=>img.id===id)
    }
    collection = collection.filter(element=>id!==element.id);
    collection.push(item)
    func(collection)
  }

  const sendToBack = id => {
    //figure out which collection
    let collection, func;
    let item = polygons.find(poly=>id===poly.id);
    if(item) {
      collection=polygons.slice()
      func=setPolygons
    }
    else {
      collection=images.slice()
      func=setImages
      item = images.find(img=>img.id===id)
    }
    collection = collection.filter(element=>id!==element.id);
    collection.unshift(item)
    func(collection)
  }

  const handleDrawBtnClick = (imageURL,i) => {
    selectShape(null);
    if (activeDraw === i) {
      setActiveDraw(null)
      setTemp({});
    }
    else {
      setActiveDraw(i);
      setTemp({ points: [], fillPatternImage: imageURL })
    }
  }

  const handleImageMouseover = (props) => {
    if(!props.lockForeground) stageRef.current.container().style.cursor='move'
    if(props.tooltip_text) setHoveredImage(props)
  }

  const handleImageMouseout = () => {
    stageRef.current.container().style.cursor='default'
    setHoveredImage(null)
  }

  const handleCircleDrag = (e, circle) => {
    const mouseX = e.evt.layerX ? e.evt.layerX : e.evt.touches[0].pageX-stageRef.current.content.offsetLeft
    const mouseY = e.evt.layerY ? e.evt.layerY : e.evt.touches[0].pageY-stageRef.current.content.offsetTop
    const newPoints = [...temp.points];
    //check vertex snap
    //if no vertex snap then check grid snap
    let pos = options.vertexSnap ? util.checkVertexSnap(mouseX, mouseY, options.snapDist, polygons, selectedId) : [mouseX,mouseY];
    if(pos[0] === mouseX && pos[1] === mouseY && options.gridSnap) pos = util.checkGridSnap(mouseX, mouseY, options.snapDist, options.gridSize, options.gridSize);
    newPoints[2 * circle] = pos[0];
    newPoints[2 * circle + 1] = pos[1];
    const absPos = e.target.absolutePosition()
    absPos.x=pos[0];
    absPos.y=pos[1];
    e.target.absolutePosition(absPos)
    setTemp({...temp, points:newPoints})
  }

  const handleVertexDragStart = (index) => {
    setTemp({points:[...polygons[index].points]})
  }

  const handleVertexDragEnd = (index) => {
    const polys = getPolygons()
    polys[index].points = [...temp.points];
    setPolygons(polys);
    setTemp({points:[]})
  }

  const handleMouseMove = (e) => {
    const coords = [e.evt.layerX, e.evt.layerY]
    if (!activeDraw) {
      return;
    }
    stageRef.current.container().style.cursor='crosshair'
    const tempCopy = [...temp.points]
    let distToFirst = 1000;
    let xFirst, yFirst
    if (tempCopy.length >= 6) {
      xFirst = temp.points[0]
      yFirst = temp.points[1]
      distToFirst = (xFirst - coords[0]) ** 2 + (yFirst - coords[1]) ** 2
    }

    if (distToFirst <= 400) {
      setMousePos({
        mouseX: xFirst,
        mouseY: yFirst
      })
    }
    else {
      
      //check vertex snap
      let pos = options.vertexSnap ? util.checkVertexSnap(coords[0], coords[1], options.snapDist, polygons) : [coords[0],coords[1]];
      
      //if no vertex snap check grid snap
      if(coords[0] === pos[0] && coords[1] === pos[1] && options.gridSnap) pos = util.checkGridSnap(coords[0], coords[1], options.snapDist, options.gridSize, options.gridSize)
      setMousePos({
        mouseX: pos[0],
        mouseY: pos[1]
      })
    }
    setTemp({ ...temp, points: tempCopy });
  }

  const handleObjectBtnClick = data => {
    const width = data.w ? data.w : 50;
    const height = data.h ? data.h : 50;
    const newObj = {
      x: 100,
      y: 100,
      width: width,
      height: height,
      src: data.src,
      tooltip_text: data.text,
      id: Date.now() + Math.random(),
    }
    const imgs = images.slice();
    imgs.push(newObj)
    setImages(imgs)
  }

  const handleObjectDrag = e => {
    if(!options.objectSnap) return
    const shapes = stageRef.current.find('Image')
    const thisShape = shapes.filter(image => image.attrs.id === e.target.attrs.id)[0];

    const lineGuideStops = util.getLineGuideStops(shapes, thisShape, STAGE_WIDTH, STAGE_HEIGHT);
    const itemBounds = util.getObjectSnappingEdges(thisShape);
    const guides = util.getGuides(lineGuideStops, itemBounds, options.snapDist);
    if(guides.length === 0) return;
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
            default:
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
            default:
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
            default:
          }
          break;
        }
        default:
      }
      
    });
    e.target.absolutePosition(absPos);
    setGuideLines(guides)
  }

  const handleObjectDragEnd = () => {
    setGuideLines([])
  }

  return (
    <Grid container spacing={1} justify='space-around'>
      <Hidden mdDown>
      <Grid item lg={4} xs={12}>
        <Paper style={{marginTop:35,height:800}}>
          <TabMenu 
            active={activeDraw}
            onDrawClick={handleDrawBtnClick} 
            onForegroundClick={handleObjectBtnClick} 
            myPlants={props.userData.myPlants} 
            options={options} 
            onOptionChange={handleOptionsChange}
            onSnapSliderChange={handleSnapDistSliderChange}
            onGridSliderChange={handleGridSizeSliderChange}
            clearAll={clearAll}
            />
      </Paper>
      </Grid>
      </Hidden>
      {/* <Paper> */}
      <Grid item lg={8} xs={12}>
        <Grid container direction='column'>
          <Grid item>

          <Toolbar 
            selectedId={selectedId} 
            drawing={activeDraw}
            onPublish={publishGardenImg} 
            onDelete={deleteShape}
            toFront={bringToFront}
            toBack={sendToBack}
            cancelDraw={cancelDraw}
            completeDraw={completeDraw}
            loggedIn={props.userData._id}
            />
          </Grid>
          <Grid item>
          <Stage  
            ref={stageRef} 
            height={STAGE_HEIGHT} 
            width={STAGE_WIDTH} 
            onTouchStart={handleStageClick} 
            onClick={handleStageClick} 
            onMouseMove={handleMouseMove} 
            style={{ display: 'inline-block', background: '#DDDDDD' }}>
            <Layer listening={!options.lockBackground} visible={!options.hideBackground}>
              {polygons.map((item, i) => <Polygon {...item}
                key={i}
                isSelected={item.id === selectedId}
                onDragMove={handleCircleDrag}
                vertexDragStart={handleVertexDragStart}
                vertexDragEnd={handleVertexDragEnd}
                onSelect={() => {
                  if(activeDraw) return
                  selectShape(item.id)
                }}
                // onClick={e => handleClick(e, i)}
                num={i}
                radius={RADIUS} 
                onDragStart={dragPolygon}
                onDragEnd={endDragPolygon}
                onMouseEnter={()=>stageRef.current.container().style.cursor='move'}
                onMouseLeave={()=>stageRef.current.container().style.cursor='default'}
                />)}
            </Layer>
            <Layer listening={!options.lockForeground} visible={!options.hideForeground}>
              {images.map((img, i) => {
                return (
                  <PlanImage
                    key={i}
                    shapeProps={img}
                    isSelected={img.id === selectedId}
                    onSelect={() => {
                      if(activeDraw) return
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
              {temp.points && <Line closed points={temp.points} stroke='black' strokeWidth={2} fill='green' opacity={0.4}/>}
              {mousePos.mouseX>=0 && mousePos.mouseY>=0 && activeDraw && temp.points.length>0 && <Line points={[temp.points[0],temp.points[1],mousePos.mouseX,mousePos.mouseY]} stroke='black' strokeWidth={2} />}
              {mousePos.mouseX>=0 && mousePos.mouseY>=0 &&  activeDraw && temp.points.length>0 && <Line points={[mousePos.mouseX,mousePos.mouseY,temp.points[temp.points.length-2],temp.points[temp.points.length-1]]} stroke='black' strokeWidth={2} />}
              {activeDraw && <Circle x={mousePos.mouseX} y={mousePos.mouseY} radius={5} fill='black' />}
              {temp.points && temp.points.length > 2 && temp.points[0] === mousePos.mouseX && temp.points[1] === mousePos.mouseY && <Circle
                x={temp.points[0]}
                y={temp.points[1]}
                radius={8}
                fill="green"
                stroke="black"
                strokeWidth={1}
                rotateEnabled={false}
              />}
              {options.lockForeground && images.map((img,i) => (
                <Rect
                  key={i}  
                  x={img.x}
                  y={img.y}
                  width={img.width}
                  height={img.height}
                  tooltip_text={img.tooltip_text}
                  onMouseEnter={() => {
                    handleImageMouseover({
                      x:img.x,
                      y:img.y,
                      width:img.width,
                      height:img.height,
                      tooltip_text:img.tooltip_text
                    })
                  }}
                  onMouseLeave={handleImageMouseout}
                />
              ))}
              {hoveredImage && !options.alwaysShowTooltips && (
                <Tooltip {...hoveredImage}/>
              )}
                {selectedId && (
                  <React.Fragment>
                  {util.isPolygon(polygons, selectedId) && <Line
                    points={util.getOutline(polygons,selectedId)}
                    stroke="red"
                    strokeWidth={1}
                    />  
                  }
                  {util.getPoints(polygons,selectedId).map((coords,i) => <Circle 
                  key={i}
                  x={coords[0]} 
                  y={coords[1]} 
                  radius={RADIUS} 
                  fill='white'
                  stroke='black'
                  strokeWidth={1}
                  draggable
                  onDragStart={e => {
                    const idx = polygons.findIndex(poly=>poly.id===selectedId)
                    handleVertexDragStart(idx)
                  }}
                  onDragMove={e => {
                    handleCircleDrag(e, i);
                  }}
                  onDragEnd={e => {
                    const idx = polygons.findIndex(poly=>poly.id===selectedId)
                    handleVertexDragEnd(idx)
                  }}
                  onMouseEnter={()=>stageRef.current.container().style.cursor = 'grab'}
                  onMouseLeave={()=>stageRef.current.container().style.cursor = 'default'}
                  onMouseDown={()=>stageRef.current.container().style.cursor = 'grabbing'}
                  onMouseUp={()=>stageRef.current.container().style.cursor = 'grab'}
                  />
                  )}
                  </React.Fragment>
                )}
              {options.alwaysShowTooltips && (
                images.map(img => img.tooltip_text!=='' && <Tooltip key={img.id} {...img}/>)
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
          <Hidden lgUp>
      <Grid item>
        <Paper style={{marginTop:35}}>
          <TabMenu 
            active={activeDraw}
            onDrawClick={handleDrawBtnClick} 
            onForegroundClick={handleObjectBtnClick} 
            myPlants={props.userData.myPlants} 
            options={options} 
            onOptionChange={handleOptionsChange}
            onSnapSliderChange={handleSnapDistSliderChange}
            onGridSliderChange={handleGridSizeSliderChange}
            clearAll={clearAll}
            />
      </Paper>
      </Grid>
      </Hidden>
        </Grid>
        </Grid>
      {/* </Paper> */}
  </Grid>
  )
}
