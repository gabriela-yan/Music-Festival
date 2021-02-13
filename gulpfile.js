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

const paths = {
    images: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
}

/**
 * css.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 8th, 2021.
 * @global
 * @return	
 * @description Compiled code from the src/scss/app.scss file to build/css/app.css file
 */
function css( ) {
    return src(paths.scss)
        .pipe(sass())
        .pipe(dest('./build/css'))
}
/**
 * minifyCSS.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 8th, 2021.
 * @global
 * @return	
 * @description Minify the code in the app.css file
 */
function minifycss(){
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
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
    /*  * = Current folder, ** = All files with that extension  */
    watch(paths.scss, css);
}

exports.css = css;
exports.minifycss = minifycss;
exports.imagesMin = imagesMin;
exports.watchFiles = watchFiles;

exports.default = series(imagesMin, versionWebp, watchFiles);