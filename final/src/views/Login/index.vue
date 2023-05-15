<template>
  <div class="main" ref="vantaRef">
    <div class="card">
      <h3>创新实验室</h3>
      <el-form label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" @keyup.enter.native="focusNext(1)" autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" ref="input1"
          @keydown.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" ref="submit" @click="submitForm('ruleForm')">登陆</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          没有账号？
          <router-link to="/registerPage" style="color: #3498db">注册</router-link>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { reqLogin, reqgetInfo } from "@/api";
import { mapMutations } from "vuex";
// import * as THREE from 'three'
// import NET from 'vanta/src/vanta.net'

export default {
  name: "Login",
  mounted() {
    // this.vantaEffect = NET({
    //   el: this.$refs.vantaRef,
    //   THREE: THREE,
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   backgroundColor: 0xEFEFEF,
    //   color: 0x000000,
    //   maxDistance: 10.00,
    // })
  },
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
        userName: "",
        password: "",
      },
      rules: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("user", ["updateUser", 'updateToken']),
    async login(form) {
      let res = await reqLogin(form);
      if (res.code == 200) {
        this.updateToken(res.token)
        let res1 = await reqgetInfo();
        this.updateUser(res1.user);
        this.$message({
          showClose: true,
          type: 'success',
          message: '登陆成功'
        });
        this.$router.push({ path: "/home" });
      } else {

        this.$message({
          showClose: true,
          type: 'error',
          message: res.msg
        });
      }
    },
    submitForm(formName) {
      // console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    focusNext(index) {
      console.log("123")
      let nextElement = null;
      if (index == 1) {
        nextElement = this.$refs.input1;
      }
      if (nextElement) {
        nextElement.focus();
      }
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
  padding-bottom: 300px;

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

    .el-button {
      margin: 20px 40px;
    }
  }
}
</style>