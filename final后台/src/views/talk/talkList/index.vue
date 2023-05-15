<template>
  <div class="main">

    <!-- <div class="btns">
      <el-button type="primary" @click="addKind">添加帖子</el-button>
    </div>
    <el-dialog title="添加帖子" :visible.sync="dialogVisibleKind" width="50%">
      <span>
        <el-form ref="fromKind">
          <el-form-item label="分类">
            <el-input placeholder="请输入分类">
            </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleKind = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleKind = false">确定</el-button>
      </span>
    </el-dialog> -->
    <el-table :data="talkData" >
      <el-table-column prop="articleId" label="ID" >
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="autor" label="发布者" >
      </el-table-column>
      <el-table-column label="发布者头像" >
        <template slot-scope="props">
          <img :src="props.row.avatar" alt="" style="width: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发布时间" >
      </el-table-column>
      <el-table-column prop="isComment" label="是否允许评论" >
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" >
      </el-table-column>

      <el-table-column prop="prop" label="操作"  header-align="left">
        <template slot-scope="{ row }">
          <el-button type="danger" size="mini" @click="openDel(row)">删除</el-button>
          <!-- <el-button type="primary" size="mini" @click="openDetail(row)">查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="totalSize" :current-page.sync="pageNum"
        :page-size="pageSize" @current-change="currentchange" @prev-click="currentchange" @next-click="currentchange"
        v-show="pageSize <= totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqgetAllarticle,reqdeleteArticle } from "@/api"
export default {
  mounted() {
    this.getallarticle()
  },
  data() {
    return {
      pageSize: 13,
      pageNum: 1,
      totalSize: -1,
      dialogVisibleKind: false,
      talkData: [],
    }
  },
  methods: {
    addKind() {
      this.dialogVisibleKind = true
    },
    async getallarticle() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await reqgetAllarticle(params)
      if (res.code == 200) {
        console.log("res", res)
        this.talkData = res.data.row
        this.totalSize = res.data.totalSize
      }
    },
    currentchange(pageNum) {
      this.pageNum = pageNum
      this.getallarticle()
    },
    openDetail(row) {

    },
    openDel(row) {
      this.$confirm("此操作将删除该帖子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("行信息", row);
          reqdeleteArticle(row.articleId)
          this.getallarticle()
          this.$message({
            type: "success",
            message: "删除成功",
          });
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
  .page{
    position: fixed;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>