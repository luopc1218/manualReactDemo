const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', //   告诉webpack我们的应用程序从哪儿开始以及从哪里开始打包我们的文件。
  mode: 'development', //  告诉webpack我们正在以开发模式运行，这使我们不必在运行开发服务器时添加模式标志。
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      }, //  我们的第一条规则是转换ES6以及JSX语法。test和exclude是用来匹配文件的条件。在这个例子中，它会匹配node_modules和bower_components之外的所有目录。接下来我们要知道webpack上去使用babel来转换我们的js以及jsx文件（test中定义的规则），最后我们告诉webpack使用env中的预设。
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, //  接下来的规则是用来处理css的。因为我们这里并没有用到pre或者post css等高级功能，我们只需要确保加入style-loader以及css-loader到use属性中。css-loader需要依赖style-loader才能工作。
    ],
  }, //  对象定义你导出的javascript模块如何转换以及那些文件要根据给定的rules进行转换。
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
