var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");

gulp.task("sass", function() {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(concat("style.css"))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest("./src"))
});

gulp.task("watch", ["sass"], function() {
    gulp.watch("./src/sass/*.scss", ["sass"]);
});
