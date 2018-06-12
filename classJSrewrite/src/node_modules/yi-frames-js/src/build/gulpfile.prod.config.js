'use strict';
/*
 code by Mapk Volkov
*/
const gulp=require('gulp');
const sass=require('gulp-sass');
const pug=require('gulp-pug');
const imageMin=require('gulp-smushit');
const notify=require('gulp-notify');
const plumber=require('gulp-plumber');
const rename=require('gulp-rename');
const named=require('vinyl-named');
const webpack=require('webpack-stream');
const postCss=require('gulp-postcss');
const config=require('../config/index');
const postcssrc=require('../config/postcssrc');
const postcssrcOpts=postcssrc.prod;
const assets=require('./gulpfile.base.config');
const webpackProdConfig=require('./webpack.prod.config');
const git=require('gulp-git');

function prod(){
    //gulp styles
    gulp.task('styles',()=>{
        //scss编译css
        return gulp.src(assets.base.scss.src)
            .pipe(plumber())
            .pipe(sass())
        //css优化
            .pipe(postCss(postcssrcOpts))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.scss.dist))
            .pipe(notify({
                message:assets.base.scss.msg.notice
            }));
    });
    //gulp pug
    gulp.task('pug',()=>{
        return gulp.src([assets.base.pug.src,assets.base.pug.utilsrc])
            .pipe(plumber())
            .pipe(pug({
                pretty:config.prod.pretty
            }))
            .pipe(rename(path=>{
                const filename = path.basename.split('_')[1];
                if(!filename){
                    return path;
                }
                path.basename = filename;
                return path;
            }))
            .pipe(gulp.dest(assets.base.pug.dist))
            .pipe(notify({
                message:assets.base.pug.msg.notice
            }));
    });
    //gulp img
    gulp.task('img',()=>{
        return gulp.src(assets.base.img.src)
            .pipe(plumber())
            .pipe(imageMin())
            .pipe(gulp.dest(assets.base.img.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
    });
    //gulp webpack
    gulp.task('webpack',()=>{
        return gulp.src(assets.base.js.src)
            .pipe(plumber())
            .pipe(named())
            .pipe(webpack(webpackProdConfig))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.js.dist))
            .pipe(notify({
                message:assets.base.js.msg.notice
            }));
    });
    gulp.task('build',['styles','pug','img','webpack']);
    //gulp git-hooks
    //git add
    gulp.task('add',()=>{
        return gulp.src('../*')
            .pipe(git.add({args:'.'}));
    });
    //git commit
    gulp.task('commit',()=>{
        return gulp.src('../*')
            .pipe(git.commit(config.prod.git.commitMsg));
    });
    //git push
    gulp.task('pull',()=>{ 
        if(config.prod.git.pushToDevelop){
            config.prod.git.branchName='develop';
        }else if(config.prod.git.pushToRelease){
            config.prod.git.branchName='release';
        }
        git.pull('origin',config.prod.git.branchName,(err)=>{
            console.log(err);
            throw err;
        });
    });
    //git push
    gulp.task('push',()=>{ 
        if(config.prod.git.pushToDevelop){
            config.prod.git.branchName='develop';
        }else if(config.prod.git.pushToRelease){
            config.prod.git.branchName='release';
        }
        git.push('origin',config.prod.git.branchName,(err)=>{
            console.log(err);
            throw err;
        });
    });
    //git all
    gulp.task('gitall',['pull','add','commit','push']);    
}

module.exports=prod;

