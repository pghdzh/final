<template>
  <div class="main">
    <div class="btns">
      <el-button type="primary" @click="addKind">添加分类</el-button>
    </div>
    <el-dialog title="添加分类" :visible.sync="dialogVisibleKind" width="50%" :before-close="handleClose">
      <span>
        <el-form ref="fromKind" :model="formKind">
          <el-form-item label="分类">
            <el-input placeholder="请输入分类" v-model="formKind.kind">
            </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleKind = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleKind = false">确定</el-button>
      </span>
    </el-dialog>
    <el-tabs tab-position="left" style="height: 1000px;">
      <el-tab-pane :label=i v-for="(i, index) in kind" :key="index">
        <el-table :data="talkData" style="width: 100%">
          <el-table-column prop="ID" label="ID" width="80">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="autor" label="发布者" width="180">
          </el-table-column>
          <el-table-column label="发布者头像" width="180">
            <template slot-scope="props">
              <img :src="props.row.avatar" alt="" style="width: 60px" />
            </template>
          </el-table-column>
          <el-table-column prop="time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="kind" label="所属板块" width="180">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200" header-align="left">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="openDel(row)">删除</el-button>
              <el-button type="primary" size="mini" @click="openDetail(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisibleKind: false,
      formKind: { kind: "" },
      kind: ['前端', '后端', '测试', '算法'],
      talkData: [{ ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' },
      { ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' },
      { ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' },
      { ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' },
      { ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' },
      { ID: 1, title: '标题', autor: '发布者', avatar: require("@/assets/avatar.webp"), time: '发布时间', kind: '所属板块', content: '内容' }],
    }
  },
  methods: {
    addKind() {
      this.dialogVisibleKind = true
    },
    openDel(row) {
      this.$confirm("此操作将删除该帖子, 是否继续?", "提示", {
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
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  padding: 0 20px;

  .btns {
    margin: 20px;
  }
}
</style>