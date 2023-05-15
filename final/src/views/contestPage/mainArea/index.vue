<template>
  <div class="main">
    <div class="TopNav">
      <div class="nav">
        <div @click="goHome" class="home">《《 返回主页</div>
      </div>
      <div class="title">招募区</div>
    </div>
    <el-dialog title="发布招募" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="招募标题" style="width: 50%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="招募人数">
          <el-input-number v-model="form.peopleNumber" :step="1" :min="1"></el-input-number></el-form-item>
        <el-form-item label="截止时间" style="width: 50%">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.expirationDate" style="width: 100%"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="简要描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="技术标签" style="width: 40%">
          <el-select v-model="form.label" placeholder="请选择技术标签">
            <el-option :label="i.labelName" :value="i.labelName" v-for="i, index in condition" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" style="width: 30%">
          <el-input v-model="form.contactInfo"></el-input>
        </el-form-item>
        <el-form-item label="详细要求" prop="desc">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" @click.native="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <div class="topSearch">
        <div class="search">
          <span class="title">查找招募</span>
          <el-input placeholder="请输入简要描述" v-model="searchInput" style="width: 60%" size="medium">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="searchContest">搜索</el-button>
        </div>
        <div class="condition">
          <span class="con-name">
            技术标签
          </span>
          <span class="con-item" :class="{ con_active: conActive == index }" @click="changeLabel(index)"
            v-for="(j, index) in condition" :key="index">{{ j.labelName }}</span>
        </div>
        <div class="resNum">
          共计 <span style="color: rgba(0, 0, 0, 0.75)">{{ totalSize }}</span> 条结果
        </div>
      </div>
      <div class="publish">
        <el-button type="primary" @click="contestAdd">发布招募</el-button>
      </div>
    </div>
    <div class="midForm">
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="expirationDate" label="截止日期" sortable>
        </el-table-column>
        <el-table-column prop="user.nickName" label="招募人">
        </el-table-column>
        <el-table-column prop="name" label="比赛">
        </el-table-column>
        <el-table-column prop="peopleNumber" label="招募人数">
        </el-table-column>
        <el-table-column prop="description" label="简要描述">
        </el-table-column>
        <el-table-column prop="label" label="标签">
          <template slot-scope="scope">
            <el-tag :type="tagType[Math.floor(Math.random() * 5)]" disable-transitions>{{ scope.row.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="godetail(scope.row.recruitId)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="totalSize" v-show="pageSize < totalSize"
          :current-page.sync="pageNum" :page-size="pageSize" @current-change="currentchange" @prev-click="currentchange"
          @next-click="currentchange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { reqpostRecruit, reqselectRecruitList, reqgetRecruitList, reqgetLab, reqgetRecruitByLabelName } from "@/api"
export default {
  mounted() {
    this.getRecruitList()
    this.getLab()
  },
  data() {
    return {
      dialogFormVisible: false,
      pageNum: 1,
      pageSize: 6,
      totalSize: -1,
      listKind: 0,//判断分页是搜索还是标签还是全部
      form: {
        contactInfo: '',
        content: "",
        description: '',
        expirationDate: "",
        label: "",
        name: "",
        peopleNumber: 0,
      },

      tagType: ["primary", "success", "info", "warning", "danger"],
      tableData: [],
      searchInput: "",
      conActive: 0,
      condition: [],
    };
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg"]),
  },
  methods: {
    contestAdd() {
      if (!this.userName) {
        this.$message({
          showClose: true,
          message: '请先登陆'
        });
        return
      }
      this.dialogFormVisible = true
    },
    currentchange(pageNum) {
      this.pageNum = pageNum
      if (this.listKind == 0) {
        this.getRecruitList()
      }//全部
      else if (this.listKind == 1) {
        this.selectRecruitList()
      }//搜索
      else if (this.listKind == 2) {
        this.getRecruitByLabelName()
      }//标签
    },
    async getLab() {
      let res = await reqgetLab()
      if (res.code == 200) {
        console.log("res", res)
        this.condition = res.data
      }

    },
    goHome() {
      this.$router.push({ path: "/home" });
    },
    searchContest() {
      if (!this.searchInput) {
        this.$message({
          showClose: true,
          message: '请填写搜索信息'
        });
        return
      }
      this.listKind = 1
      this.pageSize = 6;
      this.pageNum = 1;
      
      this.selectRecruitList()
    },
    changeLabel(index) {
      this.conActive = index
      this.listKind = 2
      this.pageNum = 1
      this.getRecruitByLabelName()
    },
    async selectRecruitList() {
      let params = {
        description: this.searchInput,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await reqselectRecruitList(params)
      if (res.code = 200) {
        // console.log('res111', res)
        this.tableData = res.data.row
        this.totalSize = res.data.totalSize
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].expirationDate = this.tableData[i].expirationDate.slice(0, 10)
        }
      }
    },
    async getRecruitList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await reqgetRecruitList(params)
      if (res.code == 200) {
        // console.log("res123", res)
        this.tableData = res.data.row
        this.totalSize = res.data.totalSize
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].expirationDate = this.tableData[i].expirationDate.slice(0, 10)
        }
      }
    },
    async getRecruitByLabelName() {
      let params = {
        labelName: this.condition[this.conActive].labelName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      console.log("Parar", params)
      let res = await reqgetRecruitByLabelName(params)
      if (res.code = 200) {
        console.log('res111', res)
        this.tableData = res.data.row
        this.totalSize = res.data.totalSize
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].expirationDate = this.tableData[i].expirationDate.slice(0, 10)
        }
      }
    },
    async submitForm() {
      // console.log(this.form)

      let keys = Object.keys(this.form)
      for (let i = 0; i < keys.length; i++) {
        if (!this.form[keys[i]]) {
          this.$message({
            showClose: true,
            message: '请填写完整信息'
          });
          retrun;
        }
      }
      let res = await reqpostRecruit(this.form)
      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: '发布成功',
          type: 'success'
        });
        this.listKind = 0
        this.getRecruitList()
        this.dialogFormVisible = false
      }


    },
    godetail(id) {
      // console.log(id);

      this.$router.push({ path: `/contestPage/contestItem${id}` });
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  background-color: rgb(239, 239, 239);

  .TopNav {
    height: 128px;
    background-color: rgb(35, 37, 38);
    width: 100%;
    position: relative;
    color: white;
    margin-bottom: 40px;

    .nav {
      padding: 20px;
      display: flex;
      width: 17%;
      justify-content: space-between;

      .home {
        cursor: pointer;
      }
    }

    .title {
      position: absolute;
      font-weight: bold;
      top: 40%;
      left: 10%;
      font-size: 28px;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    width: 83%;
    margin: 0 auto;

    .topSearch {
      width: 80%;
      border-radius: 4px;
      background-color: white;
      padding: 20px;

      .search {
        .title {
          font-size: 20px;
          margin-right: 30px;
        }

        .el-button {
          margin-left: -3px;
        }
      }

      .condition {
        font-size: 16px;
        margin-top: 15px;

        .con-name {
          font-weight: bold;
          display: inline-block;
          width: 90px;
        }

        .con-item {
          margin-left: 20px;
          padding: 3px 8px;
          cursor: pointer;
        }

        .con_active {
          background-color: rgb(52, 152, 219);
          color: white;
          border-radius: 4px;
        }
      }

      .resNum {
        color: rgba(0, 0, 0, 0.45);
        margin: 20px 0;
        font-size: 16px;
      }
    }

    .publish {
      width: 15%;

      .el-button {
        margin: 10px 20%;
      }
    }
  }

  .midForm {
    border-radius: 4px;
    width: 80%;
    margin: 30px auto;
    margin-bottom: 0;
    background-color: white;
    padding: 20px;
    min-height: 400px;
    position: relative;
    padding-bottom: 80px;

    .page {
      position: absolute;
      bottom: 20px;

      left: 40%;
    }
  }
}
</style>