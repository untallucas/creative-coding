let canvasSizeH = 800
let canvasSizeV = 800
let canvasPaddingH = 40
let canvasPaddingV = 40
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridMin = 5
let gridMax = 10
let gridSteps = Math.floor(Math.random() * (gridMax - gridMin + 1)) + gridMin

let showGrid = true
let showArtboard = false
let showDebug = false

let cellPadding = 0

function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  background(250)

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

  let from1 = color(random(0,255),random(0,255),random(0,255))
  let to1 = color(random(0,255),random(0,255),random(0,255))

  // background('white')

  for (let yPos = canvasPaddingV; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      let fillColor = lerpColor(from1, to1, 1 / (gridSteps * gridSteps) * cellsCounter)
      fill(fillColor)
      let angleStart = 90 * random([0,1,2,3,4])
      noStroke()
      angleMode(DEGREES)
      arc(
        xPos + cellSizeH / 2,
        yPos + cellSizeV / 2,
        itemSizeH,
        itemSizeV,
        angleStart,
        angleStart + 90 * random([0,1,2,3,4])
      )
      fill(color(250))
      arc(
        xPos + cellSizeH / 2,
        yPos + cellSizeV / 2,
        itemSizeH / 2,
        itemSizeV / 2,
        0,
        360
      )

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
