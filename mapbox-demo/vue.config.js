module.exports = {
  publicPath:'./',//根路径
  //outputDir:'web-manage',//打包的时候生成的一个文件名


  devServer: {
    port: 8081,
    proxy: { // 设置代理
      '/resources': {
        target: 'http://db.zhost.top/',
        changeOrigin: true,
        pathRewrite: {
          '^/resources': '/resources'
        }
      },
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
// module.exports = {
//   devServer: {
//     port: 8081,
//     // 设置代理
//     proxy: {
//         "/resources": {
//             // 本地地址
//             target: "http://db.zhost.top/resources",
//             pathRewrite: { "^/resources": "" },
//             ws: false,
//             changeOrigin: true,
//         },
//     },    
//   }
// };


