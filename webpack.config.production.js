const path = require('path')

const clientConfig = {
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', 'src']
  },
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'public', 'assets', 'js'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      }
    ]
  }
}

const serverConfig = {
  target: 'node',
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', 'src']
  },
  entry: path.resolve(__dirname, 'src', 'server', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      }
    ]
  }
}

module.exports = [clientConfig, serverConfig]
