module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      src : ['js/engine/input.js'],
      options : {
        specs : ['specs/input.js'],
        template: require('grunt-template-jasmine-requirejs')
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'js/**/*.js',
        'specs/**/*.js'
      ]
    },
    githooks: {
      all: {
        'pre-commit': 'test'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-githooks');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  grunt.registerTask('default', ['test']);
};