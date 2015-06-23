// This shows a full config file!
module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		watch : {
			content : {
				files : 'html/*.html',
				tasks : ['newer:htmlmin']
			}, //this live reloads html also

			images : {
				files : ['images/src/*.{png,jpg,gif}'],
				tasks : ['newer:imagemin']
			}, // watch images added to src

			deleting_images : {
				files : ['images/src/*.{png,jpg,gif}'],
				tasks : ['delete_sync:delete_images']
			}, // end of delete sync for images

			scripts : {
				files : ['js/libs/*.js', 'js/custom/*.js'],
				tasks : ['concat', 'uglify'],
				options : {
					spawn : false,
				},
			}, //end of watch scripts

			css : {
				files : ['sass/**/*.scss'],
				tasks : ['sass', 'autoprefixer', 'penthouse'],
				options : {
					spawn : false,
				}
			}, //end of sass watch

		}, //end of watch

		/* ====================================================================================================================================================
		 * ====================================================================================================================================================

		 Tasks

		 ====================================================================================================================================================
		 ====================================================================================================================================================
		 */

		penthouse : {
			extract : {
				outfile : 'css/above-the-fold.css',
				css : 'css/main.css',
				url : 'http://localhost:3000',
				width : 1300,
				height : 1000
			},
		},

		htmlmin : {
			dist : {
				options : {
					removeComments : true,
					collapseWhitespace : true,
					minifyJS: true,
					minifyCSS: true
				},
				files : [{
					expand : true, // Enable dynamic expansion.
					cwd : 'html/', // Src matches are relative to this path.
					src : ['*.html'], // Actual pattern(s) to match.
					dest : './', // Destination path prefix.
					ext : '.html', // Dest filepaths will have this extension.
					extDot : 'first' // Extensions in filenames begin after the first dot
				}]
			}
		},

		delete_sync : {
			delete_images : {
				cwd : 'images/dist',
				src : ['**'],
				syncWith : 'images/src'
			},//end of delete images
		}, // end of delete sync

		imagemin : {
			dynamic : {
				files : [{
					expand : true, // Enable dynamic expansion
					cwd : 'images/src/', // source images (not compressed)
					src : ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest : 'images/dist/' // Destination of compressed files
				}]
			}
		}, //end imagemin

		concat : {
			dist : {
				src : ['js/libs/*.js', 'js/custom/*.js'],
				dest : 'js/build/production.js'
			}
		}, //end concat

		uglify : {
			dist : {
				src : 'js/build/production.js',
				dest : 'js/build/production.min.js'
			}
		}, //end uglify

		sass : {
			dist : {
				options : {
					style : 'compressed', //no need for config.rb
					compass : 'true', //no need to @import compass
					// require : 'sassy-buttons' // plugins if needed!
				},
				files : {
					'css/main.css' : 'sass/main.scss'
				}
			}
		}, //end of sass

		autoprefixer : {

			options : {

				browsers : ['> 5%', 'last 2 version', 'ie 8', 'ie 9']
			},

			dist : {
				files : {
					'css/main.css' : 'css/main.css'
				}

			}
		}, //end of autoprefixer

		browserSync : {
			dev : {
				bsFiles : {
					src : ['css/*.css', 'images/*.*', 'js/build/production.min.js', '*.html']
				},
				options : {
					server : {
						baseDir : "./"

					},
					watchTask : true // < VERY important
				}
			}
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-delete-sync');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-penthouse');

	// define default task
	grunt.registerTask('default', ["browserSync", "watch"]);
};
