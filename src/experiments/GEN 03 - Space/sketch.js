// GENERAL SETUP
let canvasSizeH = 1000
let canvasSizeV = 1000


// VISUALIZATION OPTIONS
let drawNoise = true


// TRAITS AND SCENE VARIATIONS
let balloonColorsHue = integrerRandom(0, 360)
let nimbusSizeList = []
let nimbusXList = []
let nimbusYList = []
for(let i = 0; i < 20; i++){
  nimbusSizeList.push(integrerRandom(2,4) * canvasSizeH / 10)
  nimbusXList.push(integrerRandom(-2,12) * canvasSizeH / 10)
  nimbusYList.push(integrerRandom(2,8) * canvasSizeV / 10)
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
  background(10)



  // AURORA
  stroke('white')
  let shootingStarsX = integrerRandom(0,canvasSizeH)
  let shootingStarsY = integrerRandom(0,canvasSizeV)
  shootingStarsX = 500
  shootingStarsY = 1000

  drawingContext.filter = 'blur(40px)'
  for(let auroraLines = 0; auroraLines < 30; auroraLines++){
    let A = createVector(integrerRandom(0,canvasSizeH), integrerRandom(0,canvasSizeV))
    let B = createVector(shootingStarsX, shootingStarsY)
    let P = B.sub(A).normalize().mult(integrerRandom(2,20) * 200).add(A)
    line(A.x, A.y, P.x, P.y)
  }


  // SHOOTING STARS
  drawingContext.filter = 'blur(3px)'
  for(let shootingStars = 0; shootingStars < 20; shootingStars++){
    let A = createVector(integrerRandom(0,canvasSizeH), integrerRandom(0,canvasSizeV))
    let B = createVector(shootingStarsX, shootingStarsY)
    let P = B.sub(A).normalize().mult(integrerRandom(2,20) * 200).add(A)
    line(A.x, A.y, P.x, P.y)
  }
  drawingContext.filter = 'blur(100px)'
  noStroke()
  fill(10)
  circle(canvasSizeH/2,canvasSizeV * 1.9,canvasSizeH*2.3)


  // FARAWAY STARS
  blendMode(OVERLAY)
  drawingContext.filter = 'blur(0px)'
  stroke(85)
  for(let stars = 0; stars < 500; stars++){
    strokeWeight(integrerRandom(0,3))
    point(integrerRandom(0,canvasSizeH), integrerRandom(0,canvasSizeV))
  }


  // COLOR STARS
  blendMode(BLEND)
  for(let planets = 0; planets < 20; planets++){
    stroke(colorTertiaryBase)
    strokeWeight(integrerRandom(2,5))
    point(integrerRandom(0,canvasSizeH), integrerRandom(0,canvasSizeV))
  }


  // STARS
  blendMode(BLEND)
  drawingContext.filter = 'blur(0)'
  stroke('white')
  for(let stars = 0; stars < 500; stars++){
    strokeWeight(integrerRandom(0,3))
    point(integrerRandom(0,canvasSizeH), integrerRandom(0,canvasSizeV))
  }


  // PLANET
  noStroke()
  fill(255)
  drawingContext.filter = 'blur(400px)'
  circle(canvasSizeH/2,canvasSizeV * 1.9,canvasSizeH*2)

  noStroke()
  fill(0)
  drawingContext.filter = 'blur(0)'
  circle(canvasSizeH/2,canvasSizeV * 1.9,canvasSizeH*2)


  // MOONS
  drawingContext.filter = 'blur(0)'
  circle(integrerRandom(100,800),integrerRandom(700,900),integrerRandom(12,15)*10)
  circle(integrerRandom(100,800),integrerRandom(600,800),integrerRandom(7,10)*10)


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
