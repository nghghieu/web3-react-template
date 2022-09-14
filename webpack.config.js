const { SourceMapDevToolPlugin } = require("webpack");

plugins: [
  new SourceMapDevToolPlugin({
    filename: "[file].map"
  }),
...
],
