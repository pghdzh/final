<template>
  <div class="main" style="padding:0 20px">
    <el-button type="primary" @click="addimg">添加轮播图</el-button>
    <el-dialog title="轮播图" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span>
        <h3>上传轮播图</h3>
        <div class="Addimg" style="margin-left: 40%">
          <el-upload name="img" class="avatar-uploader" action="" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
            <img v-if="add.userImg" :src="add.userImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确定{{ funKind == 0 ? "添加" : "修改" }}</el-button>
      </span>
    </el-dialog>
    <el-table :data="imgList" style="width: 100%" ref="Table">
      <el-table-column label="轮播图ID" prop="imgID" width="100"> </el-table-column>
      <el-table-column label="轮播图">
        <template slot-scope="props">
          <img :src="props.row.img" alt="" style="width: 260px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="openDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqaddSen, reqgetSentence, reqdeteSentence } from "@/api";
export default {
  name: "User",
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      headers: { enctype: "multipart/form-data" },
      imgList: [
        {
          imgID: 1,
          img: require("./img/swiper1.jpg")
        },
        {
          imgID: 2,
          img: require("./img/swiper2.jpg")
        },
        {
          imgID: 3,
          img: require("./img/swiper3.jpg")
        },
        {
          imgID: 4,
          img: require("./img/swiper4.jpg")
        },
        {
          imgID: 5,
          img: require("./img/swiper5.jpg")
        },

      ],
      funKind: 0,
      dialogVisible: false,
      add: {
        content: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //res：上传成功之后返回前端数据
      //file:上传成功之后服务器返回前端数据
      //收集品牌图片数据，因为将来需要带给服务器
      console.log(res);
      this.add.userImg = res.data.path;
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
    addimg() {
      this.dialogVisible = true;
      this.funKind = 0;
    },
    async addItem() {
      this.dialogVisible = false;
      // if (this.funKind == 0) {
      //   let result = await reqaddSen(this.add);
      //   console.log(result);
      //   if (result.code == 200) {
      //     this.getInfo();
      //     this.$message({
      //       type: "success",
      //       message: "添加成功!",
      //     });
      //   }
      // }
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    edit(row) {
      this.dialogVisible = true;
      this.funKind = 1;
      this.add.userId = row.userId;
    },
    openDel(row) {
      this.$confirm("此操作将删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("行信息", row);
          // reqdeteSentence(row.senId)
          //   .then(() => {
          //     this.getInfo();
          //     this.$message({
          //       type: "success",
          //       message: "删除成功!",
          //     });
          //   })
          //   .catch(() => {
          //     this.$message({
          //       type: "info",
          //       message: "请求出错",
          //     });
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getInfo() {
      // let result = await reqgetSentence();
      // if (result.code == 200) {
      //   this.senList = result.data;
      //   console.log(this.userList);
      // }
    },
  },
};
</script>

<style scoped lang="scss">
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