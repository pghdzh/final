<template>
  <div class="main">
    <div class="card">
      <h3>创新实验室</h3>
      <el-form
        label-position="top"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        实验室账号由管理员统一发放，不提供对外注册，如需加入实验室请详阅
        <router-link to="/suggest" style="color:#3498db">招新页面</router-link>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {reqLogin} from "@/api"
import {mapMutations} from 'vuex'
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: "",
      },
      rules: {
        account: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations('user',['updateUser']),
    async login(form){
        let res = await reqLogin(form)
        if(res.code == 200){
           alert(res.msg);
           console.log("res.data[0]",res.data[0])
           this.updateUser(res.data[0])
           this.$router.push({path:'/home'})
        }
    },
    submitForm(formName) {
      // console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.login(this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  background-color: rgb(239, 239, 239);
  display: flex;
  justify-content: center;
  padding: 140px 0;
  .card {
    border-radius: 4px;
    padding: 30px;
    width: 20%;
    height: 400px;
    background-color: #fff;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
    .el-button{
      margin: 20px 40px;
    }
  }
}
</style>