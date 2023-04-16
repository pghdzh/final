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
        <el-form-item label="昵称" prop="nickName">
          <el-input
            type="text"
            v-model="ruleForm.nickName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqregister } from "@/api";
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
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        nickName: "",
        userName: "",
        password: "",
      },
      rules: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        nickName: [{ validator: validatePass3, trigger: "blur" }],
        email: [{ validator: validatePass4, trigger: "blur" }],
      },
    };
  },
  methods: {
    async register(form) {
      let res = await reqregister(form);
      if (res.code == 200) {
        alert(res.msg);
        console.log("regres", res);
        this.$router.push({ path: "/login" });
      } else {
        alert(res.msg);
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register(this.ruleForm);
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
    min-height: 400px;
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