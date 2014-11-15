// var rimraf = require('rimraf');

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./public/stylesheets/canvas_game.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('watch', function () {
  gulp.watch('./public/stylesheets/*', ['sass']);
})


// var gutil = require('gulp-util');
// var flatten = require('gulp-flatten');
// var concat = require('gulp-concat');

// var bowerFiles = require('main-bower-files');

// var streamqueue = require('streamqueue');
// var rename = require('gulp-rename');
// var gulpif = require('gulp-if');
// var uglify = require('gulp-uglifyjs');
// var cssmin = require('gulp-cssmin');

// var ngmin = require('gulp-ngmin');
// var lazypipe = require('lazypipe');

// var environment = gutil.env.type || 'development';
// var fs = require('fs');
// var mocha = require('gulp-mocha');
// var karma = require('gulp-karma');
// var gProtractor = require('gulp-protractor');
// var protractor = gProtractor.protractor;

// gulp.task('setEnvToProd', function () {
//   environment = gutil.env.type || 'production';
// });

// function isProd() {
//   return environment === 'production';
// }

// // Clean all the temp and dist files
// gulp.task('clean', function (cb) {
//   rimraf('./build-temp', function () {
//     rimraf('./dist', cb);
//   });
// });

// // Copy built files to the dist folder
// gulp.task('assets', function () {
//   gulp.src('./public/**/*')
//     .pipe(gulp.dest('./dist/'));
//   gulp.src('./vendor/bower/jquery/jquery.min.js')
//     .pipe(gulp.dest('./dist/'));
// });

// // it copies directly few libraries from bower
// gulp.task('vendor', function () {
//   return gulp.src(
//     bowerFiles({
//       paths: {
//         bowerrc: '../.bowerrc',
//         bowerJson: '../bower.json'
//       },
//       env: 'direct'
//     })
//   )
//   .pipe(flatten())
//   .pipe(gulp.dest('./dist/'));
// });

// function processJsFiles(name, files) {
//   if (isProd()) {
//     return files.pipe(uglify(name + '.min.js', {
//       outSourceMap: true,
//       screwIe8: true,
//       // mangle: false
//     }))
//     .pipe(gulp.dest('./dist/'));
//   } else {
//     return files.pipe(concat(name + '.js'))
//     .pipe(gulp.dest('./dist/'));
//   }
// }

// // it concats files from bower and few custom scripts into lib.js
// gulp.task('lib',['build-primus'], function () {
//   var files = streamqueue({ objectMode: true },
//     gulp.src(
//       bowerFiles({
//         paths: {
//           bowerrc: '../.bowerrc',
//           bowerJson: '../bower.json'
//         },
//         env: 'lib'
//       })
//     ),
//     gulp.src([
//       './vendor/bower/ng-file-upload/angular-file-upload.js',
//       './vendor/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.js',
//       './vendor/inflector/inflector.js',
//       './vendor/bower/angular-raven/angular-raven.js',
//       './build-temp/primus.js'
//     ])
//   );
//   return processJsFiles('lib', files);
// });

// gulp.task('author-lib', function () {
//   // generate author-lib
//   var files = gulp.src('./vendor/mathquill-0.9.3/mathquill.js');
//   return processJsFiles('author-lib', files);
// });

// gulp.task('lib-ie9', function () {
//   // generate lib.ie9.js
//   var files = gulp.src('./vendor/classlist.ie9.js');
//   return processJsFiles('lib.ie9', files);
// });

// gulp.task('app', ['html2js'], function () {
//    // it concats all the application files
//   var files = gulp.src([
//     './build-temp/templates.js',
//     './js/**/init.js',
//     './js/**/*.js',
//     './js/routes.js',
//     './js/app.js',
//   ])
//   .pipe(ngmin());
//   return processJsFiles('app', files);
// });

// // concats all the javascript files
// gulp.task('concat', ['lib', 'author-lib', 'lib-ie9', 'app'], function () {});

// // precompile all html templates into js and merge it
// gulp.task('html2js', function (cb) {
//   gulp.src([
//       './js/**/partials/**/*.html',
//       './vendor/bower/ng-sir-trevor/partials/display.html',
//       './vendor/bower/ng-mm-assessment-engine/src/includes/*.html',
//     ],
//     {
//       base: '..'
//     }
//   ) // it is used to include the entire path in '..' folder to template names
//   .pipe(ngHtml2js({
//     moduleName: 'templates-main',
//     stripPrefix: 'client/'
//   }))
//   .pipe(concat('templates.js'))
//   .pipe(gulp.dest('./build-temp/'))
//   .on('end', function () {
//     // it is needed to run tasks in sequence.
//     cb(null);
//   });
// });

// // lazypipe is used for a delay execution
// var cssminTask = lazypipe()
//   .pipe(cssmin)
//   .pipe(rename, {
//     suffix: '.min'
//   })
//   .pipe(gulp.dest, './dist/styles');

// // generate css file
// gulp.task('sass', function () {
//   gulp.src('./styles/main.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./dist/styles/'))
//     .pipe(gulpif(isProd(), cssminTask()));
// });

// gulp.task('watch', function () {
//   gulp.watch('./public/**', ['assets']);
//   gulp.watch('./js/**/partials/**/*.html', ['html2js', 'app']);
//   gulp.watch('./styles/**/*.scss', ['sass']);

//   gulp.watch('./js/**/*.js', ['app']);

//   gulp.watch('./vendor/bower/ng-mm-*/**/*.js', ['lib']);

// });

// // It builds everything
// gulp.task('build', ['sass', 'assets', 'html2js', 'concat',  'vendor']);

// // It cleans and builds
// gulp.task('clean-build', ['clean'], function () {
//   gulp.start('build');
// });

// // it cleans, builds and watches.
// gulp.task('default', ['clean-build'], function () {
//   gulp.start('watch');
// });

// // it is a production build
// gulp.task('dist', ['setEnvToProd', 'clean-build']);

// // tasks installs and starts a webdriver
// gulp.task('webdriver-update', gProtractor.webdriver_update);
// gulp.task('webdriver-start', ['webdriver-update'], gProtractor.webdriver_standalone);

// // it is a test build
// gulp.task('test', ['clean-build']);

// var primusHelper = require('mm-cache/src/primus-helper')();

// gulp.task('build-primus', function (done) {
//   var primusClientScript = primusHelper.generateClientScript();

//   if (!fs.existsSync('./build-temp/')){
//     fs.mkdirSync('./build-temp/', function(err) {
//       if (err) {
//         console.log('Cannot create build-temp folder', err);
//         throw Error('Primus was not generated!');
//       }
//     });
//   }
//   fs.writeFile('./build-temp/primus.js', primusClientScript, 'utf-8', function (err) {
//     if (err) {
//       console.log('file writing error', err);
//       throw Error('Primus was not generated!');
//     }
//     done();
//   });

// });

// // run
// gulp.task('server-test', function() {
//   return gulp.src('server/tests/unit/**/*Test.js')
//     .pipe(mocha({ reporter: 'spec' }))
//     .on('error', function (err) {
//       console.log(err.toString());
//       this.emit('end');
//     });
// });

// gulp.task('watch-server-test', ['server-test'], function() {
//     gulp.watch(['server/**/*.js', 'server/*.js', '!server/tests/'], ['server-test']);
// });

// // run
// gulp.task('e2e-test', function() {
//   gulp.src(['client/tests/e2e/spec-files/*.js'])
//     .pipe(protractor({
//         configFile: 'client/tests/e2e/protractor_conf.js'
//     }))
//     .on('error', function(e) { console.log(e); });
// });

// gulp.task('watch-e2e-test', [ 'e2e-test'], function() {
//   gulp.watch(['server/**/*.js', 'server/*.js', '!server/tests/', '../**/*.js'], ['e2e-test']);
// });

// gulp.task('unit-test', function () {
//   // Be sure to return the stream
//   return gulp.src(['need some random text here'])
//     .pipe(karma({
//       configFile: 'client/tests/unit/karma.conf.js',
//       action: 'watch'
//     }));
// });

// // To switch environments use the following commands:
// //   gulp clean-build --type production
// //   gulp clean-build --type test
