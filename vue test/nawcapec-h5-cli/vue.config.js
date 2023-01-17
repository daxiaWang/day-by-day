"use strict";
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const pwdStr = __filename;
const folderArr = pwdStr.split("\\");
const folderName = folderArr[folderArr.length - 2];
const isProduction = process.env.NODE_ENV === 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getPlugins() {
  let plugins = [];
  if (process.env.NODE_ENV === "production") {
    plugins.push(
      // 添加插件
      new FileManagerPlugin({
        events: {
          onEnd: {
            delete: [`./${folderName}.zip`],
            archive: [
              {
                source: `./${folderName}`,
                destination: `./${folderName}.zip`,
              },
            ],
          },
        },
      })
    );
    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false, // 去掉注释
          },
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']//移除console
          }
        }
      })
    )
  }
  return plugins;
}
module.exports = {
  publicPath: "./",
  outputDir: `${folderName}/${folderName}`,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://192.168.112.6:8060",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: getPlugins(),
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // config.plugin("html").tap((args) => {
    //   args[0].title = "政企移动应用模板";
    //   return args;
    // });
  },
};
