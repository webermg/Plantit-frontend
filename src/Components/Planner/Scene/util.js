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
  }
}

export default util;