// GENERAL SETUP
let canvasSizeH = 1000
let canvasSizeV = 1000


// BASE COLORS
let baseColorHue = integrerRandom(0, 180)
let compColorHue = baseColorHue + integrerRandom(0, 180)
let colorStress = integrerRandom(0,1) == 1 ? 'white' : 'black'


// CANVAS SETUP
function setup() {
  pixelDensity(2.0)
  frameRate(1)
  createCanvas(canvasSizeH, canvasSizeV)
  colorMode(HSL)
  angleMode(DEGREES)
  rectMode(CENTER)
  strokeCap(PROJECT)
  strokeJoin(MITER)
  noLoop()
}


// DRAWING RENDER
function draw() {
  // COLORS
  // let colorFront = color(baseColorHue, 80, 50)
  // let colorBack = color(compColorHue, 80, 50)
  // let colorBack = color(241,237,228)
  // let colorFront = color(50,50,47)
  // let colorBack = color('pink')
  // let colorFront = color('fuchsia')

  colorPalette = [
    color('red'),
    color('gold'),
    color('forestgreen'),
    color('purple'),
    color('darkorange'),
    color('royalblue')
  ]


  // BACKGROUND
  let backgroundLight = integrerRandom(0,1) == 1 ? 10 : 90
  background(baseColorHue, 50, backgroundLight)
  // background('black')


  // SETUP
  let linesWidth = 50
  let strokeColor = 'white'
  let squareX = canvasSizeH / 2
  let squareY = canvasSizeV / 2


  // SQUARES
  // noFill()
  // strokeWeight(linesWidth)

  // for(let drawSquare = linesWidth; drawSquare <= canvasSizeH - linesWidth; drawSquare = drawSquare + linesWidth * 2){
  //   drawingContext.setLineDash([])
  //   strokeColor = colorPalette[integrerRandom(0,colorPalette.length - 1)]
  //   // strokeColor = lerpColor(colorFront, colorBack, 1 / colorPalette.length * integrerRandom(1,colorPalette.length))
  //   stroke(strokeColor)
  //   rect(squareX, squareY, drawSquare)
  //   for(let colorsPerLine = 0; colorsPerLine <= colorPalette.length; colorsPerLine++){
  //     drawingContext.setLineDash([integrerRandom(1,2)*linesWidth,integrerRandom(4,6)*linesWidth])
  //     strokeColor = colorPalette[integrerRandom(0, colorPalette.length - 1)]
  //     // strokeColor = lerpColor(colorFront, colorBack, 1 / colorPalette.length * integrerRandom(1,colorPalette.length))
  //     stroke(strokeColor)
  //     rect(squareX, squareY, drawSquare)
  //   }
  // }

  // ARCS
  noFill()
  strokeWeight(linesWidth)
  strokeCap(ROUND)
  strokeJoin(ROUND)

  for(let repetitions = 0; repetitions < 3; repetitions++){
    let arcX = integrerRandom(0,canvasSizeH)
    let arcY = integrerRandom(0,canvasSizeV)
    let arcSize = integrerRandom(2,12)*100
    let arcStart = integrerRandom(0,180)
    let arcEnd = integrerRandom(0,180)

    drawingContext.setLineDash([])
    strokeColor = colorPalette[integrerRandom(0,colorPalette.length - 1)]
    stroke(strokeColor)
    arc(arcX, arcY, arcSize, arcSize, arcStart, arcEnd)

    for(let linesOffset = 5; linesOffset > 0; linesOffset--){
      strokeWeight(linesWidth*linesOffset)
      for(let colorsPerLine = 0; colorsPerLine <= colorPalette.length; colorsPerLine++){
        drawingContext.setLineDash([integrerRandom(1,2)*linesWidth,integrerRandom(4,6)*linesWidth])
        strokeColor = colorPalette[integrerRandom(0, colorPalette.length - 1)]
        stroke(strokeColor)
        arc(arcX, arcY, arcSize, arcSize, arcStart, arcEnd)
      }
    }
  }

  // POP BEANS
  // noFill()
  // strokeWeight(linesWidth)
  // strokeCap(ROUND)
  // strokeJoin(ROUND)

  // for(let repetitions = 0; repetitions < 10; repetitions++){
  //   let arcX = integrerRandom(0,canvasSizeH)
  //   let arcY = integrerRandom(0,canvasSizeV)
  //   let arcSize = integrerRandom(2,12)*10
  //   let arcStart = integrerRandom(0,180)
  //   let arcEnd = integrerRandom(0,180)

  //   drawingContext.setLineDash([])
  //   strokeColor = colorPalette[integrerRandom(0,colorPalette.length - 1)]
  //   stroke(strokeColor)
  //   arc(arcX, arcY, arcSize, arcSize, arcStart, arcEnd)

  //   for(let linesOffset = 5; linesOffset > 0; linesOffset--){
  //     strokeWeight(linesWidth*linesOffset)
  //     for(let colorsPerLine = 0; colorsPerLine <= colorPalette.length; colorsPerLine++){
  //       drawingContext.setLineDash([integrerRandom(1,2)*linesWidth,integrerRandom(4,6)*linesWidth])
  //       strokeColor = colorPalette[integrerRandom(0, colorPalette.length - 1)]
  //       stroke(strokeColor)
  //       arc(arcX, arcY, arcSize, arcSize, arcStart, arcEnd)
  //     }
  //   }
  // }

  // for(let drawSquare = linesWidth; drawSquare <= canvasSizeH - linesWidth; drawSquare = drawSquare + linesWidth * 2){
  //   drawingContext.setLineDash([])
  //   strokeColor = colorPalette[integrerRandom(0,colorPalette.length - 1)]
  //   stroke(strokeColor)
  //   rect(squareX, squareY, drawSquare)
  //   colorPalette.sort(() => Math.random() - 0.5)
  //   for(let colorsPerLine = 0; colorsPerLine <= 5; colorsPerLine++){
  //     // drawingContext.setLineDash([integrerRandom(1,3)*linesWidth,integrerRandom(4,6)*linesWidth])
  //     drawingContext.setLineDash([
  //       Math.abs(colorPalette.length-colorsPerLine)*linesWidth,
  //       (colorsPerLine+1)*linesWidth
  //     ])
  //     strokeColor = colorPalette[integrerRandom(0, colorPalette.length - 1)]
  //     strokeColor = colorPalette[ colorsPerLine ]
  //     stroke(strokeColor)
  //     rect(squareX, squareY, drawSquare)
  //   }
  // }
}


// INTEGRER RANDOM
function integrerRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min)
}


// COLOR CONVERT
function colorConvert(colorHexa){
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHexa)
  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)
  r /= 255, g /= 255, b /= 255
  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if(max == min) {
    h = s = 0
  } 
  else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0) 
      break
      case g: h = (b - r) / d + 2 
      break
      case b: h = (r - g) / d + 4 
      break
    }
    h /= 6
  }
  s = s*100
  s = Math.round(s)
  l = l*100
  l = Math.round(l)
  h = Math.round(360*h)

  let color = []
  color['R'] = r * 255
  color['G'] = g * 255
  color['B'] = b * 255
  color['H'] = h
  color['S'] = s
  color['L'] = l
  return(color)
}


// TRIADIC COLOR HUE CALCULATOR
function triadicColorCalc(colorHueFirstStep = balloonColorsHue){
  let colorHueSecondStep
  let colorHueThirdStep
  let color = []

  colorHueFirstStep + 120 < 360
  ? colorHueSecondStep = colorHueFirstStep + 120
  : colorHueSecondStep = Math.abs(colorHueFirstStep + 120 - 360)

  colorHueSecondStep + 120 < 360
  ? colorHueThirdStep = colorHueSecondStep + 120
  : colorHueThirdStep = Math.abs(colorHueSecondStep + 120 - 360)

  color['first'] = colorHueFirstStep
  color['second'] = colorHueSecondStep
  color['third'] = colorHueThirdStep
  return(color)
}

// COMPLEMENTARY COLOR HUE CALCULATOR
// function complementaryColorCalc(colorHueFirstStep = baseColorHue){
//   let colorHueSecondStep
//   let color = []

//   colorHueFirstStep + 120 < 360
//   ? colorHueSecondStep = colorHueFirstStep + 120
//   : colorHueSecondStep = Math.abs(colorHueFirstStep + 120 - 360)

//   colorHueSecondStep + 120 < 360
//   ? colorHueThirdStep = colorHueSecondStep + 120
//   : colorHueThirdStep = Math.abs(colorHueSecondStep + 120 - 360)

//   color['first'] = colorHueFirstStep
//   color['second'] = colorHueSecondStep
//   return(color)
// }
