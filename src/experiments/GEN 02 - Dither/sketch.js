// GENERAL SETUP
let canvasSizeH = 1000
let canvasSizeV = 1000


// VISUALIZATION OPTIONS
let drawBackground = true
let drawNoise = true
let drawClouds = true

const balloonPatterns = [
  PTN.wave(50, 10, 20, 10),
  PTN.checked(10, 20),
  PTN.wave(200, 30, 60, 40),
  PTN.checked(180, 60),
  PTN.wave(600, 50, 180, 100),
  PTN.checked(80, 80),
]


// TRAITS AND SCENE VARIATIONS
let balloonColorsHue = integrerRandom(0, 360)
let nimbusSizeList = []
let nimbusXList = []
let nimbusYList = []
for(let i = 0; i < 20; i++){
  nimbusSizeList.push(integrerRandom(3,5) * canvasSizeH / 10)
  nimbusXList.push(integrerRandom(-2,12) * canvasSizeH / 10)
  nimbusYList.push(integrerRandom(9,11) * canvasSizeV / 10)
}


// COLOR PALETTE CALCULATION
let colorHues = triadicColorCalc()
let colorPrimaryHue = colorHues['first']
let colorSecondaryHue = colorHues['second']
let colorTertiaryHue = colorHues['third']


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
  // SET COLORS
  let colorPrimaryBase = color(colorPrimaryHue, 60, 60)
  let colorPrimaryShadow = color(colorPrimaryHue, 50, 40)
  let colorPrimaryLight = color(colorPrimaryHue, 50, 70)
  let colorPrimaryLightest = color(colorPrimaryHue, 20, 95)

  let colorSecondaryBase = color(colorSecondaryHue, 50, 50)
  let colorSecondaryShadow = color(colorSecondaryHue, 50, 40)
  let colorSecondaryLight = color(colorSecondaryHue, 50, 70)
  let colorSecondaryLightest = color(colorSecondaryHue, 20, 95)

  let colorTertiaryBase = color(colorTertiaryHue, 50, 50)
  let colorTertiaryShadow = color(colorTertiaryHue, 50, 40)
  let colorTertiaryLight = color(colorTertiaryHue, 50, 70)
  let colorTertiaryLightest = color(colorTertiaryHue, 20, 95)


  // BACKGROUND
  background(255)
  if(drawBackground){
    noStroke()
    fill(colorSecondaryLightest)
    rect(0, 0, canvasSizeH, canvasSizeV)
    colorMode(RGB)
    blendMode(OVERLAY)
    for (let j = 0; j < canvasSizeV; j += 2) {
      let skyFrom = color(190)
      let skyTo = color(100)
      let skyFillColor = lerpColor(skyFrom, skyTo, 1 / canvasSizeV * j)
      fill(skyFillColor)
      rect(0,j,canvasSizeH,2)
    }
    push()
      rotate(90)
      translate(0, -1000)
      image(addGrain(canvasSizeH / 3, canvasSizeH, 0, canvasSizeV, 0), 0, 0, canvasSizeH, canvasSizeV)
    pop()
  }


  // CLOUDS
  if(drawClouds){
    ellipseMode(CENTER)
    noStroke()
    for(let cloudsLoop = 0; cloudsLoop < 20; ++cloudsLoop) {
      let nimbusSize = nimbusSizeList[cloudsLoop]
      let nimbusX = nimbusXList[cloudsLoop]
      let nimbusY = nimbusYList[cloudsLoop]
      blendMode(BLEND)
      fill('white')
      ellipse(nimbusX, nimbusY, nimbusSize)
      nimbusMask = createGraphics(1000, 1000)
      nimbusMask.fill('rgba(0, 0, 0, 1)')
      nimbusMask.ellipse(
        nimbusX,
        nimbusY,
        nimbusSize
      )
      grainLayerContent = 
        addGrain(
          nimbusX - nimbusSize / 4,
          nimbusX + nimbusSize / 2, 
          nimbusY - nimbusSize / 2, 
          nimbusY + nimbusSize / 2,
          100
        )
      grainLayerContent.mask(nimbusMask)
      blendMode(HARD_LIGHT)
      image(grainLayerContent, 0, 0, canvasSizeH, canvasSizeV)
    }
  }


  // SKYLIGHT
  colorMode(RGB)
  blendMode(SOFT_LIGHT)
  noStroke()
  for (let j = 0; j < canvasSizeV; j += 2) {
    let shadowFrom = color(150,150,150)
    let shadowTo = colorTertiaryBase
    let skyFillColor = lerpColor(shadowFrom, shadowTo, 1 / canvasSizeV * j)
    fill(skyFillColor)
    rect(0, j, canvasSizeH, 2)
  }


  // NOISE EFFECT
  if(drawNoise){
    noiseLayer = createImage(canvasSizeH,canvasSizeV)
    noiseLayer.loadPixels()
    for(var y = 0; y < canvasSizeV; y++) {
      for(var x = 0; x < canvasSizeH; x++) {
        var index = (x + y * canvasSizeH) * 4
        noiseLayer.pixels[index+0] = 0
        noiseLayer.pixels[index+1] = 0
        noiseLayer.pixels[index+2] = 0
        noiseLayer.pixels[index+3] = random(80)
      }
    }
    noiseLayer.updatePixels()
    blendMode(OVERLAY)
    image(noiseLayer, 0, 0)
  }
}


// INTEGRER RANDOM
function integrerRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min)
}


// GRAIN
function addGrain(grainLayerStartH = 0, grainLayerStopH = canvasSizeH, grainLayerStartV = 0, grainLayerStopV = canvasSizeV, grainStrength = 0){
  let grainLayerWidth = canvasSizeH
  let grainLayerHeight = canvasSizeV
  let grainLayerContent = createImage(grainLayerWidth, grainLayerHeight)

  grainLayerContent.loadPixels()
  for(let x = 0; x < grainLayerWidth; x++) {
    for(let y = 0; y < grainLayerHeight; y++) {
      let index = (x + y * grainLayerWidth) * 4
      let pixelAlpha = 255

      // LEFT TO RIGHT
      if(grainLayerStartH < grainLayerStopH){
        if(x > grainLayerStartH || x < grainLayerStopH){
          let grainThreshold = random(grainLayerStartH, grainLayerStopH)
          if(
            grainThreshold < grainLayerWidth - (grainLayerWidth - grainLayerStopH - grainLayerStartH) - x ||
            y < grainLayerStartV || 
            y > grainLayerStopV
          ) {
            pixelAlpha = 0
          }
        }
        if(x > grainLayerStopH){
          pixelAlpha = 0
        }
      }

      // RIGHT TO LEFT
      else {
        if(x < grainLayerStartH && x > grainLayerStopH){
          let grainThreshold = random(grainLayerStopH, grainLayerStartH)
          if(
            grainThreshold > grainLayerWidth - (grainLayerWidth - grainLayerStopH - grainLayerStartH) - x ||
            y < grainLayerStartV ||
            y > grainLayerStopV
          ) {
            pixelAlpha = 0
          }
        }
        else {
          pixelAlpha = 0
        }
      }
      grainLayerContent.pixels[index+0] = grainStrength
      grainLayerContent.pixels[index+1] = grainStrength
      grainLayerContent.pixels[index+2] = grainStrength
      grainLayerContent.pixels[index+3] = pixelAlpha
    }
  }
  grainLayerContent.updatePixels()
  return grainLayerContent
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
