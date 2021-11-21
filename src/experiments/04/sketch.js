let canvasSizeH = 1000
let canvasSizeV = 1000
let canvasPaddingH = 100
let canvasPaddingV = 100
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridSteps = 10
let cellPadding = 10
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

let showGrid = true
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
    noStroke()
  }

  for (let yPos = canvasPaddingV + cellSizeH / 2; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH + cellSizeH / 2; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      // DEBUG
      // blendMode(MULTIPLY)
      // fill('yellow')
      // rect(canvasSizeH / 2, canvasSizeV / 2, artboardSizeH, artboardSizeV)


      let shape = integrerRandom(0,19)
      // shape = 'test'

      let fillColor = lerpColor(colorFront, colorBack, 1 / gridSteps * (rowsCounter - 1))
      fill(fillColor)

      push()
        translate(xPos, yPos)
        rotate(integrerRandom(0,4) * 90)
        drawShape(shape, 0, 0)
        // stroke('red')
        // strokeWeight(5)
        // point(0,0)
      pop()

      // blendMode(MULTIPLY)
      // noFill()
      // stroke(200)
      // drawShape(shape2, xPos, yPos)

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


// DRAW SHAPES
function drawShape(shape, xPos, yPos){
  switch(shape){
    default:
    break

    // CIRCLE
    case 1:
      circle(
        xPos,
        yPos,
        itemSizeH
      )
    break

    // SQUARE
    case 2:
      rect(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV
      )
    break

    // DIAMOND
    case 3:
      beginShape()
        vertex(xPos, yPos - itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos)
        vertex(xPos, yPos + itemSizeV / 2)
        vertex(xPos - itemSizeH / 2, yPos)
      endShape(CLOSE)
    break

    // DONUT
    case 4:
      circle(
        xPos,
        yPos,
        itemSizeH
      )
      fill(colorBack)
      circle(
        xPos,
        yPos,
        itemSizeH / 2
      )
    break

    // TRIANGLE
    case 5:
      triangle(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        xPos - itemSizeH / 2,
        yPos + itemSizeH / 2
      )
    break

    // ARC
    case 6:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH * 2,
        itemSizeV * 2,
        0,
        90,
        PIE
      )
    break

    // QUARTER DONUT
    case 7:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH * 2,
        itemSizeV * 2,
        0,
        90,
        PIE
      )
      fill(colorBack)
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
    break

    // HALF CIRCLE DISPLACED
    case 8:
      arc(
        xPos,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        180,
        PIE
      )
    break

    // HALF CIRCLE
    case 9:
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        180,
        PIE
      )
    break

    // SMALL CIRCLE
    case 10:
      circle(
        xPos,
        yPos,
        itemSizeH / 2
      )
    break

    // SMALL SQUARE
    case 11:
      rect(
        xPos,
        yPos,
        itemSizeH / 2
      )
    break

    // HALF RECTANGLE
    case 12:
      rect(
        xPos,
        yPos - itemSizeV / 4,
        itemSizeH,
        itemSizeV / 2
      )
    break

    // TWO SQUARES
    case 13:
      rect(
        xPos - itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2,
        itemSizeV / 2
      )
      rect(
        xPos + itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2,
        itemSizeV / 2
      )
    break

    // THREE SQUARES
    case 14:
      rect(
        xPos - itemSizeH / 4,
        yPos,
        itemSizeH / 2,
        itemSizeV
      )
      rect(
        xPos + itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2,
        itemSizeV / 2
      )
    break

    // TWO CIRCLES
    case 15:
      circle(
        xPos - itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos + itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
    break

    // TWO CIRCLES
    case 16:
      circle(
        xPos - itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos - itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
    break

    // THREE CIRCLES
    case 17:
      circle(
        xPos - itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos - itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos + itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
    break

    // FOUR CIRCLES
    case 18:
      circle(
        xPos - itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos - itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos + itemSizeH / 4,
        yPos + itemSizeV / 4,
        itemSizeH / 2
      )
      circle(
        xPos + itemSizeH / 4,
        yPos - itemSizeV / 4,
        itemSizeH / 2
      )
    break
    
    // HOURGLASS
    case 19:
      beginShape()
        vertex(xPos - itemSizeH / 2, yPos - itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos - itemSizeV / 2)
        vertex(xPos - itemSizeH / 2, yPos + itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos + itemSizeV / 2)
      endShape(CLOSE)
    break

    // 3/4 PIES
    // QUARTER ARCS
    // SQUARED ARCS
    // 4 TRIANGLES VARS
    // 2 SQUARES VARS
    // HALF CIRCLE DIAGONAL
    // QUARTER CIRCLES
  }
}
