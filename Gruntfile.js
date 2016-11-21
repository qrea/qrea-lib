module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      base: {
        src: ['./src/index.ts', './src/**/*.ts'],
        // dest: './dist/<%= pkg.name %>.js',
        options: {
          removeComments: true,
          module: 'commonjs',
          target: 'es5',
          sourceMap: true,
          declaration: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    mochaTest: {
        test: {
            options: {
                reporter: 'spec',
                // captureFile: 'results.txt', // Optionally capture the reporter output to a file
                quiet: false, // Optionally suppress output to standard out (defaults to false)
                clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
        }
    }
  });

  // Load grunt-typescript
  grunt.loadNpmTasks('grunt-typescript');

  // Load uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // add the copy feature
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['typescript', 'uglify', 'mochaTest']);
  
};
