 <template>
  <div class="register">
    <img src="../assets/register-bg.jpg" width="100%" height="100%">
    <div class="container">
      <h2 class="title">考研辅助平台注册</h2>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="账号" prop="username">
          <el-input class="registerInput" v-model="registerForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input class="registerInput" type="password" v-model="registerForm.pass" autocomplete="off" placeholder="请输入密码（8~16位）"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input class="registerInput" type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-radio v-model="registerForm.identity" label="student">学生</el-radio>
          <el-radio  v-model="registerForm.identity" label="teacher">教师</el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input class="registerInput" v-model="registerForm.phone" placeholder="请输入有效的电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emile">
          <el-input class="registerInput" v-model="registerForm.emile" placeholder="请输入有效的邮箱"></el-input>
        </el-form-item>
        
        <div class="btn">
          <el-button plain type="primary" @click="submitForm('registerForm')" class="btn-commit">注册</el-button>
          <!-- <el-button @click="resetForm('registerForm')">重置</el-button> -->
        </div>
        <div class="comeback">
          <span @click="back">已有账号，直接登录</span>
        </div>
      </el-form>
      
    </div>
  </div>

</template>
<script>
import axios from "axios";
export default {
  name: 'rigister',
  components: {

  },
  data(){

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value.length<8 || value.length>16){
        callback(new Error('密码不正确'));
      }else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    let validateEmile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username:'',
        phone:'',
        emile:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { required: true, message: '密码不能为空'},
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '密码不能为空'},
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空'},
          { min:2,max:16, message: '请输入2-16位字符',trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '手机不能为空'},
          { validator: validatePhone, trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '身份为必选项'},
          //{ validator: validateIdentity, trigger: 'blur' }
        ],
        emile: [
          { required: true, message: '邮箱不能为空'},
          { validator: validateEmile, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    back(){
      this.$router.push("/");
    },
    submitForm(formName) {
      let param = new URLSearchParams();

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/user/register',{
            "email": this.registerForm.emile,
           " mobile": this.registerForm.phone,
            "name": '哈哈哈',
            "password": this.registerForm.pass,
            "username": this.registerForm.username
          })
            .then((res) => {
              alert('注册成功');
              console.log(res);
            })
            .catch(err => {
              alert(err.msg);
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="stylus" scoped>
.registerInput{
  width :400px;
}
.register{
  position :absolute;
  top :0px;
  left :0px;
  width :100%;
  height :100%;
}
.container{
  background-color :white;
  position: absolute;
  width: 550px;
  height:600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px;
  box-shadow: 20px 20px 10px #888888;
  padding :20px 0px 0px 0px;
  .title{
    height: 50px;
    line-height: 50px;
    width: 100%;
    font-size: 30px;
    text-align: center;
  }
  .btn{
    text-align :center;
    margin :0px;
    padding :0px;
    .btn-commit{
      width :250px;
      border-radius: 20px;
    }
  }
  
  .comeback{
    position: absolute;
    top:90%;
    left: 0px;
    width: 100%;
    height: 30px;
    margin:0px;
    padding :0px;
    // line-height: 50px;
    font-size: 10px;
    color: #2486b9;
    // border-radius: 20px;
    //background-color: #409EFF;
    text-align: center;
    span{
      cursor: pointer;
    }
}
}
</style>
