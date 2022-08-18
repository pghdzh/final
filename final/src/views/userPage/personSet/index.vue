<template>
  <div class="main">
    <div class="addAvatar">
      <h3>头像：</h3>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="addForm">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属小组">
          <el-select v-model="form.group" placeholder="请选择小组">
            <el-option label="一" value="1"></el-option>
            <el-option label="二" value="2"></el-option>
            <el-option label="三" value="3"></el-option>
            <el-option label="四" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学习方向">
          <el-select v-model="form.studyNav" placeholder="请选择小组">
            <el-option label="前端" value="前端"></el-option>
            <el-option label="后端" value="后端"></el-option>
            <el-option label="算法" value="算法"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="form.sign"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.linkWay"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="form.perIntor"></el-input>
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
export default {
  name: "personSet",
  data() {
    return {
      form: {
        sign: "",
        group: "",
        studyNav: "",
        linkWay: "",
        perIntor: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    onSubmit() {
      console.log("submit!", this.form);
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  margin-top: 60px;
  width: 100%;
  padding: 20px 10%;
  .addAvatar {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .addForm {
    width: 75%;
  }
}
</style>