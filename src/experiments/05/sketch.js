let canvasSizeH = 1000
let canvasSizeV = 1000
let canvasPaddingH = 100
let canvasPaddingV = 100
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridSteps = 20
let cellPadding = 0
let cellSizeH = artboardSizeH / gridSteps
let cellSizeV = artboardSizeV / gridSteps
let itemSizeH = cellSizeH - cellPadding * 2
let itemSizeV = cellSizeV - cellPadding * 2
let cellsCounter = 1
let colsCounter = 1
let rowsCounter = 1
let lastRow = rowsCounter

let colorBack = 'white'
let colorFront = 'black'

let showGrid = false
let showDebug = false

function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(RGB)
  angleMode(DEGREES)
  rectMode(CENTER)
  ellipseMode(CENTER)
  noLoop()
}

function draw() {
  colorBack = color(241,237,228)
  colorFront = color(50,50,47)

  background(colorBack)

  if(showGrid){
    stroke(210)
    noFill()
    for (let i = artboardSizeH / gridSteps + canvasPaddingH; i < artboardSizeH + canvasPaddingH; i += artboardSizeH / gridSteps) {
      line(i,canvasPaddingV,i,artboardSizeV + canvasPaddingV)
    }
    for (let j = artboardSizeV / gridSteps + canvasPaddingV; j < artboardSizeV + canvasPaddingV; j += artboardSizeV / gridSteps) {
      line(canvasPaddingH,j,artboardSizeH + canvasPaddingH,j)
    }
  }

  blendMode(BLEND)
  noFill()
  stroke(colorFront)

  for (let yPos = canvasPaddingV + cellSizeH / 2; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH + cellSizeH / 2; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      let shapeRotate = integrerRandom(0,1) * 90

      push()
        translate(xPos, yPos)
        rotate(shapeRotate)
        strokeWeight(4)
        arc(
          -itemSizeH / 2,
          -itemSizeV / 2,
          itemSizeH,
          itemSizeV,
          0,
          90
        )
        arc(
          itemSizeH / 2,
          itemSizeV / 2,
          itemSizeH,
          itemSizeV,
          180,
          270
        )
        strokeWeight(1)
        arc(
          -itemSizeH / 2,
          -itemSizeV / 2,
          itemSizeH - itemSizeH / 5,
          itemSizeV - itemSizeV / 5,
          0,
          90
        )
        arc(
          itemSizeH / 2,
          itemSizeV / 2,
          itemSizeH - itemSizeH / 5,
          itemSizeV - itemSizeV / 5,
          180,
          270
        )
        arc(
          -itemSizeH / 2,
          -itemSizeV / 2,
          itemSizeH + itemSizeH / 5,
          itemSizeV + itemSizeV / 5,
          0,
          90
        )
        arc(
          itemSizeH / 2,
          itemSizeV / 2,
          itemSizeH + itemSizeH / 5,
          itemSizeV + itemSizeV / 5,
          180,
          270
        )
      pop()

      // ---------- END DRAW STUFF ----------

      // DEBUG
      if(showDebug){
        noStroke()
        textSize(12)
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
