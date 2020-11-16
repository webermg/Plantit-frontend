import React, { useState, useEffect } from 'react'
import Polygon from '../Polygon/Polygon'
import PlanImage from '../PlanImage/PlanImage'
import Konva from "konva";
import { Stage, Layer, Line, Circle, Transformer } from "react-konva";
import _ from "lodash";
import DrawPanel from '../DrawPanel/DrawPanel';
import PlanGrid from '../PlanGrid/PlanGrid';
import sceneStyle from './sceneStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import pics from './util'
import ForeGroundPanel from '../ForegroundPanel/ForegroundPanel';
import OptionsPanel from '../OptionsPanel/OptionsPanel.js'
import useDidMountEffect from '../Hooks/useDidMountEffect';

export default function Scene(props) {
  const classes = sceneStyle;

  const [polygons, _setPolygons] = useState([])
  
  const [images, _setImages] = useState([])
  const [selectedId, _selectShape] = React.useState(null);

  const [drawing, _setDrawing] = useState("")
  const [temp, setTemp] = useState({
    points: []
  })

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

  const RADIUS = 8;
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    setTimeout(loadFromLocalStorage,5000);
    
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
        setDrawing("")
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
        setDrawing("")
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

  const handleDrawBtnClick = (image) => {
    selectShape(null);
    if (drawing) {
      console.log("drawing off")
      setDrawing("")
      // const polys = getPolygons()
      // polys.push(temp);
      // setPolygons(polys);
      setTemp({});
    }
    else {
      console.log("drawing on")
      setDrawing(image);
      setTemp({ points: [], fillPatternImage: image })
    }

  }

  // const handleBeginCircleDrag = (circleX, circleY) => {
  //   //reorder points to put circleX and circleY at end
  //   const polys = getPolygons()
  //   const poly = {...polys[selected]};
  //   console.log(poly.points)
  //   const vertex = poly.points.filter(p => p===circleX || p===circleY);
  //   poly.points = poly.points.filter(p=>p!==circleX && p!==circleY);
  //   poly.points.push(vertex[0])
  //   poly.points.push(vertex[1])
  //   polys[selected] = poly;
  //   console.log(poly.points)
  //   setPolygons(polys);
  // }

  const handleCircleDrag = (e, index, circle) => {
    // console.log(e)
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
    let newX, newY
    // if (e.evt.clientX < stageX) newX = 0
    // else if (e.evt.clientX > stageX + stageW) newX = stageW
    // else 
    newX = e.evt.layerX;
    // if (e.evt.clientY < stageY) newY = 0
    // else if (e.evt.clientY > stageY + stageH) newY = stageH
    // else 
    newY = e.evt.layerY;
    newPoints[2 * circle] = newX;
    newPoints[2 * circle + 1] = newY;
    // console.log(e.evt.clientX + " " + e.evt.clientY)
    // console.log(stageRef.current.content.offsetLeft + " " + stageRef.current.content.offsetTop)
    // console.log(e.currentTarget.content.offsetX + " " + e.currentTarget.content.offsetY)

    // for (let i = 0; i < polygons[selected].points.length; i++) {
    //   if (polygons[selected].points[i] >= circleX-RADIUS && polygons[selected].points[i] <= circleX+RADIUS && polygons[selected].points[i + 1] >= circleY-RADIUS && polygons[selected].points[i + 1] <= circleY+RADIUS) {

    //     newPoints[i] = e.target.x();
    //     newPoints[i + 1] = e.target.y();
    //     break;
    //   }
    // }
    // console.log(newPoints)
    const temp = getPolygons()
    temp[index].points = newPoints;
    setPolygons(temp);
  }

  const handleMouseMove = (e) => {
    if (!drawing || temp.points.length === 0) return;
    // console.log("hi")
    const tempCopy = [...temp.points]
    // console.log(temp.points)
    if (tempCopy.length > 2) {
      tempCopy.pop();
      tempCopy.pop();
    }
    // console.log(tempCopy.points)
    const coords = [e.evt.layerX, e.evt.layerY]
    const xFirst = temp.points[0]
    const yFirst = temp.points[1]
    const distToFirst = (xFirst - coords[0]) ** 2 + (yFirst - coords[1]) ** 2
    if(distToFirst < 150) {
      tempCopy.push(xFirst)
      tempCopy.push(yFirst)
    }
    else {
      tempCopy.push(coords[0])
      tempCopy.push(coords[1])
    }
    setTemp({ ...temp, points: tempCopy });

    // const first = [temp.points[0],temp.points[1]]
    // const dist = (coords[0]-first[0])**2 + (coords[1]-first[1])**2
    // if(dist < 100) console.log("true")
    // for(let i = 0; i < polygons.length; i++) {
    //   for(let j = 0; j < polygons[i].points.length; j+=2) {
    //     const x = polygons[i].points[j];
    //     const y = polygons[i].points[j+1];
    //     const dist = (coords[0]-x)**2 + (coords[1]-y)**2
    //     if(dist < 100) console.log('true');
    //   }
    // }
  }

  const handleObjectBtnClick = type => {
    const src = pics[type][Math.floor(Math.random()*pics[type].length)]
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

  const testFunc = (e) => {
    
    // e.stopPropagation();
    // e.preventDefault();
    console.log(e)
  }

  
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper className={classes.paper}>

          <DrawPanel active={drawing} onClick={handleDrawBtnClick} />
          <ForeGroundPanel onClick={handleObjectBtnClick}/>
          <OptionsPanel {...options} onChange={handleOptionsChange}/>
          {/* <img src="/images/imageonline-co-split-image (26).png" alt="" onDragStart={testFunc} onDragMove={testFunc} onDragEnd={testFunc} onDrop={testFunc} onDropCapture={testFunc}/> */}
        </Paper>
      </Grid>
      <Grid item xs>
        <Stage className='garden-planner' ref={stageRef} height={800} width={800} onDragOver={testFunc} onClick={handleStageClick} onMouseMove={handleMouseMove} style={{ display: 'inline-block', background: '#DDDDDD' }}>
          {options.displayGrid && <PlanGrid height={800} width={800} />}
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
            {temp.points && <Line closed fillPatternImage={temp.fillPatternImage} points={temp.points} stroke='black' strokeWidth={2} />}
            {temp.points && temp.points.length>2 && temp.points[0]===temp.points[temp.points.length-2] && temp.points[1]===temp.points[temp.points.length-1] && <Circle
              x={temp.points[0]}
              y={temp.points[1]}
              radius={8}
              fill="green"
              stroke="black"
              strokeWidth={2}
              rotateEnabled={false}
            />}
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
        </Stage>
      </Grid>
    </Grid>
  )
  // onMouseDown={handleMouseDown}onMouseMove={handleMouseMove}   style={{ background: '#BBBBBB' }}
}
