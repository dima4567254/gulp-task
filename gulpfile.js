
const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
// const svgSprite = require('./index.js');
const svgSprite = require('gulp-svg-sprite');


// gulp-svg-sprite
// const { src, dest, parallel } = require('gulp');

const svgspriteConfig = {
    mode: {
        // css: {
        //     render: {
        //         css: true

        //     }
        // }
        stack: {
            sprite: '../icons.svg',
            example: true
        }
    }

};

function icondel() {
    return del('app/images/icons/**/*.svg')
}

function buildSvg() {
    return src('app/images/icons/**/*.svg')
        .pipe(svgSprite(svgspriteConfig))
        .pipe(dest('app/images/sprite'));
    // .pipe(cleanDist('app/images/icons/**/*.svg'));



}
// app/images/
// .pipe(dest('tmp/gulp'));
// exports.default = parallel(buildSvg);



function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false

    })

}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}


function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        /*'node_modules/swiper/swiper-bundle.min.js.map',
        'node_modules/slick-carousel/slick/slick.js',
         'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
                    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
                    'node_modules/mixitup/dist/mixitup.js',
                    'node_modules/rateyo/src/jquery.rateyo.js',                    
                    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
                    'node_modules/swiper/swiper-bundle.js,*/
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                },
                {
                    cleanupIDs: false
                }
                ]
            })

        ]))
        .pipe(dest('dist/images'))

}


function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'

    ], {
        base: 'app'
    })
        .pipe(dest('dist'))
}



function cleanDist() {
    return del('dist')
}




function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

// exports.default = parallel(buildSvg);

// icondel
// !!!

// exports.gule = parallel(buildSvg);

// exports. gule = (buildSvg);



// gulp.task('my-custom-task', function () {
//     myCustomFunction('foo', 'bar');
// });






// function gule(cb) {
//     console.log(obj1 );
//   cb();
// }

// ----------------------------------------------------
// вызов функции отдельно
const { task } = require('gulp');
task(gule);

function gule() {
    return src('app/images/icons/**/*.svg')
        .pipe(svgSprite(svgspriteConfig))
        .pipe(dest('app/images/sprite'));
}
// ----------------------------------------------------

const fonter = require('gulp-fonter');


task(fonts);

function fonts() {
    // return gulp
    // .src('app/fonts/*')
    return src('app/fonts/*')
        .pipe(fonter({
            subset: [66, 67, 68, 69, 70, 71],
            formats: ['woff', 'ttf']
        }))
        // .pipe(gulp.dest('app/fonts'));
        .pipe(dest('app/fonts'));
}
// gulp.task('fonts', () => {
// });


// gulp.task('ttf2woff', function () {

// });
// ----------------------------------------------------
// const ttf2woff2 = series('gulp-ttf2woff2');
// пример новой задачи
// ----------------------------------------------------

// function convert4() {
//     .pipe(convert1({

//     }))
//     .pipe(convert2({

//     }))
// }



const ttf2woff2 = require('gulp-ttf2woff2');

task(convert);

function convert() {
    // gulp.src(['fonts/*.ttf'])
    return src('app/fonts/*')
        .pipe(ttf2woff())
        // .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
    // .pipe('app/fonts/*')
    // .pipe(ttf2woff2())
    // .pipe(dest('app/fonts'));
}
// ----------------------------------------------------
const ttf2woff = require('gulp-ttf2woff');

task(convert2);

function convert2() {
    // gulp.src(['fonts/*.ttf'])
    return src('app/fonts/*')
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

// task(convert3);

// function convert3() {
//     .pipe(ttf2woff())
//     .pipe(ttf2woff2());
// }

// ----------------------------------------------------
// 
//проверяем существуют ли файлы шрифтов
//     fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
//         if (fontsFiles) {
//             //проверяем существует ли файл стилей для подключения шрифтов
//             if (!fs.existsSync(fontsFile)) {
//                 /*ТУТ*/
//                 //если файла нет создаем его
//                 fs.writeFile(fontsFile, '', cb);
//                 let newFileOnly;
//                 for (var i = 0; i < fontsFiles.length; i++) {
//                     //записываем подключения шрифтов в файл стилей 
//                     let fontFileName = fontsFiles[i].split('.')[0];
//                     if (newFileOnly !== fontFileName) {
//                         let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
//                         let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
//                         if (fontWeight.toLowerCase() === 'thin') {
//                             fontWeight = 100;
//                         } else if (fontWeight.toLowerCase() === 'extralight') {
//                             fontWeight = 200;
//                         } else if (fontWeight.toLowerCase() === 'light') {
//                             fontWeight = 300;
//                         } else if (fontWeight.toLowerCase() === 'medium') {
//                             fontWeight = 500;
//                         } else if (fontWeight.toLowerCase() === 'semibold') {
//                             fontWeight = 600;
//                         } else if (fontWeight.toLowerCase() === 'bold') {
//                             fontWeight = 700;
//                         } else if (fontWeight.toLowerCase() === 'extrabold') {
//                             fontWeight = 800;
//                         } else if (fontWeight.toLowerCase() === 'black') {
//                             fontWeight = 900;
//                         } else {
//                             fontWeight = 400;
//                         }
//                         fs.appendFile(fontsFile, `@font-face {\n\tfont-famaly: ${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");font-weight:${fontWeight};\n\tfont-style:normal;\n;}\r\n`, cb);
//                         newFileOnly = fontFileName;
//                     }
//                 }
//             } else {
//                 //если есть файл,выводим сообщение
//                 console.log("файл scss/fonts.scss уже существует. Для обновления нужноно его удалить")
//             }
//         }
//     });
// }
// ----------------------------------------------------

// task(reed);

// function reed() {
//     fs.ensureFile(file, err => {
//         console.log(err) // => null
//         // file has now been created, including the directory it is to be placed in
//     })
// }

const fs = require('fs-extra')

// const fontsFile = 'app/_fonts.scss'

// task(convert3);

// function convert3() {
//     // ----------------------------------------------------
//     // With a callback:
//     fs.ensureFile(file, err => {
//         console.log(err) // => null
//         // file has now been created, including the directory it is to be placed in
//     })
// }

task(convert4);
function convert4() {
    // if (file) {
    //     console.log("файл есть")
    // } else {
    //     //если есть файл,выводим сообщение
    //     console.log("файл scss/fonts.scss уже существует. Для обновления нужноно его удалить")
    // }
    // fontsFiles = file
    // let fontsFile = `app/_fonts.scss`;
    // let fontsFile = `${.srcFolder}app/_fonts.scss`;
    // получаемв переменыупуть к файлу

    fs.access("app/_fonts.scss", function (error) {
        // if (error) {
        //     console.log("Файл не найден");
        //     fs.ensureFile(file, err => {
        //         console.log(err) // => null
        //         // file has now been created, including the directory it is to be placed in
        //     })
        // } else {
        //     console.log("Файл найден");
        if (!fs.existsSync(fontsFile)) {
            fs.writeFile(fontsFile, '', cb);
            // верх создант файл
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                    if (fontWeight.toLowerCase() === 'thin') {
                        fontWeight = 100;
                    } else if (fontWeight.toLowerCase() === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight.toLowerCase() === 'light') {
                        fontWeight = 300;
                    } else if (fontWeight.toLowerCase() === 'medium') {
                        fontWeight = 500;
                    } else if (fontWeight.toLowerCase() === 'semibold') {
                        fontWeight = 600;
                    } else if (fontWeight.toLowerCase() === 'bold') {
                        fontWeight = 700;
                    } else if (fontWeight.toLowerCase() === 'extrabold') {
                        fontWeight = 800;
                    } else if (fontWeight.toLowerCase() === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }
                    fs.appendFile(fontsFile, `@font-face {\n\tfont-famaly: ${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");font-weight:${fontWeight};\n\tfont-style:normal;\n;}\r\n`, cb);
                    newFileOnly = fontFileName;
                    console.log("работает");
                }
            }
        }
        // }
    });
    // pipe(dest(`${srcFolder}/fonts/`))
    // return src(`app/_fonts.scss`);
    // return src(`${srcFolder}`);

    function cb() { }
}
// ./src'
const fontsFile = 'app/_fonts.scss'
const srcFolder = 'app/fonts';
const length = 1;
// папка с исходниками

task(convert5);
function convert5() {

    // let fontsFile = `${srcFolder}app/_fonts.scss`
    // let fontsFile = `${app.path.srcFolder}/sscss/fonts.scss`;
    console.log("1")
    fs.readdir(srcFolder, function (err, fontsFiles) {
        // !!!возможно ошибка
        console.log("1.2")
        // if (fontsFiles) {
        console.log("2")
        //проверяем существует ли файл стилей для подключения шрифтов
        if (!fs.existsSync(fontsFile)) {
            console.log("3")
            /*ТУТ*/
            //если файла нет создаем его
            fs.writeFile(fontsFile, '', cb);
            console.log("4")
            let newFileOnly;

            // !!!потом удалить лет переменныю
            for (var i = 0; i < fontsFiles.length; i++) {
                console.log("5")
                //записываем подключения шрифтов в файл стилей 
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                    console.log("6")
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                    if (fontWeight.toLowerCase() === 'thin') {
                        fontWeight = 100;
                    } else if (fontWeight.toLowerCase() === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight.toLowerCase() === 'light') {
                        fontWeight = 300;
                    } else if (fontWeight.toLowerCase() === 'medium') {
                        fontWeight = 500;
                    } else if (fontWeight.toLowerCase() === 'semibold') {
                        fontWeight = 600;
                    } else if (fontWeight.toLowerCase() === 'bold') {
                        fontWeight = 700;
                    } else if (fontWeight.toLowerCase() === 'extrabold') {
                        fontWeight = 800;
                    } else if (fontWeight.toLowerCase() === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }
                    fs.appendFile(fontsFile, `@font-face {\n\tfont-family: '${fontName}';\n\tfont-weight:${fontWeight};\n\tfont-style:normal;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-display:swap;\n}\r\n`, cb);
                    newFileOnly = fontFileName;
                    
                }
            }
        } else {
            //если есть файл,выводим сообщение
            console.log("файл scss/fonts.scss уже существует. Для обновления нужноно его удалить")
        }
        // }
    });
    return src(`${srcFolder}`);
    // return app.gulp.src(`${app.path.srcFolder}`);
    // возможно ошибка
    // return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}
// 


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build, buildSvg);
//
exports.default = parallel(styles, scripts, browsersync, watching, buildSvg, convert, convert2, convert5);

// const fs = require('fs');

// Get the file contents before the append operation



    // ----------------------------------------------------
    // записывает текст в файл
    // fs.outputFile(file, '@font-face', err => {
    //     console.log(err) // => null


    // })

    // ----------------------------------------------------

    // Import the filesystem module
    // const fs = require('fs');

    // Get the file contents before the append operation
    // console.log("\nFile Contents of file before append:",
    //     fs.readFileSync("app/_fonts.scss", "utf8"));

    // let  fontName = 'fontName';
    // let  fontFileName = 'fontFileName';
    // let  fontWeight = 'fontWeight';

    // fs.appendFile(fontsFile, `@font-face {\n\tfont-famaly: ${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");font-weight:${fontWeight};\n\tfont-style:normal;\n;}\r\n`, cb);

    // fs.appendFile(`hello`, cb);
    // newFileOnly = fontFileName;
    //                         newFileOnly = fontFileName;
    //                     }
    // ----------------------------------------------------



    // fs.appendFile("app/_fonts.scss", `@font-face {\n\tfont-famaly: {fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/{fontFileName}.woff2") format("woff2"), url("../fonts/{fontFileName}.woff") format("woff");font-weight:{fontWeight};\n\tfont-style:normal;\n;}\r\n`, () => {

    // });


// task(convert5);

// function convert5() {
//     fs.appendFile(`@font-face {\n\tfont-famaly: {fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/{fontFileName}.woff2") format("woff2"), url("../fonts/{fontFileName}.woff") format("woff");font-weight:{fontWeight};\n\tfont-style:normal;\n;}\r\n`, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // Get the file contents after the append operation
//             console.log("\nFile Contents of file after append:",
//                 fs.readFileSync("app/_fonts.scss", "utf8"));
//         }
//     });
// }



