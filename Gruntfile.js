module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/**/*.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['client/**/*.js', 'server/public/assets/styles/sass/*.scss', 'server/public/assets/styles/sass/**/*.scss'],
                tasks: ['uglify', 'sass'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "angular-route/angular-route.min.js"
                ],
                "dest": "server/public/vendors/"
            }
        },
        sass: {
            dist: {
                options: {
                    // sourceMap: auto
                },
                files: {
                    'server/public/assets/styles/main.css': 'server/public/assets/styles/sass/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'sass', 'uglify']);

};
