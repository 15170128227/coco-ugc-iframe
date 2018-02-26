/**
 * Created by Administrator on 2017/8/16.
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

// 编译.styl文件
gulp.task('stylus', function() {
  return gulp.src(['./src/**/*.styl', '!./src/stylus/*.styl'], { base: 'src' })     //该任务针对的文件
    .pipe(stylus()) // 编译
    .pipe(rename({
      extname: '.wxss' // 重写文件名后缀
    }))
    .pipe(gulp.dest('./dist')); // 输出路径
});
gulp.task('copy', function(){
  return gulp.src(['./src/**', '!./src/stylus', '!./src/**/*.styl'], { base: 'src' })     //该任务针对的文件
    .pipe(changed('./dist')) // 判断哪些修改过的文件
    .pipe(gulp.dest('./dist'));     //将会在src/css下生成index.css
});

gulp.task("default", ["stylus", "copy"], function() { //定义默认任务 并让gulp监视文件变化自动执行
  return gulp.watch(['./src/**'], ["stylus", "copy"]);
})


