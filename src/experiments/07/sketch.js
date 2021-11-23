let canvasSizeH = 1000
let canvasSizeV = 1000
let canvasPaddingH = 100
let canvasPaddingV = 100
let artboardSizeH = canvasSizeH - canvasPaddingH * 2
let artboardSizeV = canvasSizeV - canvasPaddingV * 2
let gridSteps = 15
let cellPadding = 0
let cellSizeH = artboardSizeH / gridSteps
let cellSizeV = artboardSizeV / gridSteps
let itemSizeH = cellSizeH - cellPadding * 2
let itemSizeV = cellSizeV - cellPadding * 2
let cellsCounter = 0
let colsCounter = 1
let rowsCounter = 1
let lastRow = rowsCounter

let colorBack = 'white'
let colorFront = 'black'

let showGrid = false

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

  let shapeBorders = []

  for (let yPos = canvasPaddingV + cellSizeH / 2; yPos < artboardSizeV + canvasPaddingV; yPos += cellSizeV) {
    for (let xPos = canvasPaddingH + cellSizeH / 2; xPos < artboardSizeH + canvasPaddingH; xPos += cellSizeH) {
      // COUNTER ADV
      if(rowsCounter != lastRow){
        colsCounter = 1
        lastRow = rowsCounter
      }

      let leftBorder = false
      let topBorder = false

      if(cellsCounter != 0 && colsCounter != 1 && shapeBorders[cellsCounter - 1][0]){
        leftBorder = true
      }

      if(typeof shapeBorders[cellsCounter - gridSteps] != 'undefined') {
        if(shapeBorders[cellsCounter - gridSteps][1]){
          topBorder = true
        }
      }

      let shapeOptions = []
      if(topBorder && !leftBorder){
        // ◥
        shapeOptions = [3]
      }
      if(topBorder && leftBorder){
        // ◤ ◼️
        shapeOptions = [1,2]
      }
      if(leftBorder && !topBorder){
        // ◣
        shapeOptions = [5]
      }
      if(!topBorder && !leftBorder){
        // ◢ x
        shapeOptions = [0,4]
      }

      let shape = random(shapeOptions)
      let rightBorder = false
      let bottomBorder = false

      noStroke()
      fill(colorFront)
      switch(shape){
        case 0:
        break

        case 1:
          // 1 ◼️
          rect(
            xPos,
            yPos,
            itemSizeH,
            itemSizeV
          )
          rightBorder = true
          bottomBorder = true
        break

        case 2:
          // 2 ◤
          triangle(
            xPos - itemSizeH / 2,
            yPos - itemSizeV / 2,
            xPos + itemSizeH / 2,
            yPos - itemSizeV / 2,
            xPos - itemSizeH / 2,
            yPos + itemSizeH / 2
          )
        break

        case 3:
          // 3 ◥
          triangle(
            xPos - itemSizeH / 2,
            yPos - itemSizeV / 2,
            xPos + itemSizeH / 2,
            yPos - itemSizeV / 2,
            xPos + itemSizeH / 2,
            yPos + itemSizeH / 2
          )
          rightBorder = true
        break

        case 4:
          // 4 ◢
          triangle(
            xPos + itemSizeH / 2,
            yPos - itemSizeV / 2,
            xPos + itemSizeH / 2,
            yPos + itemSizeH / 2,
            xPos - itemSizeH / 2,
            yPos + itemSizeV / 2
          )
          rightBorder = true
          bottomBorder = true
        break

        case 5:
          // 5 ◣
          triangle(
            xPos + itemSizeH / 2,
            yPos + itemSizeH / 2,
            xPos - itemSizeH / 2,
            yPos + itemSizeV / 2,
            xPos - itemSizeH / 2,
            yPos - itemSizeV / 2
          )
          bottomBorder = true
        break
      }

      shapeBorders.push([rightBorder, bottomBorder])

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
