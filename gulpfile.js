var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror');
  babel = require("gulp-babel");


  //gulp babel tast
  var input ='./js/*.js';
  var output ='./js/transpiled';

  gulp.task("babel", () => {
    return gulp.src(input)
      .pipe(babel())
      .pipe(gulp.dest(output));
  });

  //gulp task

gulp.task('sass', function(){
  return gulp.src('./scss/style.scss')
  .pipe(sass())
  .pipe(prettyError())
  .pipe(
    autoprefixer({
      browsers: ['last 2 versions']
    })
  )
  .pipe(gulp.dest('./build/css'))
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', function () {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./build/js'))
});

// gulp.task('say_hello', function (done) {
//   console.log('Hello!');
//   done();
// });

gulp.task('watch', function () {
  gulp.watch('scss/*.scss', gulp.series('sass'));
  gulp.watch('js/*.js', gulp.series(['babel','scripts']));
});

//gulp browse sync task
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });


  gulp.watch(['*.html','build/css/*.css','build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['./js/transpiled/*.js'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
});

gulp.task('scripts', gulp.series('lint',function(){
  return gulp.src('./js/transpiled/*.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js'}))
  .pipe(gulp.dest('./build/js'))
}))


// Modify our default task method by passing an array of task names
gulp.task('default', gulp.parallel('watch', 'browser-sync'));

// gulp.task('default', function () {
//   gulp.src('./js/*.js')
//     .pipe(uglify()) //call uglify function on files
//     .pipe(rename({
//       extname: '.min.js'
//     })) //rename the now ugly file
//     .pipe(gulp.dest('./build/js'))


// });