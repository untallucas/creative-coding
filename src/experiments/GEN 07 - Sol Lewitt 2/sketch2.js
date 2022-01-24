// SENDEROS Q SE BIFURCAN
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
  noLoop()
}


// DRAWING RENDER
function draw() {
  // COLORS
  let colorFront = color(baseColorHue, 80, 50)
  let colorBack = color(compColorHue, 80, 50)

  colorPalette = [
    colorStress,
    colorFront,
    lerpColor(colorFront, colorBack, 0.25),
    lerpColor(colorFront, colorBack, 0.50),
    lerpColor(colorFront, colorBack, 0.75),
    colorBack
  ]


  // BACKGROUND
  let backgroundLight = integrerRandom(0,1) == 1 ? 10 : 90
  background(baseColorHue, 50, backgroundLight)


  // SETUP
  let circleSteps = 100
  let circleMin = 20
  let circleMax = canvasSizeH * 2
  let circleX = canvasSizeH / 2
  let circleY = canvasSizeV / 2

  
  // CIRCLES
  noFill()
  strokeCap(SQUARE)
  for(let drawCircle = 0; drawCircle < circleSteps; drawCircle++){
    let strokeColor = colorPalette[integrerRandom(0,5)]
    drawingContext.setLineDash([integrerRandom(50,200), integrerRandom(0,50)])
    drawingContext.setLineDash([integrerRandom(50,200), 10])
    strokeWeight(10)
    stroke(strokeColor)
    noFill()
    circle(circleX, circleY, 10 * drawCircle * 4)
  }
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
