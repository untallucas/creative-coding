let canvasSizeH = 1000
let canvasSizeV = 1000
let canvasPaddingH = 100
let canvasPaddingV = 100
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridSteps = 10
let cellPadding = 0
let cellSizeH = artboardSizeH / gridSteps
let cellSizeV = artboardSizeV / gridSteps
let itemSizeH = (artboardSizeH - cellPadding * 2) / gridSteps
let itemSizeV = (artboardSizeV - cellPadding * 2) / gridSteps
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

  for (let yPos = canvasPaddingV; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      let fillColor = lerpColor(colorFront, colorBack, 1 / gridSteps * (rowsCounter - 1))
      let shape = integrerRandom(0,30)
      let shape2 = integrerRandom(0,30)

      blendMode(BLEND)
      fill(fillColor)
      noStroke()
      drawShape(shape, xPos, yPos)

      // blendMode(MULTIPLY)
      // noFill()
      // stroke(200)
      // drawShape(shape2, xPos, yPos)

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


// DRAW SHAPES
function drawShape(shape, xPos, yPos){
  switch(shape){
    default:
    break

    // TRIANGLE LEFT BOTTOM
    case 1:
      triangle(
        xPos,
        yPos,
        xPos + itemSizeH,
        yPos + itemSizeV,
        xPos,
        yPos + itemSizeH
      )
    break

    // TRIANGLE RIGHT BOTTOM
    case 2:
      triangle(
        xPos + itemSizeH,
        yPos,
        xPos + itemSizeH,
        yPos + itemSizeV,
        xPos,
        yPos + itemSizeH
      )
    break

    // TRIANGLE LEFT TOP
    case 3:
      triangle(
        xPos,
        yPos,
        xPos + itemSizeH,
        yPos,
        xPos,
        yPos + itemSizeH
      )
    break

    // TRIANGLE RIGHT TOP
    case 4:
      triangle(
        xPos,
        yPos,
        xPos + itemSizeH,
        yPos,
        xPos + itemSizeH,
        yPos + itemSizeH
      )
    break

    // DIAMOND
    case 5:
      beginShape()
        vertex(xPos + itemSizeH / 2, yPos)
        vertex(xPos + itemSizeH, yPos + itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos + itemSizeV)
        vertex(xPos, yPos + itemSizeV / 2)
      endShape(CLOSE)
    break

    // CIRCLE
    case 6:
      circle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH
      )
    break

    // DONUT
    case 7:
      circle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH
      )
      fill(colorBack)
      circle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH / 2
      )
    break

    // SQUARE
    case 8:
      rect(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV
      )
    break

    // ARC LEFT BOTTOM
    case 9:
      arc(
        xPos,
        yPos + itemSizeV,
        itemSizeH * 2,
        itemSizeV * 2,
        PI + HALF_PI,
        0,
        PIE
      )
    break

    // ARC RIGHT BOTTOM
    case 10:
      arc(
        xPos + itemSizeH,
        yPos + itemSizeV,
        itemSizeH * 2,
        itemSizeV * 2,
        PI,
        PI + HALF_PI,
        PIE
      )
    break

    // ARC LEFT TOP
    case 11:
      arc(
        xPos,
        yPos,
        itemSizeH * 2,
        itemSizeV * 2,
        0,
        HALF_PI,
        PIE
      )
    break

    // ARC RIGHT TOP
    case 12:
      arc(
        xPos + itemSizeH,
        yPos,
        itemSizeH * 2,
        itemSizeV * 2,
        HALF_PI,
        PI,
        PIE
      )
    break

    // DONUT ARC LEFT BOTTOM
    case 13:
      arc(
        xPos,
        yPos + itemSizeV,
        itemSizeH * 2,
        itemSizeV * 2,
        PI + HALF_PI,
        0,
        PIE
      )
      fill(colorBack)
      arc(
        xPos,
        yPos + itemSizeV,
        itemSizeH,
        itemSizeV,
        PI + HALF_PI,
        0,
        PIE
      )
    break

    // DONUT ARC RIGHT BOTTOM
    case 14:
      arc(
        xPos + itemSizeH,
        yPos + itemSizeV,
        itemSizeH * 2,
        itemSizeV * 2,
        PI,
        PI + HALF_PI,
        PIE
      )
      fill(colorBack)
      arc(
        xPos + itemSizeH,
        yPos + itemSizeV,
        itemSizeH,
        itemSizeV,
        PI,
        PI + HALF_PI,
        PIE
      )
    break

    // DONUT ARC LEFT TOP
    case 15:
      arc(
        xPos,
        yPos,
        itemSizeH * 2,
        itemSizeV * 2,
        0,
        HALF_PI,
        PIE
      )
      fill(colorBack)
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        HALF_PI,
        PIE
      )
    break

    // DONUT ARC RIGHT TOP
    case 16:
      arc(
        xPos + itemSizeH,
        yPos,
        itemSizeH * 2,
        itemSizeV * 2,
        HALF_PI,
        PI,
        PIE
      )
      fill(colorBack)
      arc(
        xPos + itemSizeH,
        yPos,
        itemSizeH,
        itemSizeV,
        HALF_PI,
        PI,
        PIE
      )
    break

    // HALF CIRCLE BOTTOM
    case 17:
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        PI,
        PIE
      )
    break

    // HALF CIRCLE TOP
    case 18:
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        PI,
        0,
        PIE
      )
    break

    // HALF CIRCLE LEFT
    case 19:
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        HALF_PI,
        HALF_PI + PI,
        PIE
      )
    break    

    // HALF CIRCLE RIGHT
    case 20:
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        HALF_PI + PI,
        HALF_PI,
        PIE
      )
    break

    // HALF CIRCLE BOTTOM DISPLACED
    case 21:
      arc(
        xPos + itemSizeH / 2,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        PI,
        PIE
      )
    break

    // HALF CIRCLE TOP DISPLACED
    case 22:
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV,
        itemSizeH,
        itemSizeV,
        PI,
        0,
        PIE
      )
    break

    // HALF CIRCLE LEFT DISPLACED
    case 23:
      arc(
        xPos + itemSizeH,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        HALF_PI,
        HALF_PI + PI,
        PIE
      )
    break    

    // HALF CIRCLE RIGHT DISPLACED
    case 24:
      arc(
        xPos,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        HALF_PI + PI,
        HALF_PI,
        PIE
      )
    break
    
    // SMALL CIRCLE
    case 25:
      circle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH / 2
      )
    break

    // HOURGLASS
    case 26:
      triangle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        xPos,
        yPos,
        xPos + itemSizeH,
        yPos
      )
      triangle(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        xPos + itemSizeH,
        yPos + itemSizeV,
        xPos,
        yPos + itemSizeV
      )
    break

    // RECTANGLE TOP
    case 27:
      rect(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV / 2
      )
    break

    // RECTANGLE BOTTOM
    case 28:
      rect(
        xPos,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV / 2
      )
    break

    // RECTANGLE LEFT
    case 29:
      rect(
        xPos,
        yPos,
        itemSizeH / 2,
        itemSizeV
      )
    break

    // RECTANGLE RIGHT
    case 30:
      rect(
        xPos + itemSizeH / 2,
        yPos,
        itemSizeH / 2,
        itemSizeV
      )
    break

    // 4 CIRCLES
    // 3/4 PIES
    // QUARTER ARCS
    // SQUARED ARCS
    // 4 TRIANGLES VARS
    // 2 SQUARES VARS
    // HALF CIRCLE DIAGONAL
    // QUARTER CIRCLES
    // 
  }
}