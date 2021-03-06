/// <binding AfterBuild='minify' />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

var destPath = './wwwroot/ng-dependencies/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task("ngDependencies", () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap.*js'            
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/ng-dependencies"));
});

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('ts', function (done) {
    var tsResult = gulp.src([
            "ng-app/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/ng-sources'));
});

gulp.task("minify", () => {
    gulp.src(['wwwroot/ng-sources/*.js', 'wwwroot/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/lib/_app'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('ng-app/*.ts', ['ts']);
});

gulp.task('default', ['ngDependencies', 'watch']);