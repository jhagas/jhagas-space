const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages({
  output: "export",
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
  },
});
