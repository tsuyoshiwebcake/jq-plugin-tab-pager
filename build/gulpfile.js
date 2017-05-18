var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var pug = require('gulp-pug');
var plumber = require("gulp-plumber");

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "../"
    }
  });
});

gulp.task("sass", function() {
  gulp.src("scss/**/*.scss")
      .pipe(plumber())
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest("../css"))
      .pipe(browser.reload({stream:true}));
});

gulp.task("js", function() {
  gulp.src(["js/**/*.js","!js/min/**/*.js"])
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest("../js"))
      .pipe(browser.reload({stream:true}));
});

gulp.task('pug', function() {
  gulp.src(['./pug/*.pug', '!./pug/_*.pug'])
      .pipe(plumber())
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('../'))
      .pipe(browser.reload({stream:true}));
});

gulp.task("default",['server'], function() {
  gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
  gulp.watch("scss/**/*.scss",["sass"]);
  gulp.watch(['./pug/*.pug', '!./pug/_*.pug'],["pug"]);
});
