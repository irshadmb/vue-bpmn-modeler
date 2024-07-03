const { defineConfig } = require('@vue/cli-service');


module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.bpmn$/,
          use: 'raw-loader'
        },
        {
          test: /\.less$/,
          use: [
            'less-loader'   // compiles Less to CSS
          ],
        }
      ]
    }
  }
});
