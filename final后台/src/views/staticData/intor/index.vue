<template>
  <div class="main">
    <el-button type="primary" @click="updataIntor">修改简介</el-button>
    <div class="intor">
      <h3>实验室简介</h3>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem nostrum illo alias? Dolores quis illo quibusdam
      impedit nihil voluptate aspernatur. Impedit minima quas ipsum architecto provident veniam reiciendis mollitia
      aperiam!
    </div>
    <el-dialog title="修改实验室简介" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>

        <el-form ref="form" :model="form">
          <el-form-item label="简介">
            <el-input type="textarea" :rows="12" placeholder="请输入内容" v-model="form.intor">
            </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="addGroup">添加小组</el-button>
    <el-table :data="GroupData" style="width: 100%">
      <el-table-column prop="groupName" label="小组名" width="180">
      </el-table-column>
      <el-table-column prop="groupIntor" label="小组简介" width="1080">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="openDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增小组" :visible.sync="dialogVisibleGroup" width="30%" :before-close="handleClose">
      <span> <el-form ref="formGroup" :model="formGroup">
          <el-form-item label="小组名">
            <el-input v-model="formGroup.groupName">
            </el-input>
          </el-form-item>
          <el-form-item label="小组简介">
            <el-input v-model="formGroup.groupIntor">
            </el-input>
          </el-form-item>
        </el-form></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleGroup = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleGroup = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleGroup: false,
      form: {
        intor: '',
      },
      formGroup: {
        groupName: '',
        groupIntor: '',
      },
      GroupData: [
        {
          groupName: '小组1',
          groupIntor: "小组简介"
        },
        {
          groupName: '小组2',
          groupIntor: "小组简介"
        },
        {
          groupName: '小组3',
          groupIntor: "小组简介"
        },
        {
          groupName: '小组4',
          groupIntor: "小组简介"
        }
      ]
    }
  },
  methods: {
    addGroup() {
      this.dialogVisibleGroup = true
    },
    openDel(row) {
      this.$confirm("此操作将删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("行信息", row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updataIntor() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
}
</script>

<style scoped lang='scss'>
.main {
  padding: 0 20px;
}

.intor {
  width: 50%;
  margin-left: 20%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 40px 100px;
}
</style>