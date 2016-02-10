
module.exports = {
  entry: {
    app: ['./dev/app.js']
  },
  output: {
    path: __dirname,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js|\.jsx/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dev',
    host: 'localhost',
    port: 9000
  },
  devtool: 'eval',
  debug: true
}
