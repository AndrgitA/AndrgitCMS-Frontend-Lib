const path = require('path');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

const _envJSPath = path.resolve(__dirname, './config/env.js');
const _envJS = require(_envJSPath);

const _packageJSONPath = path.resolve(__dirname, './package.json');
const _packageJSON = require(_packageJSONPath);

module.exports = {
  publicPath: _envJS.publicPath,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: _packageJSON.name,
        filename: "remoteEntry.js",
      //     // exposes: {},
      //     // remotes: {},
      //     // shared: {},
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
  },

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "LIB";
        return args;
      });
  },

  devServer: {
    host: _envJS.host,
    port: _envJS.port,
  }
};