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
        <el-form-item label="账号" prop="userName">
          <el-input
            type="text"
            v-model="ruleForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          没有账号？
          <router-link to="/registerPage" style="color: #3498db"
            >注册</router-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "@/api";
import { mapMutations } from "vuex";
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
    ...mapMutations("user", ["updateUser"]),
    async login(form) {
      let res = await reqLogin(form);
      if (res.code == 200) {
        alert(res.msg);
        console.log("res.data", res.data);
        this.updateUser(res.data);
        this.$router.push({ path: "/home" });
      } else {
        alert(res.msg);
      }
    },
    submitForm(formName) {
      // console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm);
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
    .el-button {
      margin: 20px 40px;
    }
  }
}
</style>