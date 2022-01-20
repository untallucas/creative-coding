let canvasSizeH = 1200
let canvasSizeV = 1200
let canvasPaddingH = 40
let canvasPaddingV = 40
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let dotsCount = 50
let gridSteps = Math.floor(Math.sqrt(dotsCount))
let cellsCounter = 0
let colsCounter = 0
let rowsCounter = 0
let lastRow = rowsCounter
let dotsCoords = []
let showGrid = false

for (let xPos = canvasPaddingH; xPos < artboardSizeH + canvasPaddingH; xPos += artboardSizeH / gridSteps) {
  for (let yPos = canvasPaddingV; yPos < artboardSizeV + canvasPaddingV; yPos += artboardSizeV / gridSteps) {
    if(rowsCounter != lastRow){
      colsCounter = 1
      lastRow = rowsCounter
    }

    let coords = []
    coords.push(
      integrerRandom(xPos,xPos+artboardSizeH/gridSteps),
      integrerRandom(yPos,yPos+artboardSizeV/gridSteps)
    )
    dotsCoords.push(coords)

    ++colsCounter
    ++cellsCounter
  }
  ++rowsCounter
}

let remainingDots = dotsCount - dotsCoords.length
for(let xtraDots = 0; xtraDots < remainingDots; xtraDots++){
  let coords = []
  coords.push(
    integrerRandom(canvasPaddingH, canvasPaddingH + artboardSizeH),
    integrerRandom(canvasPaddingV, canvasPaddingV + artboardSizeV)
  )
  dotsCoords.push(coords)
}

function setup() {
  pixelDensity(2.0)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(RGB, 255, 255, 255, 1)
  noLoop()
}

function draw() {
  let colorBack = color(241,237,228,1)
  let colorFront = color(50,50,47,0.07)

  background(colorBack)

  if(showGrid){
    stroke(0,0,0,0.2)
    strokeWeight(1)
    for (let i = artboardSizeH / gridSteps + canvasPaddingH; i < artboardSizeH + canvasPaddingH; i += artboardSizeH / gridSteps) {
      line(i,canvasPaddingV,i,artboardSizeV + canvasPaddingV)
    }
    for (let j = artboardSizeV / gridSteps + canvasPaddingV; j < artboardSizeV + canvasPaddingV; j += artboardSizeV / gridSteps) {
      line(canvasPaddingH,j,artboardSizeH + canvasPaddingH,j)
    }
    stroke(0,0,0,1)
    noFill()
    rect(canvasPaddingH,canvasPaddingV,artboardSizeH,artboardSizeV)
  }


  for(let drawDot = 0; drawDot < dotsCoords.length; drawDot++){
    // stroke('red')
    // strokeWeight(8)
    // point(dotsCoords[drawDot][0],dotsCoords[drawDot][1])

    for(let lines = 0; lines < dotsCoords.length; lines++){
      stroke(colorFront)
      strokeWeight(1)
      line(
        dotsCoords[drawDot][0],
        dotsCoords[drawDot][1],
        dotsCoords[lines][0],
        dotsCoords[lines][1]
      )
    }
  }
}


// INTEGRER RANDOM
function integrerRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min)
}
