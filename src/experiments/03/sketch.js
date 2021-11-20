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
let itemSizeH = (artboardSizeH - cellPadding * 2) / gridSteps
let itemSizeV = (artboardSizeV - cellPadding * 2) / gridSteps
let cellsCounter = 1
let colsCounter = 1
let rowsCounter = 1
let lastRow = rowsCounter

let showGrid = false
let showDebug = false

function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(RGB)
  noLoop()
}

function draw() {
  let colorBack = color(241,237,228)
  let colorFront = color(50,50,47)

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

  for (let yPos = canvasPaddingV; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      stroke(colorFront)
      strokeWeight(itemSizeH / gridSteps * colsCounter)
      strokeCap(SQUARE)
      line(
        xPos + itemSizeH / 2,
        yPos + cellPadding,
        xPos + itemSizeH / 2,
        yPos + itemSizeV - cellPadding
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
