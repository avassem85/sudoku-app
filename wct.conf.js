module.exports = {
  verbose: true,
  plugins: {
    local: {
      browsers: ['chrome', 'safari']
    },
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '/src/**/*.js',
        '/src/**/*.html'
      ],
      exclude: [
        '/polymer/polymer.js',
        '/platform/platform.js'
      ]
    }
  },
};
