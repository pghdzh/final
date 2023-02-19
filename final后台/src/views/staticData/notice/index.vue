<template>
  <div class="main">
    <el-button type="primary" @click="addNotice">添加公告</el-button>
    <el-table :data="NoticeData" style="width: 100%">
      <el-table-column prop="title" label="公告标题" width="180">
      </el-table-column>
      <el-table-column prop="grade" label="公告等级" width="180">
      </el-table-column>
      <el-table-column prop="person" label="公告发布人" width="180">
      </el-table-column>
      <el-table-column prop="content" label="公告内容" width="700">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="openDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加公告" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>

        <el-form ref="form" :model="form">
          <el-form-item label="公告标题">
            <el-input placeholder="请输入公告标题" v-model="form.title">
            </el-input>
          </el-form-item>
          <el-form-item label="公告等级">
            <el-select v-model="form.grade" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input placeholder="直接读登陆人名字" v-model="form.person" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input type="textarea" :rows="12" placeholder="请输入公告内容" v-model="form.content">
            </el-input>
          </el-form-item>
        </el-form>
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
      options: [{
        value: '选项1',
        label: '全实验室'
      }, {
        value: '选项2',
        label: '对外公告'
      }, {
        value: '选项3',
        label: '小组公告'
      }],
      dialogVisible: false,
      form: { title: "", grade: '', person: '', content: '' },
      NoticeData: [{ title: "公告标题", grade: '全实验室', person: '管理员', content: '公告内容' },
      { title: "公告标题", grade: '全实验室', person: '管理员', content: '公告内容' },
      { title: "公告标题", grade: '全实验室', person: '管理员', content: '公告内容' },
      { title: "公告标题", grade: '全实验室', person: '管理员', content: '公告内容' },
      { title: "公告标题", grade: '全实验室', person: '管理员', content: '公告内容' }]
    }
  },
  methods: {
    addNotice() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    openDel(row) {
      this.$confirm("此操作将删除该公告, 是否继续?", "提示", {
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
  },
}
</script>

<style scoped lang='scss'>
.main {
  padding: 0 20px;
}
</style>