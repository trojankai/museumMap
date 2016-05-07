var gulp = require ('gulp'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    
    autoprefixer = require('gulp-autoprefixer');

gulp.task ('default', function(){
  gulp.src('src/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});
gulp.task ('scripts', function(){
  gulp.src('src/**/*.css')
  .pipe(cssnano())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist'));
});
// gulp.task('htmlmin', function(){
//   gulp.src('src/**/*.html')
//   .pipe(htmlmin())
//   .pipe(gulp.dest('dist'));
// });
