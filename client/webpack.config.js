const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //creates HTML and injects bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      //injects custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      //creates manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "JATE in PWA",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        start_url: "/",
        publicPath: "/",
        display: "standalone",
        crossorigin: "use-credentials",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
