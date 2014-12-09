var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  gulp.src('./public/stylesheets/canvas_game.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('js', function () {
  gulp.src([
    './public/javascripts/snowman.js',
    './public/javascripts/structures.js',
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

gulp.task('watch', ['sass', 'js'], function () {
  gulp.watch('./public/stylesheets/*', ['sass']);
  gulp.watch('./public/javascripts/*', ['js']);
});
