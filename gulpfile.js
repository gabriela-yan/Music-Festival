/**
 * @fileoverview Task automation gulp file, run in console with the command gulp +function
 * @version	v1.0.0	Monday, February 8th, 2021.
 * @author	Gabriela Yan
 */
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require("gulp-notify");
const webp = require('gulp-webp');
const concat = require('gulp-concat');

/* CSS utilities */
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

/* JS utilities */
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

/*  * = Current folder, ** = All files with that extension  */
const paths = {
    images: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

/**
 * css.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 8th, 2021.
 * @global
 * @return	
 * @description Compiled code from the src/scss/app.scss file to build/css/app.css file,
 * PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use,
 * Cssnano compress the code in the app.css file, 
 * To write external source map files, pass a path relative to the destination to sourcemaps.write()
 */
function css( ) {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))
}
/**
 * javascript.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 15th, 2021.
 * @global
 * @return	mixed
 * @description Trace the code from the src/js/app.js file to build/js/bundle.js file
 */
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/js'))
}
/**
 * imagesmin.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Thursday, February 11th, 2021.
 * @global
 * @return	mixed
 * @description Minify the images in the src/img folder passing them to build/img 
 */
function imagesMin() {
    return src(paths.images)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Minify Image'}));
}
/**
 * versionWebp.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Friday, February 12th, 2021.
 * @global
 * @return	mixed
 * @description Convert images to Webp in the src/img folder passing them to build/img 
 */
function versionWebp() {
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Ready version webp'}))
}
/**
 * watchFiles.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 8th, 2021.
 * @global
 * @return	
 * @description Execute the css function when presenting changes in the app.css file
 */
function watchFiles(){
    watch(paths.scss, css);
    watch(paths.js, javascript);
}

exports.css = css;
exports.imagesMin = imagesMin;
exports.watchFiles = watchFiles;

exports.default = series(css, javascript ,imagesMin, versionWebp, watchFiles);