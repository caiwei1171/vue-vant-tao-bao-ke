const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  // outputDir: "docs",
  // publicPath: process.env.NODE_ENV === "production" ? "/vant-demo/" : "/",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  publicPath:'./',
　outputDir:'dist',//打包后的文件名
　assetsDir:'static'//存放静态文件的文件夹
};