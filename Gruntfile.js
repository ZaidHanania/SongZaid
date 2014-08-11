module.exports = function(grunt) {

 // Project configuration.
 grunt.initConfig({
 	pkg: grunt.file.readJSON('package.json'),
	sass: {
		dist: {
			files: {
				'dist/main.css' : 'dev/main.scss'
			} 
		}
	},
	jade: {
		release: {
		   options: {
		     data: {
		       debug: false
		     }
		   },
		   files: {
		     "dist/main.html": "dev/index.jade"
		   }
		 }
	},
	stylus: {
		compile: {
		    files: {
		      'dist/main.css': 'dev/main.styl' // 1:1 compile
		    }
		}
  },
	watch: {
		sass: {
			files: ['dev/*.scss'],
			tasks: ['sass', 'autoprefixer']
		},
		jade: {
			files: ['dev/*.jade'],
			tasks: ['jade']
		},
		stylus: {
			files: ['dev/*.styl'],
			tasks: ['stylus']
		},
		options: {
			livereload: true
		}
	},
	autoprefixer: {
		options: {
			browsers: ['last 5 version' ,'ie 7', 'ie 8', 'ie 9']
		},
		no_dest: {
			src: 'main.css'
		}
	},
	connect: {
		server: {
			options: {
				port: 1111,
				base: ''
			}
		}
	}
});

 grunt.loadNpmTasks('grunt-contrib-sass');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-autoprefixer');
 grunt.loadNpmTasks('grunt-contrib-connect');
 grunt.loadNpmTasks('grunt-contrib-jade');
 grunt.loadNpmTasks('grunt-contrib-stylus');

 // Default task(s).
 grunt.registerTask('default', ['connect', 'watch']);
};