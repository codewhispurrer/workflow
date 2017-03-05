// https://css-tricks.com/gulp-for-beginners/
// https://24ways.org/2013/grunt-is-not-weird-and-hard/

// Require() is built into Node.js and used to load modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'), // for compiling coffeescript
    concat = require('gulp-concat'), // for concatenating js files
    compass = require('gulp-compass'), // compiles sass
    sassLint = require('gulp-sass-lint'), // for sass lint
    browserify = require('gulp-browserify'); // for adding js libraries as dependencies

// COFFEESCRIPT SOURCES
// var coffeeSources = ['components/coffee/*.coffee'];
// Use an array in case you need to add additional files later
// or the asterisk to specify all files of a specific type
var coffeeSources = ['components/coffee/tagline.coffee'];


// JS SOURCES
// array of paths to all of the js documents
// order of concatenation = order of array elements
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

// SASS SOURCES
// array of paths to all of the scss documents
// to process through gulp sass lint
var sassSources = ['components/sass/style.scss'];

// Gulp Task for processing coffeescript
// > gulp coffee
gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

// Gulp Task for concatenating js files
// > gulp js
gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js')) // production js
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
});


// Gulp Task for Sass lint
// > gulp sassLint
gulp.task('sassLint', function(){
  return gulp.src(sassSources)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Gulp Task for Compiling Sass
gulp.task('compass', function(){
  gulp.src(sassSources)
    .pipe(compass({
      // Can create an object here instead of using config.rb
      sass: 'components/sass', // src for sass
      image: 'builds/development/images', // src for imgs
      style: 'nested' // format for output: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css'))
});

// Gulp Task to Run all as dependency tasks
gulp.task('default', ['coffee','js','compass']);
