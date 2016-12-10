var gulp = require('gulp');//引入gulp模块
var uglify = require('gulp-uglify');//开启js压缩
var concat = require('gulp-concat');//开启合并
var cssnano = require('gulp-cssnano');//开启css压缩
var htmlmin = require('gulp-htmlmin');//开启html压缩
var browserSync = require('browser-sync');//引入browser-sync模块
var reload = browserSync.reload;
//gulp合并压缩css并利用browserSync监控变化
gulp.task('styles',function(){
    return gulp.src(['./index.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
})
//gulp合并压缩js并利用browserSync监控变化
gulp.task('scripts',function(){
    return gulp.src(['./index.js', './app.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
})
//gulp合并压缩html并利用browserSync监控变化
gulp.task('html',function(){
    return gulp.src(['./index.html'])
    .pipe(htmlmin({
         collapseWhitespace:true,//压缩HTML
        removeComments:true,//清除HTML注释
        minfyJS:true,//压缩html页面JS
        minfyCSS:true,//压缩html页面CSS
        removeStyleLinkTypeAttrubutes:true,//删除<style>和<link>的
    })).pipe(gulp.dest('./dist')).pipe(browserSync.stream());
})

gulp.task('serve',['styles','scripts'],function(){
    browserSync.init({
        server:'./'
    });
    gulp.watch('./*.css',['styles']);
    gulp.watch('./*.html',['html']);
    gulp.watch('./*.html').on('change',reload);
    gulp.watch('./*.js',['scripts']);
})
gulp.task('default',['serve']);

// //压缩 合并js文件到指定目录
// gulp.task('script', function() {
//    gulp.src(['./index.js', './app.js']) //['index.js','app.js']
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'));
// })

// //压缩 合并 css文件
// gulp.task('style',function(){
//     gulp.src(['./index.css'])
//     .pipe(cssnano())
//     .pipe(gulp.dest('./dist'));
// })

// //压缩 html
// gulp.task('html',function(){
//    gulp.src(['./index.html'])
//     .pipe(htmlmin({
//         collapseWhitespace:true,//压缩HTML
//         removeComments:true,//清除HTML注释
//         minfyJS:true,//压缩html页面JS
//         minfyCSS:true,//压缩html页面CSS
//         removeStyleLinkTypeAttrubutes:true,//删除<style>和<link>的type="text/css"
//     }))
//     .pipe(gulp.dest('./dist'))
//     .pipe(reload({stream:true}));//在需要的地方插入自动刷新命令
// })

// //引入browser-sync模块
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;
// //创建一个静态服务器
// gulp.task('browserSync',['html'],function(){
//     browserSync.init({
//         server:'./dist',//指定网站的根目录
//         files:['./dist/index.html']
//     });
//     gulp.watch(['*.html']).on('change',reload);
// })

// // 创建一个静态服务器
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

// //在原有服务器中代理
// gulp.task('blowser-sync', function() {
//     browserSync.init({
//         proxy:"localhost"  //"你的域名或IP"
//     });
// });

// //注意，要在运行需要运用到blowser-sync的任务前，运行他的启动任务。
// gulp.task('default',['blowser-sync', 'build:css', 'watch']);