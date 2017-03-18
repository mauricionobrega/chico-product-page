var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');

// CLEAR
gulp.task('clear', function () {
  return del.sync('dist');
});

// COPY CHICO ASSETS
gulp.task('copy', function() {
  return gulp.src(['bower_components/chico/dist/assets/**/*'])
    .pipe(gulp.dest('dist/assets'))
})

// SASS
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      debug: true
    }, function(details) {
      console.log(details.name, ': ', details.stats.originalSize, 'b -> ', details.stats.minifiedSize, 'b');
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));
});

// SCRIPTS
var scripts = [
  'bower_components/tiny.js/dist/tiny.js',
  'bower_components/chico/dist/ui/chico.js',
  'src/js/**/*.js'
];
gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// MINIFY HTML
gulp.task('minifyHTML', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// WATCH FILES
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['minifyHTML']);
});

// WEBSERVER
gulp.task('webserver', function() {
  gulp.src('dist').pipe(webserver({
    livereload: false,
    open: false
  }));
});

// TASK DEV
gulp.task('dev', function (done) {
  runSequence('clear', ['copy', 'sass', 'js', 'minifyHTML', 'watch'], 'webserver', done);
});

// TASK BUILD
gulp.task('build', ['dev']);

// DEFAULT TASK: RUN THE DEV
gulp.task('default', ['dev']);
