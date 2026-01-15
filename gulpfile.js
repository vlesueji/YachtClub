const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const cssMin = require('gulp-cssnano');
const rename = require('gulp-rename');

const fileIncludeOptions = {
  prefix: '@@',
  basepath: '@file'
};

const startServerOptions = {
  livereload: true,
  open: true
};

gulp.task('clean', function (done){
  if(fs.existsSync('./dist/')) {
    return gulp
    .src('./dist/')
    .pipe(clean())
  }
  done();
});

gulp.task('copyImages', function (){
  return gulp
    .src('./src/img/**/*', { encoding: false })
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('copyFonts', function (){
  return gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copyJS', function (){
  return gulp
    .src('./src/js/**/*')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssMin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('fileInclude', function(){
  return gulp
    .src('./src/index.html')
    .pipe(fileInclude(fileIncludeOptions))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('startServer', function (){
  return gulp
    .src('./dist/')
    .pipe(server(startServerOptions))
});

gulp.task('watch', function (){
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./src/**/*.html', gulp.parallel('fileInclude'));
  gulp.watch('./src/images/**/*', gulp.parallel('copyImages'));
  gulp.watch('./src/fonts/**/*', gulp.parallel('copyFonts'));
  gulp.watch('./src/js/**/*', gulp.parallel('copyJS'));
});

gulp.task('default',
  gulp.series ('clean',
    gulp.parallel ('sass', 'fileInclude', 'copyImages', 'copyFonts', 'copyJS'),
    gulp.parallel('startServer', 'watch')));

