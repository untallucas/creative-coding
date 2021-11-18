// TO EXECUTE
// yarn install
// yarn start 
// yarn build
// yarn reset


// PROJECT VARIABLES
var appName = 'App Test App'
var appKeywords = 'test,app,application'
var appDescription = 'This is a test app, just to demonstrate that this builder works fine'
var appColor = '#333333'
var appTwitter = '@apptestapp'
var appUrl = 'https://www.apptestapp.com'
var appLanguage = 'English'

var appAuthor = 'Lucas Di Mattia'
var appAuthorTwitter = '@untallucas'
var appAuthorLocation = 'Córdoba, Argentina'

var appAnalyticsId = 'G-12345678'


// MODULES IMPORT
const gulp = require('gulp')
const paths = require('./gulppaths')

const del = require('del')
const browserSync = require('browser-sync').create()
const flags = require('minimist')(process.argv.slice(1))
const chalk = require('chalk')
const changed = require('gulp-changed')
const concat = require('gulp-concat')
const file = require('gulp-file')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

const imagemin = require('gulp-imagemin')
const resize = require('gulp-images-resizer')
const ico = require('gulp-to-ico')

const prefix = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')


// GET ENVIRONMENT FLAG
var isProduction = 
  flags.production || 
  flags.prod || 
  flags.deploy || 
  flags.dist || 
  flags.build || 
  false


// CLEAN WORK FOLDER
gulp.task('main:clean', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return del(targetFolder, { force:true })
})


// MARKUP
gulp.task('main:markup', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(replace('##appName##', appName))
    .pipe(replace('##appKeywords##', appKeywords + ',' + appKeywords.toUpperCase()))
    .pipe(replace('##appDescription##', appDescription))
    .pipe(replace('##appColor##', appColor))
    .pipe(replace('##appTwitter##', appTwitter))
    .pipe(replace('##appUrl##', appUrl))
    .pipe(replace('##appAuthor##', appAuthor))
    .pipe(replace('##appAuthorTwitter##', appAuthorTwitter))
    .pipe(replace('##appAnalyticsId##', appAnalyticsId))
    .pipe(gulp.dest(targetFolder))
})


// STYLES
gulp.task('main:styles', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(prefix())
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.styles))
  } else {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.styles))
  }
})


// SCRIPTS
gulp.task('main:scripts', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.scripts))
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.scripts))
  }
})


// IMAGES
gulp.task('main:images', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(changed(paths.dist.images))
      .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({ 
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ] 
        })
      ]))
      .pipe(gulp.dest(paths.dist.images))
  } else {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(gulp.dest(paths.dev.images))
  }
})


// SOCIAL
gulp.task('main:social', function () {
  return gulp
    .src(paths.src.social)
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true })
    ]))
    .pipe(gulp.dest(paths.dist.base))
})


// FONTS
gulp.task('main:fonts', function () {
  var targetFolder = isProduction ? paths.dist.fonts : paths.dev.fonts
  return gulp
    .src(paths.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// DOCS
gulp.task('main:docs', function () {
  var targetFolder = isProduction ? paths.dist.docs : paths.dev.docs
  return gulp
    .src(paths.src.docs)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// HTACCESS
gulp.task('main:htaccess', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.htaccess, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// CREATE FILES
gulp.task('create:robotsTxt', function () {
  var fileContent = 'User-agent: *\nAllow: /'
  return gulp
    .src(paths.src.scripts)
    .pipe(file('robots.txt', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:humansTxt', function () {
  var currentDate = new Date()
  var fileContent = 
    '/* TEAM */' + '\n' +
    'Developer: ' + appAuthor + '\n' +
    'Twitter: ' + appAuthorTwitter + '\n' +
    'From: ' + appAuthorLocation + '\n\n' + 
    '/* SITE */' + '\n' +
    'Last update: ' + currentDate + '\n' + 
    'Language: ' + appLanguage
  return gulp
    .src(paths.src.scripts)
    .pipe(file('humans.txt', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:readmeMd', function () {
  var currentDate = new Date()
  var fileContent = 
    '# ' + appName + '  ' + '\n' +
    '## ' + appDescription + '  ' + '\n' +
    '&nbsp;  ' + '\n' +
    '### TEAM  ' + '\n' +
    'Developer: ' + appAuthor + '  ' + '\n' +
    'Twitter: ' + appAuthorTwitter + '  ' + '\n' +
    'From: ' + appAuthorLocation + '  ' + '\n' +
    '&nbsp;  ' + '\n' +
    '### SITE  ' + '\n' +
    'Last update: ' + currentDate + '  ' + '\n' +
    'Language: ' + appLanguage
  return gulp
    .src(paths.src.scripts)
    .pipe(file('readme.md', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:createFiles', gulp.series('create:robotsTxt', 'create:humansTxt', 'create:readmeMd'))


// FAVICONS
gulp.task('icons:png', async function () {
  var iconVariants = [
    { size: 64, filename: 'favicon' },
    { size: 180, filename: 'apple-touch-icon' },
    { size: 192, filename: 'icon-192' },
    { size: 512, filename: 'icon-512' }
  ]
  return iconVariants.forEach(function (icons) {
    gulp.src(paths.src.icons + 'favicon.png')
      .pipe(resize({
        width: icons.size,
        height: icons.size,
        format: '.png'
      }))
      .pipe(imagemin([
        imagemin.optipng({ optimizationLevel: 5 }),
      ]))
      .pipe(rename(function (path) {
        path.dirname = ''
        path.basename = icons.filename
        path.extname = '.png'
      }))
      .pipe(gulp.dest(paths.dist.base))
  })
})

gulp.task('icons:ico', function () {
  return gulp
    .src(paths.src.icons + 'favicon.png')
    .pipe(ico('favicon.ico', { resize: true, sizes: [16, 24, 32, 64, 128, 256] }))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('icons:svg', function () {
  return gulp
    .src(paths.src.icons + 'favicon.svg')
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.svgo({ 
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ] 
      })
    ]))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('icons:manifest', function () {
  return gulp
    .src(paths.src.icons + 'manifest.json')
    .pipe(plumber())
    .pipe(replace('##appName##', appName))
    .pipe(replace('##appColor##', appColor))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:favicons', gulp.series('icons:png', 'icons:ico', 'icons:svg', 'icons:manifest'))


// RESET
gulp.task('reset', function () {
  return del([paths.dist.base, paths.dev.base])
})


// RELOAD WEB SERVER
gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})


// SUCCESS REPORT TO CONSOLE
gulp.task('report', function (done) {
  console.log(
    chalk.green.bold(
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n' + '\n'
    ) +
    chalk.gray(
      '✅ Markup files copied' + '\n' +
      '✅ Styles minified and optimized' + '\n' +
      '✅ Scripts compiled and minified' + '\n' +
      '✅ Images copied and compressed' + '\n' +
      '✅ Social share assets copied' + '\n' +
      '✅ Font files copied' + '\n' +
      '✅ Documents files copied' + '\n' +
      '✅ Htaccess file created' + '\n' +
      '✅ Favicons and identity assets created' + '\n' +
      '✅ Humans, robots and other files created' + '\n'
    ) +
    chalk.green.bold(
      '\n' + '\n' +
      '✅ SUCCESSFUL BUILD!!!' + '\n' +
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n'
    )
  )
  done()
})


// SERVE
gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
})


// WATCH
gulp.task('watch', function () {
  gulp.watch(paths.src.markup, gulp.series('main:markup', 'reload'))
  gulp.watch(paths.src.styles, gulp.series('main:styles', 'reload'))
  gulp.watch(paths.src.scripts, gulp.series('main:scripts', 'reload'))
  gulp.watch(paths.src.images, gulp.series('main:images', 'reload'))
  gulp.watch(paths.src.fonts, gulp.series('main:fonts', 'reload'))
  gulp.watch(paths.src.docs, gulp.series('main:docs', 'reload'))
})


// CONSTRUCTORS
var generator = 
  gulp.series(
    'main:clean',
    gulp.parallel(
      'main:markup',
      'main:styles',
      'main:scripts',
      'main:images',
      'main:fonts',
      'main:docs',
      'main:htaccess'
    ),
    'serve',
    'watch'
  )

if (isProduction) {
  generator =
    gulp.series(
      'main:clean',
      gulp.parallel(
        'main:markup', 
        'main:styles', 
        'main:scripts', 
        'main:images', 
        'main:social', 
        'main:fonts', 
        'main:docs', 
        'main:htaccess', 
        'main:favicons', 
        'main:createFiles'
      ),
      'report'
    )
}

gulp.task('default', generator)
