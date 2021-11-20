let canvasSizeH = 1000
let canvasSizeV = 1000
let canvasPaddingH = 100
let canvasPaddingV = 100
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridSteps = 2
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

let showGrid = true
let showDebug = true

function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(RGB)
  angleMode(DEGREES)
  rectMode(CENTER)
  noLoop()
}

function draw() {
  colorBack = color(241,237,228)
  colorFront = color(50,50,47)
  background(colorBack)

  push()
    translate(-50, -50)
    rotate(30)
    translate(150,150)
    noStroke()
    fill('gray')
    rect(
      200,
      200,
      200,
      200
    )
    stroke('black')
    strokeWeight(4)
    noFill()
    point(200,200)
  pop()

  noStroke()
  fill('green')
  rect(
    400,
    400,
    200,
    200
  )
  stroke('black')
  strokeWeight(4)
  noFill()
  point(400,400)

  // push()
  //   translate(-300,-300)
  //   rotate(45)
  //   rect(
  //     200,
  //     200,
  //     200,
  //     200
  //   )
  // pop()

  // fill('lime')
  // rect(
  //   200,
  //   200,
  //   100,
  //   100
  // )
}


// INTEGRER RANDOM
function integrerRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min)
}
