/* eslint-disable @typescript-eslint/no-explicit-any */
module.exports = {
  webpack: (config:any) => {
    config.module.rules.push({
      test: /\.(ttf|otf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      },
    });
    return config;
  },
};