import _ from 'lodash'

const calcDistance = (x1,y1,x2,y2) => {
  return (x1-x2)**2 + (y1-y2)**2
}

const util = {
  checkGridSnap: function(x, y, snapDist, gridHeight, gridWidth, stageWidth=800, stageHeight=800) {
    //determine grid box
    const gridCoordX = Math.floor(x / gridWidth);
    const gridCoordY = Math.floor(y / gridHeight);
    //check four corners
    const gridCornerUL = [gridCoordX * gridWidth, gridCoordY * gridHeight]
    const gridCornerUR = [(gridCoordX + 1) * gridWidth, gridCoordY * gridHeight]
    const gridCornerLL = [gridCoordX * gridWidth, (gridCoordY + 1) * gridHeight]
    const gridCornerLR = [(gridCoordX + 1) * gridWidth, (gridCoordY + 1) * gridHeight]
    if(gridCornerUR[0] > stageWidth) gridCornerUR[0]=stageWidth
    if(gridCornerLL[1] > stageHeight) gridCornerLL[1]=stageHeight
    if(gridCornerLR[0] > stageWidth) gridCornerLR[0]=stageWidth
    if(gridCornerLR[1] > stageHeight) gridCornerLR[1]=stageHeight
    // console.log(x + " " + y + " " + gridCornerUL + " " + gridCornerUR + " " + gridCornerLL + " " + gridCornerLR)
    let min = Number.MAX_SAFE_INTEGER;
    let closest;
    const distToUL = (x - gridCornerUL[0]) ** 2 + (y - gridCornerUL[1]) ** 2
    if (distToUL < min) {
      min = distToUL
      closest = gridCornerUL
    }
    const distToUR = (x - gridCornerUR[0]) ** 2 + (y - gridCornerUR[1]) ** 2
    if (distToUR < min) {
      min = distToUR
      closest = gridCornerUR
    }
    const distToLL = (x - gridCornerLL[0]) ** 2 + (y - gridCornerLL[1]) ** 2
    if (distToLL < min) {
      min = distToLL
      closest = gridCornerLL
    }
    const distToLR = (x - gridCornerLR[0]) ** 2 + (y - gridCornerLR[1]) ** 2
    if (distToLR < min) {
      min = distToLR
      closest = gridCornerLR
    }

    //return corner point if distance from x,y to corner < snapDist
    //else return x,y
    return min <= snapDist ** 2 ? closest : [x, y]
  },

  checkVertexSnap: function(x,y,snapDist,polys,skip=null) {
    let min = Number.MAX_SAFE_INTEGER
    let closest 
    polys.forEach(poly => {
      if(poly.id !== skip) {
        _.chunk(poly.points,2).forEach(point=>{
          const dist = calcDistance(x,y,point[0],point[1])
          if(calcDistance(x,y,point[0],point[1]) < min) {
            closest = point;
            min = dist;
          }
        })
      }
    })
    
    return min <= snapDist ** 2 ? closest : [x,y];
  },

  // where can we snap our objects?
  getLineGuideStops: function(shapes, skipShape, stageWidth, stageHeight) {
    // we can snap to stage borders and the center of the stage
    var vertical = [0, stageWidth];
    var horizontal = [0, stageHeight];

    // and we snap over edges and center of each object on the canvas
    shapes.forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      var box = guideItem.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push([box.x, box.x + box.width]);
      horizontal.push([box.y, box.y + box.height]);
    });
    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  },

  // what points of the object will trigger to snapping?
  getObjectSnappingEdges: function(shape) {
    var box = shape.getClientRect();
    var absPos = shape.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: 'end',
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: 'end',
        },
      ],
    };
  },

  // find all snapping possibilities
  getGuides: function(lineGuideStops, itemBounds, snapDist) {
    var resultV = [];
    var resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < snapDist) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < snapDist) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    var guides = [];

    // find closest snap
    var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      });
    }
    return guides;
  },

  getPoints: function(polygons, selectedId) {
    let poly = polygons.find(item => item.id===selectedId)
    return poly ? _.chunk(poly.points,2) : []
  }
}

export default util;