module.exports = {  
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts-loader'] }
    ]
  }
}