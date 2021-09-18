<template>
  <div class="login">
    <div class="container">
      <el-tabs stretch v-model="activeName" @tab-click="handleClick" class="login-el-tabs">
        <el-tab-pane label="密码登录" name="first">
          <el-form hide-required-asterisk :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="pswin">
            <el-form-item
              label="用户名"
              prop="username"
              :rules="[
                { required: true, message: '用户名不能为空'},
              ]"
            >
              <el-input type="text" v-model="numberValidateForm.username" name="username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" name="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              class="pswverifyitem"
              label="验证码"
              prop="pswverify"
              :rules="[
                { required: true, message: '验证码不能为空'},
              ]"
            >
              <el-input class="pswverifyinput" type="text" v-model="numberValidateForm.pswverify" autocomplete="off"></el-input>
              <a href="javascript:" class="pswverifyimg" @click="changeCodeImg()"><img :src="pswverifyimg" /></a>
            </el-form-item>
            <el-form-item>
              <el-button class="loginbtn" type="primary" @click="submitForm('numberValidateForm')">登录</el-button>
            </el-form-item>
            <div class="goregister">
              没有账号？去<a href="javascript:" @click="goregister">注册</a>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="second">
          <el-form hide-required-asterisk :model="phoneForm" ref="phoneForm" label-width="100px" class="phonein">
            <el-form-item
              label="手机号"
              prop="phone"
              :rules="[
                { required: true, message: '手机号不能为空'},
              ]"
            >
              <el-input type="text" style="width:240px;" v-model="phoneForm.phone" autocomplete="off"></el-input>
              <el-button
                class="verifybtn"
                type="primary"
                @click="getVerify"
                :disabled="disabled=!show"
              >
                <span v-show="show">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-button>
            </el-form-item>
            <el-form-item
              label="验证码"
              prop="phverify"
              :rules="[
                { required: true, message: '验证码不能为空'},
              ]"
            >
              <el-input type="text" v-model="phoneForm.phverify" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginbtn" type="primary" @click="submitForm('phoneForm')">登录</el-button>
            </el-form-item>
            <div class="goregister">
              没有账号？去<a href="javascript:" @click="goregister">注册</a>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="third">
          <el-form hide-required-asterisk :model="emailForm" ref="emailForm" label-width="100px" class="emin">
            <el-form-item
              label="邮箱"
              prop="email"
              :rules="[
                { required: true, message: '邮箱不能为空'},
              ]"
            >
              <el-input type="text" style="width:240px;" v-model="emailForm.email" autocomplete="off"></el-input>
              <el-button
                class="verifybtn"
                type="primary"
                @click="emgetVerify"
                :disabled="disabled=!emshow"
              >
                <span v-show="emshow">获取验证码</span>
                <span v-show="!emshow" class="count">{{emcount}} s</span>
              </el-button>
            </el-form-item>
            <el-form-item
              label="验证码"
              prop="emverify"
              :rules="[
                { required: true, message: '验证码不能为空'},
              ]"
            >
              <el-input type="text" v-model="emailForm.emverify" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginbtn" type="primary" @click="submitForm('emailForm')">登录</el-button>
            </el-form-item>
            <div class="goregister">
              没有账号？去<a href="javascript:" @click="goregister">注册</a>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import rigister from './rigister'
export default {
  name: 'ks',
  components:{
    rigister
  },
  data() {
    return {
      activeName: 'first',
      numberValidateForm: {
        username: '',
        password:'',
        pswverify:'',
      },
      pswverifyimg:'',
      //手机登录
      show: true,
      count: "", // 初始化次数
      timer: null,
      phoneForm: {
        phone:'',
        phverify:'',
      },
      //邮箱登录
      emshow: true,
      emcount: "", // 初始化次数
      emtimer: null,
      emailForm: {
        email:'',
        emverify:'',
      },
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      axios.get("/code/image", {
        responseType: "arraybuffer",
      }).then( res =>  {
        //将从后台获取的图片流进行转换
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then(res2 =>  {
        //接收转换后的Base64图片
        this.pswverifyimg = res2;
      }).catch(() => {
      })
    },
    changeCodeImg(){
      axios.get("/code/image", {
        responseType: "arraybuffer",
      }).then( res =>  {
        //将从后台获取的图片流进行转换
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then(res2 =>  {
        //接收转换后的Base64图片
        this.pswverifyimg = res2;
      }).catch(() => {
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName==="numberValidateForm"){
            axios.post('/user/login',{
              "username":this.numberValidateForm.username,
             " password":this.numberValidateForm.password,
              "imageCode":this.numberValidateForm.pswverify
            })
              .then(() => {
                alert('登录成功');
              })
              .catch((res) => {
                console.log(res)
                alert('登录失败');
              })
          }
          else if(formName==="phoneForm"){
            axios.post('/authentication/mobile',{
              "mobile":this.phoneForm.phone,
              "smsCode":this.phoneForm.phverify
            })
              .then(() => {
                alert('登录成功');
              })
              .catch(() => {
                alert('登录失败');
              })
          }
          else if(formName==="emailForm"){
            axios.post('/authentication/email',{
              "email":this.emailForm.email,
              "emailCode":this.emailForm.emverify
            })
              .then(() => {
                alert('登录成功');
              })
              .catch(() => {
                alert('登录失败');
              })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goregister(){
      this.$router.push('/rigister');
    },
    //手机登录
    getVerify() {
      // 验证手机号
      if (this.checkPhone() == false) {
        return false;
      } else {
        axios.get('/code/sms',{
          params:{
            mobile:this.phoneForm.phone
          }
        })
          .then(res => {
            console.log(res.data.msg)
          })
          .catch(() => {
            alert('发送失败')
          });

        const TIME_COUNT = 60; //更改倒计时时间
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    checkPhone() {
      let phone = this.phoneForm.phone;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$message.error("请填写正确的手机号");
        return false;
      }
    },
    //邮箱登录
    emgetVerify() {
      // 验证邮箱
      if (this.checkEmail() == false) {
        return false;
      } else {
        axios.get('/code/email',{
          params:{
            email:this.emailForm.email
          }
        })
          .then(res => {
            console.log(res.data.msg)
          })
          .catch(() => {
            console.log(this.emailForm.email)
            alert('发送失败')
          });
        const TIME_COUNT = 60; //更改倒计时时间
        if (!this.emtimer) {
          this.emcount = TIME_COUNT;
          this.emshow = false;
          this.emtimer = setInterval(() => {
            if (this.emcount > 0 && this.emcount <= TIME_COUNT) {
              this.emcount--;
            } else {
              this.emshow = true;
              clearInterval(this.emtimer); // 清除定时器
              this.emtimer = null;
            }
          }, 1000);
        }
      }
    },
    checkEmail() {
      let email = this.emailForm.email;
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
        this.$message.error("请填写正确的邮箱");
        return false;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-form{
  margin-top: 20px;
}
.el-tabs__nav-wrap{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.el-tabs__nav-scroll{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.el-tabs__nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.el-input{
  width: 300px;
}

.loginbtn{
  width: 350px;
  margin-top: 10px;
}
.verifybtn{
  width:100px;
  position:absolute;
  right:50px;
  top:0
}

.container{
  position: absolute;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  // border: 1px solid #409EFF;
  border-radius: 20px;
  padding-top: 15px;
  box-shadow: 0 0 20px 10px #b1cfec;
  .goregister{
    display: flex;
    justify-content: center;
    color: #7e7a7a;
    margin-bottom: 20px;
    a{
      text-decoration:none;
      color: #e23737;
    }
  }
  .pswin{
    .pswverifyimg{
      position: absolute;
      right: 50px;
      width: 100px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .pswverifyinput{
      width: 200px;
    }
  }
}


</style>
