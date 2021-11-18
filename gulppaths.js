module.exports = {
  src: {
    base: 'src',
    markup: 'src/**/*.{html,htm,php,md,js}',
    htaccess: 'src/.htaccess',
    scripts: 'src/assets/js/**/*.js',
    vendor: ['node_modules/p5/lib/p5.min.js', 'node_modules/p5.pattern/p5.pattern.js'],
    styles: 'src/assets/scss/**/*.scss',
    fonts: 'src/assets/fonts/**/*.{otf,ttf,svg,eot,woff,woff2}',
    images: 'src/assets/images/**/*.{jpg,png,gif,jpeg,svg}',
    social: 'src/assets/social/**/*.jpg',
    docs: 'src/assets/docs/**/*.{pdf,xls,xlsx,doc,docx}',
    icons: 'src/assets/icons/'
  },

  dev: {
    base: 'dev',
    markup: 'dev',
    scripts: 'dev/js',
    styles: 'dev/css',
    fonts: 'dev/fonts',
    images: 'dev/images',
    docs: 'dev/docs',
    icons: 'dev'
  },

  dist: {
    base: 'dist',
    markup: 'dist',
    scripts: 'dist/js',
    styles: 'dist/css',
    fonts: 'dist/fonts',
    images: 'dist/images',
    docs: 'dist/docs',
    icons: 'dist'
  }
}
