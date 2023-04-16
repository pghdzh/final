<template>
  <div class="main">


    <div class="addForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称" style="width: 600px">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="签名" style="width: 600px">
          <el-input v-model="form.signature"></el-input>
        </el-form-item>


        <el-form-item label="个人介绍" style="width: 600px">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.introduction">
          </el-input>

        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属小组">
          <el-select v-model="form.deptId" placeholder="请选择小组">
            <el-option label="小组1" :value=0></el-option>
            <el-option label="小组2" :value=1></el-option>
            <el-option label="小组3" :value=2></el-option>
            <el-option label="小组4" :value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学习方向" style="width: 600px">
          <el-input v-model="form.learnDir"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" style="width: 600px">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" style="width: 600px">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit" style="margin-right: 10%">提交</el-button>
          <el-button @click.native="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requpdateuserinfo, reqgetInfo } from "@/api";

export default {
  name: "personSet",
  mounted() {
    this.getuserInfo()
  },
  data() {
    return {
      userId: -1,
      form: {
        nickName: "",
        sex: "",
        email: "",
        signature: '',
        deptId: -1,
        learnDir: '',
        phoneNumber: '',
        introduction:''
      },
      beforeForm: {},
    };
  },
  methods: {

    async getuserInfo() {
      let res = await reqgetInfo()
      console.log("user", res.user)
      if (res.code == 200) {
        this.userId = res.user.userId
        let arr = Object.keys(this.form)
        arr.forEach(item => {
          if (res.user.hasOwnProperty(item)) {
            this.form[item] = res.user[item]
            this.beforeForm[item] = res.user[item]
          }
        })
        // this.beforeForm = this.form 大坑这里不能直接赋值，会导致beforeForm和form一起变
      }
    },
    async onSubmit() {

      let params = {
        userId: this.userId
      }
      let keys = Object.keys(this.form)
      console.log("this.form",this.form)
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (this.form[key] != this.beforeForm[key]) {

          params[key] = this.form[key]
        }
      }
      console.log("params", params)
      let res = await requpdateuserinfo(params);
      if (res.code == 200) {
        this.$router.push({ path: "/user" });
      }
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  margin-top: 60px;
  width: 100%;
  padding-top: 100px;
  min-height: 800px;
  background-color: rgb(239, 239, 239);
  display: flex;
  justify-content: center;

  .addForm {
    width: 600px;

  }
}
</style>