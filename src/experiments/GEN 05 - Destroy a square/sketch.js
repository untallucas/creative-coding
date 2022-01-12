let canvasSizeH = 1200
let canvasSizeV = 1200
let drawCount = 0
let direction = 0

let cellsList = []
for(let cell = 0; cell < 100; cell++){
  cellsList.push(cell)
}

function setup() {
  pixelDensity(2.0)
  frameRate(10)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(RGB)
  noStroke()
}

function draw() {
  let cellsCounter = 0
  let cellsToMute = []
  let colorBack = color(241,237,228)
  let colorFront = color(50,50,47)

  background(colorBack)
  
  if(!direction){
    colorBack = color(241,237,228)
    colorFront = color(50,50,47)
  }
  else{
    colorBack = color(50,50,47)
    colorFront = color(241,237,228)
  }

  cellsList.sort(() => Math.random() - 0.5)
  cellsToMute = cellsList.slice(0, drawCount)

  for(let rowCell = 0; rowCell < 10; rowCell++){
    for(let colCell = 0; colCell < 10; colCell++){
      fill(colorFront)
      if(cellsToMute.includes(cellsCounter)){
        fill(colorBack)
      }
      rect(100 + rowCell * 100, 100 + colCell * 100, 100, 100)
      cellsCounter++
    }
  }

  if(drawCount == 100){
    direction = direction ? 0 : 1
    drawCount = 0
  }
  drawCount++
}
