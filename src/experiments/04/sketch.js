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

  for (let yPos = canvasPaddingV + cellSizeH / 2; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH + cellSizeH / 2; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      // ---------- START DRAW STUFF ----------

      let fillColor = lerpColor(colorFront, colorBack, 1 / gridSteps * (rowsCounter - 1))
      noStroke()
      let shapeRotate = integrerRandom(1,4) * 90
      let shape = integrerRandom(0,30)

      push()
        translate(xPos, yPos)
        rotate(shapeRotate)
        blendMode(BLEND)
        fill(fillColor)
        drawShape(shape, 0, 0)
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
    case '19':
      beginShape()
        vertex(xPos - itemSizeH / 2, yPos - itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos - itemSizeV / 2)
        vertex(xPos - itemSizeH / 2, yPos + itemSizeV / 2)
        vertex(xPos + itemSizeH / 2, yPos + itemSizeV / 2)
      endShape(CLOSE)
    break

    // 3/4 CIRCLE
    case 20:
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        270,
        PIE
      )
    break

    // QUARTER CIRCLE
    case 21:
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
    break

    // QUARTER CIRCLE CORNERS
    case 22:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos - itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        270,
        360,
        PIE
      )
      arc(
        xPos + itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        90,
        180,
        PIE
      )
      arc(
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        180,
        270,
        PIE
      )
    break

    // 3 QUARTER CIRCLE CORNER
    case 23:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos - itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        270,
        360,
        PIE
      )
      arc(
        xPos + itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        90,
        180,
        PIE
      )
    break

    // 2 QUARTER CIRCLE CORNERS
    case 24:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos - itemSizeH / 2,
        yPos + itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        270,
        360,
        PIE
      )
    break

    // 4 QUARTER CIRCLES
    case 25:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos - itemSizeH / 2,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
    break

    // 3 QUARTER CIRCLES
    case 26:
      arc(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos,
        yPos - itemSizeV / 2,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
      arc(
        xPos - itemSizeH / 2,
        yPos,
        itemSizeH,
        itemSizeV,
        0,
        90,
        PIE
      )
    break

    // 2 TRIANGLES SMALL
    case 27:
      triangle(
        xPos - itemSizeH / 2,
        yPos,
        xPos,
        yPos + itemSizeV / 2,
        xPos - itemSizeH / 2,
        yPos + itemSizeH / 2
      )
      triangle(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        xPos,
        yPos,
        xPos - itemSizeH / 2,
        yPos
      )
    break

    // 3 TRIANGLES SMALL
    case 28:
      triangle(
        xPos - itemSizeH / 2,
        yPos,
        xPos,
        yPos + itemSizeV / 2,
        xPos - itemSizeH / 2,
        yPos + itemSizeH / 2
      )
      triangle(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        xPos,
        yPos,
        xPos - itemSizeH / 2,
        yPos
      )
      triangle(
        xPos,
        yPos - itemSizeV / 2,
        xPos + itemSizeH / 2,
        yPos,
        xPos,
        yPos,
      )
    break

    // 4 TRIANGLES SMALL
    case 29:
      triangle(
        xPos - itemSizeH / 2,
        yPos,
        xPos,
        yPos + itemSizeV / 2,
        xPos - itemSizeH / 2,
        yPos + itemSizeH / 2
      )
      triangle(
        xPos - itemSizeH / 2,
        yPos - itemSizeV / 2,
        xPos,
        yPos,
        xPos - itemSizeH / 2,
        yPos
      )
      triangle(
        xPos,
        yPos - itemSizeV / 2,
        xPos + itemSizeH / 2,
        yPos,
        xPos,
        yPos,
      )
      triangle(
        xPos,
        yPos,
        xPos + itemSizeH / 2,
        yPos + itemSizeV / 2,
        xPos,
        yPos + itemSizeV / 2
      )
    break

    // HALF CIRCLE SLANTED
    case 30:
      arc(
        xPos,
        yPos,
        itemSizeH,
        itemSizeV,
        -45,
        135,
        PIE
      )
    break
  }
}
