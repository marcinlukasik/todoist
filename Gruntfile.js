module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'index.html': ['public/templates/**/*.pug']
                }
            }
        },

        concat: {
            dist: {
                files: {
                    'dist/js/app.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/mustache/mustache.js',
                        'public/js/app/config.js',
                        'public/js/app/models/*.js',
                        'public/js/app/collections/*.js',
                        'public/js/app/views/*.js',
                        'public/js/app/router.js',
                        'public/js/app/main.js'
                    ]
                }
            }
        },

        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: '*.js',
                        dest: 'dist/js/'
                    }
                ]
            }
        },

        sass: {
            dev: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                src: 'public/sass/*.sass',
                dest: 'public/css/main.css'
            }
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 10 versions', 'ie 8', 'ie 9'],
                    map: true
                },
                files:{
                    'public/css/main.css': 'css/main.css'
                }
            }
        },

        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: ['public/**/*.sass', 'public/**/*.scss', 'public/**/*.pug', 'public/**/*.js'],
                tasks: ['compile']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'public/css/*.css',
                        'dist/js/*.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './',
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('compile', ['pug:compile', 'sass', 'autoprefixer', 'concat', 'uglify']);
    grunt.registerTask('dev', ['browserSync:dev', 'watch:dev']);
};
