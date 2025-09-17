const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', () => gulp.src('./src/scss/main.scss').pipe(sass()).pipe(gulp.dest('./dist/css/')));

