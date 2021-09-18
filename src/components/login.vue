<template>
  <div class="login-container" id="1">
    <el-form ref="form" :model="form" label-width="55px" class="login-form">
      <h2 class="login-title">登录</h2>
      <el-form-item label="账号">
        <el-input v-model="form.username" prop="email" :rules="[{ required: true, message: '用户名不能为空'}]" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" prop="password" :rules="[{ required: true, message: '邮箱不能为空'}]" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio v-model="identity" label="a">学生</el-radio>
        <el-radio v-model="identity" label="b">家长</el-radio>
        <el-radio v-model="identity" label="c">老师</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="ok">登录</el-button>
        <el-button type="primary" @click="register" class="ok">注册</el-button>
      </el-form-item>
      <el-button type="text" class="icon-y">忘记密码?找回密码</el-button>
    </el-form>
  </div>
</template>
<script>
import rigister from "./rigister";
import ks from "./ks"
export default {
  name: "login",
  data() {
    return {
      radio:"",
      identity:"",
      form: {
        username: "",
        password: ""
      }
    };
  },
  components:{
    rigister,
    ks
  },
  methods: {
    onSubmit() {
      this.$router.push("/ks")
    },
    register(){
      this.$router.push("/rigister")
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form {
  width: 350px;
  margin: 140px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border 1px solid #000
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  //background: url("../../assets/img/hp.jpg")
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}

.icon-y{
  margin-left  210px
}
.ok {
  width: 90px;
  font-size: 14px;
  background: #429e73;
  margin-right 50px
  color: #fff;
}
.ok:hover {
  background: #006636;
  color: #fff;
}
.ok:focus {
  background: #006636;
  color: #fff;
}


</style>
