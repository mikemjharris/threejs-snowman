var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('./public/stylesheets/canvas_game.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('js', function () {
  return gulp.src([
    './public/javascripts/snowman.js',
    './public/javascripts/arena.js',
    './public/javascripts/tree.js',
    './public/javascripts/forest.js',
    './public/javascripts/snow.js',
    './public/javascripts/mammal-cube.js',
    './public/javascripts/explosion.js',
    './public/javascripts/snowball.js',
    './public/javascripts/player.js',
    './public/javascripts/camera.js',
    './public/javascripts/game.js',
    './public/javascripts/snowman_game.js',
  ])
  .pipe(concat('snowman-game.js'))
  .pipe(gulp.dest('./public/dist/'));
});

gulp.task('build-all',gulp.parallel('sass','js'))

gulp.task('watch', gulp.series('sass', 'js'), function () {
  gulp.watch('./public/stylesheets/*', ['sass']);
  gulp.watch('./public/javascripts/*', ['js']);
});
