module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      "test" : {
            options: {
                module : "commonjs",
                sourceMap: true,
                declaration: true,
                target: 'ES5'
            },
            files: [{
                dest: "test/",
                src: [
                    "src/**/*.test.ts",
                    "src/**/*.test.d.ts"
                ]
            }]
        },
      "base": {
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
    clean: {
        test : [
            "test"
        ]
    },
    mochaTest: {
        test: {
            options: {
                reporter: 'spec',
                captureFile: 'results.txt' // Optionally capture the reporter output to a file
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

  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", ["clean:test",
                                "typescript:test",
                                "mochaTest:test"]);

  // Default task(s).
  grunt.registerTask('default', ['typescript', 'uglify', 'mochaTest']);
  
};
