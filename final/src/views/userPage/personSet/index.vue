<template>
  <div class="main">
    <h3>头像：</h3>
    <div class="addAvatar">
      <el-upload
        name="uploadFile"
        class="avatar-uploader"
        action="http://47.108.185.227:8080/file/uplodaAvatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="addForm">
      <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称" style="width: 600px">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit" style="margin-right: 10%"
            >提交</el-button
          >
          <el-button @click.native="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUpdatauerInfo } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "personSet",
  data() {
    return {
      form: {
        nickName: "",
        sex: "",
        email: "",
        avatar: "",
      },
    };
  },
  methods: {
    ...mapMutations("user", ["updateUserInfo"]),
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data;
      console.log("res", res);
      console.log("img", this.form.avatar);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      console.log("File", file);
      return isJPG && isLt2M;
    },

    async onSubmit() {
      console.log("submit!", this.form);
      let res = await reqUpdatauerInfo(this.form);
      if (res.code == 200) {
        this.updateUserInfo({
          nickName: this.form.nickName,
          avatar: this.form.avatar,
        });
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
  padding: 20px 10%;
  min-height: 600px;
  .addAvatar {
    margin-left: 100px;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
      border-radius: 50%;
    }
  }
  .addForm {
    width: 75%;
  }
}
</style>