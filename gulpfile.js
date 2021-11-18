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
const concat = require('gulp-concat')
const file = require('gulp-file')
const plumber = require('gulp-plumber')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')


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


// VENDOR SCRIPTS
gulp.task('main:vendor', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.vendor)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.scripts))
  } else {
    return gulp
      .src(paths.src.vendor)
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('vendor.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.scripts))
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
      '✅ Scripts compiled and minified' + '\n' +
      '✅ Htaccess file created' + '\n' +
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
  gulp.watch(paths.src.scripts, gulp.series('main:scripts', 'reload'))
})


// CONSTRUCTORS
var generator = 
  gulp.series(
    'main:clean',
    gulp.parallel(
      'main:markup',
      'main:vendor',
      'main:scripts',
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
        'main:vendor',
        'main:scripts',
        'main:htaccess',
        'main:createFiles'
      ),
      'report'
    )
}

gulp.task('default', generator)
