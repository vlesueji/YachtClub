const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const clean = require('gulp-clean');
const fs = require('fs');

const fileIncludeOptions = {
  prefix: '@@',
  basepath: '@file'
};

gulp.task('clean', function (done){
  if(fs.existsSync('./dist/')) {
    return gulp
    .src('./dist/')
    .pipe(clean())
  };
  done();
});

gulp.task('sass', function() {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('fileInclude', function(){
  return gulp
    .src('./src/index.html')
    .pipe(fileInclude(fileIncludeOptions))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', gulp.series ('clean', gulp.parallel ('sass', 'fileInclude')));

