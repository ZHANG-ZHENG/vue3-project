<template>
    <div class="loginMain">
      <div class="login">
        <div class="message">后台管理系统</div>
        <div id="darkbannerwrap"></div>
        <div id="login-form">
          <input placeholder="用户名" type="text" v-model="username" autocomplete="off">
          <hr class="hr15">
          <input placeholder="密码" type="password" v-model="password" autocomplete="off">
          <hr class="hr15">
          <button style="width: 100%;" @click="login">登录</button>
          <hr class="hr20">
          <a href="login-sms.html">短信登陆</a>
          <span style="color: red">{{info}}</span>
        </div>
        <!-- <img alt="Vue logo" src="/login/bg.png"> -->
      </div>
    </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      "username":"18959296934",
      "password":"e10adc3949ba59abbe56e057f20f883e",
      "info":"",
    }
  },  
  mounted() {
    //this.login();
  },  
  // data:{
  //   "username":"18959296934",
  //   "password":"e10adc3949ba59abbe56e057f20f883e"
  // },
  methods: {
    login(){
      var param = {
        "phone":this.username,
        "password":this.password
      };
      this.$http.post('/service-user/authUser/getToken',param)
      .then(res => {
        console.log(res)   //查询成功返回的值
        this.info = res.data.content
      })
      .catch(error => { console.log(error) })  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    font: 13px/1.5 '微软雅黑', Verdana, Helvetica, Arial, sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -box-sizing: border-box;
    padding:0;
    margin:0;
    list-style:none;
    box-sizing: border-box;
}
a{
    color:#27A9E3;
    text-decoration:none;
    cursor:pointer;
}
.loginMain{
    height:100%;
    width: 100%;
    background:url("../../assets/login/bg.png") no-repeat center;
    background-size:100%;
}
.login{
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;

    /* overflow-x: hidden; */
    box-sizing: border-box;
}
a.logo{
    display: block;
    height: 58px;
    width: 167px;
    margin: 0 auto 30px auto;
    background-size: 167px 42px;
}
.message {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background: #189F92;
    position: relative;
    color: #fff;
    font-size: 16px;
}
#darkbannerwrap {
    /*background: url(/assets/login/aiwrap.png);*/
    background:url("../../assets/login/aiwrap.png") no-repeat center;
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}

input[type=text],
input[type=file],
input[type=password],
input[type=email], select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline:none;
    width:100%;
}
input[type=text]:focus,
input[type=file]:focus,
input[type=password]:focus,
input[type=email]:focus, select:focus {
    border: 1px solid #27A9E3;
}


input[type=submit],
button{
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    color: #ffffff;
    background-color: #189F92;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    outline:none;
    width:100%;
}
hr.hr15 {
    height: 15px;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
}
hr.hr20 {
    height: 20px;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
}

.copyright{
    font-size:14px;
    color:rgba(255,255,255,0.85);
    display:block;
    position:absolute;
    bottom:15px;
    right:15px;
}
</style>
