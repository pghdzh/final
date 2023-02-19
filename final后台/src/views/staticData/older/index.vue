<template>
  <div class="main">
    <el-button type="primary" @click="dialogVisible = true">添加学长</el-button>
    <el-table :data="olderList" style="width: 100%" ref="Table">
      <el-table-column label="学长ID" prop="olderID" width="100"> </el-table-column>
      <el-table-column label="姓名" prop="olderName" width="100"> </el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="props">
          <img :src="props.row.avatar" alt="" style="width: 60px" />
        </template>
      </el-table-column>
      <el-table-column label="毕业去向" prop="olderGo" width="200"> </el-table-column>
      <el-table-column label="简介" prop="olderIntor" width="500"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="openDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加学长" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>

        <el-form ref="form" :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.olderName">
            </el-input>
          </el-form-item>
          <el-form-item label="毕业去向">
            <el-input v-model="form.olderGo">
            </el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.olderIntor">
            </el-input>
          </el-form-item>

        </el-form>
        <h3>上传学长头像</h3>
        <div class="Addimg" style="margin-left: 40%">
          <el-upload name="img" class="avatar-uploader" action="" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

  data() {
    return {
      headers: { enctype: "multipart/form-data" },
      dialogVisible: false,
      form: { olderName: '', avatar: '', olderGo: '', olderIntor: '' },
      olderList: [
        { olderID: 1, olderName: '姓名', avatar: require("@/assets/avatar.webp"), olderGo: '毕业去向', olderIntor: '简介' },
        { olderID: 1, olderName: '姓名', avatar: require("@/assets/avatar.webp"), olderGo: '毕业去向', olderIntor: '简介' },
        { olderID: 1, olderName: '姓名', avatar: require("@/assets/avatar.webp"), olderGo: '毕业去向', olderIntor: '简介' },
        { olderID: 1, olderName: '姓名', avatar: require("@/assets/avatar.webp"), olderGo: '毕业去向', olderIntor: '简介' },
        { olderID: 1, olderName: '姓名', avatar: require("@/assets/avatar.webp"), olderGo: '毕业去向', olderIntor: '简介' },]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    handleAvatarSuccess(res, file) {
      //res：上传成功之后返回前端数据
      //file:上传成功之后服务器返回前端数据
      //收集品牌图片数据，因为将来需要带给服务器
      console.log(res);
      this.form.avatar = res.data.path;
    },
    //图片上传之前
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
  },
}
</script>

<style scoped lang='scss'>
.main {
  padding: 0 20px;

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
</style>