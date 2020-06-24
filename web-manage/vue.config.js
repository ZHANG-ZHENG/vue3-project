module.exports = {
  publicPath:'./',//根路径
  outputDir:'web-manage',//打包的时候生成的一个文件名


  devServer: {
    port: 8080,
    proxy: { // 设置代理
      '/service-user': {
        target: 'http://db.zhost.top/',
        changeOrigin: true,
        pathRewrite: {
          '^/service-user': '/service-user'
        }
      }
    }
  },
}