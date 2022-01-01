let canvasSizeH = 8080
let canvasSizeV = 8080
let canvasPaddingH = 40
let canvasPaddingV = 40
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridMin = 5
let gridMax = 10

let gridSteps = 100

let showGrid = false
let showArtboard = false
let showDebug = false

let cellPadding = 10

function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  background(40)
  colorMode(RGB, 255, 255, 255, 1)  

  if(showArtboard){
    noStroke()
    fill(240,240,240)
    rect(
      canvasPaddingH,
      canvasPaddingV,
      artboardSizeH,
      artboardSizeV
    )
  }

  if(showGrid){
    stroke(220, 220, 220)
    noFill()
    for (let i = artboardSizeH / gridSteps + canvasPaddingH; i < artboardSizeH + canvasPaddingH; i += artboardSizeH / gridSteps) {
      line(i,canvasPaddingV,i,artboardSizeV + canvasPaddingV)
    }
    for (let j = artboardSizeV / gridSteps + canvasPaddingV; j < artboardSizeV + canvasPaddingV; j += artboardSizeV / gridSteps) {
      line(canvasPaddingH,j,artboardSizeH + canvasPaddingH,j)
    }
  }
  noLoop()
}

function draw() {
  let cellSizeH = artboardSizeH / gridSteps
  let cellSizeV = artboardSizeV / gridSteps

  let itemSizeH = artboardSizeH / gridSteps - cellPadding * 2
  let itemSizeV = artboardSizeV / gridSteps - cellPadding * 2

  let cellsCounter = 1
  let colsCounter = 1
  let rowsCounter = 1
  let lastRow = rowsCounter

  let from1 = color(255,0,0,1)
  let to1 = color(255,215,0,1)
  let randomFloor = -2
  let randomCeil = 2

  for (let yPos = canvasPaddingV; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      noStroke()

      for(let layers = 0; layers < 4; layers++){
        let fillColor = lerpColor(from1, to1, 1 / (layers + 1)) // (gridSteps * gridSteps) * cellsCounter)
        fill(fillColor)

        blendMode(BLEND)
        if(layers > 0) {
          blendMode(MULTIPLY)
        }

        beginShape()
          // BOTTOM - FIX
          vertex(
            xPos + cellPadding + itemSizeH / 2,
            yPos + cellPadding + itemSizeV
          )
          // RIGHT
          vertex(
            xPos + cellPadding + itemSizeH * 0.8 + integrerRandom(randomFloor,randomCeil) - layers * 5,
            yPos + cellPadding + itemSizeV / 2 + integrerRandom(randomFloor,randomCeil) + layers * 5
          )
          // TOP
          vertex(
            xPos + cellPadding + itemSizeH / 2 + integrerRandom(randomFloor,randomCeil),
            yPos + cellPadding + integrerRandom(randomFloor,randomCeil) + layers * 15
          )
          // LEFT
          vertex(
            xPos + cellPadding + itemSizeH * 0.2 + integrerRandom(randomFloor,randomCeil) + layers * 5,
            yPos + cellPadding + itemSizeV / 2 + integrerRandom(randomFloor,randomCeil) + layers * 5
          )
        endShape(CLOSE)
      }

      // blendMode(BLEND)
      // fill('white')
      // rect(
      //   xPos + cellPadding + itemSizeH / 2,
      //   yPos + cellPadding + itemSizeV,
      //   cellSizeH / 2,
      //   10
      // )
      // fill('black')
      // ellipseMode(CORNER)
      // ellipse(
      //   xPos + cellPadding + itemSizeH / 2 - 5,
      //   yPos + cellPadding + itemSizeV,
      //   10,
      //   10
      // )

      // ---------- END DRAW STUFF ----------

      // DEBUG
      if(showDebug){
        noStroke()
        textSize(15)
        fill('black')
        text('CELL ' + cellsCounter, xPos, yPos + 15);
        text('ROW ' + rowsCounter, xPos, yPos + 30);
        text('COL ' + colsCounter, xPos, yPos + 45);
      }

      // COUNTER ADV
      ++colsCounter
      ++cellsCounter
    }
    ++rowsCounter
  }
}

// INTEGRER RANDOM
function integrerRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min)
}
