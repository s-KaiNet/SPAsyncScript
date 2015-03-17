module.exports = function (grunt) {

	grunt.initConfig({
		typescript:{
			main: {
				  src: ['source/*.ts'],
				  dest: 'source/output',
				  options: {
					module: "amd",
					target: 'es5', 
					declaration: true
				}	
			}	
		}		
	});

	grunt.registerTask("build", ["typescript:main"]);

	grunt.loadNpmTasks('grunt-typescript');
};