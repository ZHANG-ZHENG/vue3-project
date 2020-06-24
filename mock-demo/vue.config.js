const mockIndexData = require("./mock/index.json");
const mockIndexData2 = require("./mock/index2.json");
 
module.exports = {
  //...  
  devServer: {
    port: 8080,
    before(app) {
      app.get("/service-user/authUser/getToken", (req, res) => {
        console.log("before");
        res.json(mockIndexData);
      });
      app.post("/service-user/authUser/getToken2", (req, res) => {
        console.log("before2");
        res.json(mockIndexData2);
      });      
    },
    // proxy:{
    //   'service-user':{//配置跨域的名字
    //     target:'http//db.zhost.top/service-user',//跨域的地址
    //     //target:'http://192.168.21.18:8081/service-user',//跨域的地址
    //     ws:true,
    //     changOrigin:true,//是否跨域
    //     pathRewrite:{//当前的名字
    //       '^/service-user':''
    //     }
    //   }
    // },
  }
};