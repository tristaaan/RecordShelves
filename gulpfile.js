var gulp   = require('gulp');
var concat = require('gulp-concat');
var less   = require('gulp-less');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var path   = require('path');
var source = require('vinyl-source-stream');
var bowerFiles  = require('main-bower-files');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reload = browserSync.reload;

// Compile LESS
gulp.task('stylesheets', function () {
  gulp.src('./css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));
});

//Compile JS

// Run jshint on the scripts
gulp.task('lint', function () {
  return gulp.src('js/[^bower_components]/[^vendor]*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//vendor
gulp.task('vendor_javascripts', function () {
  return gulp.src(bowerFiles({paths:{
     bowerDirectory: 'js/bower_components',
     bowerJson: 'js/bower.json'
    }}))
    .pipe(filter('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js/'));
});

// Compile the scripts
gulp.task('javascripts', ['lint', 'vendor_javascripts'], function () {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('compiled.js'))
    .pipe(gulp.dest('./js/'));
});

// Build
gulp.task('build', ['javascripts', 'stylesheets']);

gulp.task('reload', function(){
	browserSync.reload();
});

gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./css/*.less', ['stylesheets', 'reload']);
  gulp.watch('./js/**/*.js', ['javascripts', 'reload']);
  gulp.watch(['*.html'], {cwd:'.'}, reload);
});

gulp.task('default', ['build']);

