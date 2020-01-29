var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var log = require('fancy-log')
var bs = require('browser-sync').create(); // create a browser sync instance.


gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./dist",
            // directory: true,
            serveStaticOptions: {
                
                extensions: ["html"]
            }
        },
        port: 1337
    });
});


gulp.task('sass', function () {
    
    return gulp.src('./src/assets/scss/*.scss')
                .pipe(sass())
                .on('error', function (err) {

                    // Instead of crashing, simply log the error to the console.
                    console.log(err.toString());

                    // End the event to move to the next stage in the pipe.
                    this.emit('end');
                })
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    // browsers: ['IE 6','Chrome 9', 'Firefox 14'],
                    cascade: false
                }))
                .pipe(gulp.dest('./dist/assets/css'))
                .pipe(bs.reload({stream: true})); // prompts a reload after compilation
});


gulp.task('ejs', function() {

    gulp.src('./src/pages/*.ejs')
        .pipe(ejs({}, {}, {ext: '.html'}))
        .on('error', function(err){

            console.log(err);
            // End the event to move to the next stage in the pipe.
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'))
        .pipe(bs.reload({stream: true}));
});


gulp.task('watch', ['browser-sync'], function () {
    
    // Watch all SASS, and JS files within all directories, and HTML inside this directory.
    gulp.watch("src/assets/scss/*.scss", ['sass']);
    gulp.watch("src/**/**.ejs", ['ejs']);
    gulp.watch("dist/dependencies/*.js").on('change', bs.reload);
});