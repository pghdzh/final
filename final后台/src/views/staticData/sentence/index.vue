<template>
  <div class="main" style="padding:0 20px">
    <el-button type="primary" @click="addComm">添加句子</el-button>
    <el-dialog
      title="句子内容"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span>
        <el-form label-width="80px" :model="add">
          <el-form-item label="句子内容">
            <el-input v-model="add.content"></el-input>
          </el-form-item>
        </el-form>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem"
          >确定{{ funKind == 0 ? "添加" : "修改" }}</el-button
        >
      </span>
    </el-dialog>
    <!-- <el-button type="danger" @click="delectChecked">删除选中</el-button> -->
    <el-table :data="senList" style="width: 100%" ref="Table">
      <el-table-column label="句子ID" prop="senId" width="100"> </el-table-column>
    <el-table-column label="句子内容" prop="content" width="855"> </el-table-column>
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
// import { reqaddSen, reqgetSentence, reqdeteSentence } from "@/api";
export default {
  name: "User",
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      headers: { enctype: "multipart/form-data" },
      senList: [],
      funKind: 0,
      dialogVisible: false,
      add: {
        content: "",
      },
    };
  },
  methods: {
    addComm() {
      this.dialogVisible = true;
      this.funKind = 0;
    },
    async addItem() {
      this.dialogVisible = false;
      if (this.funKind == 0) {
        let result = await reqaddSen(this.add);
        console.log(result);
        if (result.code == 200) {
          this.getInfo();
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      }
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
          reqdeteSentence(row.senId)
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
      let result = await reqgetSentence();
      if (result.code == 200) {
        this.senList = result.data;
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