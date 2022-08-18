<template>
  <div class="main">
    <el-button type="primary" @click="addComm">添加用户</el-button>
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span>
        <el-form label-width="80px" :model="add">
          <el-form-item label="用户姓名">
            <el-input v-model="add.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户账号">
            <el-input v-model="add.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="add.userPass"></el-input>
          </el-form-item>
        </el-form>

        <h3>上传用户头像</h3>
        <div class="Addimg" style="margin-left: 40%">
          <el-upload
            name="img"
            class="avatar-uploader"
            action="http://localhost:3000/api/imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="headers"
          >
            <img v-if="add.userImg" :src="add.userImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem"
          >确定{{ funKind == 0 ? "添加" : "修改" }}</el-button
        >
      </span>
    </el-dialog>
    <!-- <el-button type="danger" @click="delectChecked">删除选中</el-button> -->
    <el-table :data="userList" style="width: 100%" ref="Table">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="用户ID" prop="userId"> </el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="props">
          <img :src="props.row.userImg" alt="" style="width: 60px" />
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" prop="userName"> </el-table-column>
      <el-table-column label="用户账号" prop="userAccount"> </el-table-column>
      <el-table-column label="用户密码" prop="userPass"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="openDel(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqaddUser, reqgetUser,reqdeteuser } from "@/api";
export default {
  name: "User",
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      headers: { enctype: "multipart/form-data" },
      userList: [],
      funKind: 0,
      dialogVisible: false,
      add: {
        userImg: "",
        userName: "",
        userPass: "",
        userAccount:"",
      },
    };
  },
  methods: {
    delectChecked() {
      console.log(this.$refs.Table.selection);
      let idList = [];
      let Tem = this.$refs.Table.selection;
      Tem.forEach((element) => {
        idList.push(element.userId);
      });
      console.log("多选", idList);
      reqdeleteUser(idList)
        .then(() => {
          this.getInfo();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求出错",
          });
        });
    },
    addComm() {
      this.dialogVisible = true;
      this.funKind = 0;
    },
    async addItem() {
      this.dialogVisible = false;
      if (this.funKind == 0) {
        let result = await reqaddUser(this.add);
        console.log(result);
        if (result.code == 200) {
          this.getInfo();
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      } else {
        let result = await requpdateUser(this.add);
        console.log(result);
        if (result.code == 200) {
          this.getInfo();
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        }
      }
    },
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(row) {
      this.dialogVisible = true;
      this.funKind = 1;
      this.add.userId = row.userId;
    },
    openDel(row) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("行信息", row);
          reqdeteuser(row.userId)
            .then(() => {
              this.getInfo();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "请求出错",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getInfo() {
      let result = await reqgetUser();
      if (result.code == 200) {
        this.userList = result.data;
        console.log(this.userList);
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>