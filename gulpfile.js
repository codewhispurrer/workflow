// Require() is built into Node.js and used to load modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

// var coffeeSources = ['components/coffee/*.coffee'];
// Use an array in case you need to add additional files later
// or the asterisk to specify all files of a specific type
var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
  // array of paths to all of the js documents
  // order of concatenation = order of array elements
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
]

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
    .pipe(gulp.dest('builds/development/js'))
})
