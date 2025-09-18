const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');

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

gulp.task('sass', function() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
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
  gulp.watch('./src/**/*.html', gulp.parallel('fileInclude'))
});

gulp.task('default',
  gulp.series ('clean',
    gulp.parallel ('sass', 'fileInclude'),
    gulp.parallel('startServer', 'watch')));

