let path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main",
  devtool: "inline-source-map",
  output: {
    clean: true,
    library: "ui",
    libraryTarget: "umd",
    filename: "main.js",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
