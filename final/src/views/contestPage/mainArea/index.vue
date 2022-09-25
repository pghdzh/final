<template>
  <div class="main">
    <el-dialog title="发布招募" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="比赛名称" style="width: 50%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="招募人数">
          <el-input-number v-model="form.personNums" :step="1"></el-input-number
        ></el-form-item>
        <el-form-item label="截止时间" style="width: 50%">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="简要描述">
          <el-input v-model="form.intor"></el-input>
        </el-form-item>
        <el-form-item label="技术标签" style="width: 30%">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>

        <el-form-item label="详细要求" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" @click.native="submitForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="top">
      <div class="topSearch">
        <div class="search">
          <span class="title">查找招募</span>
          <el-input
            placeholder="请输入比赛、id或招募人"
            v-model="searchInput"
            style="width: 60%"
            size="medium"
          >
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="medium"
            >搜索</el-button
          >
        </div>
        <div class="condition" v-for="(i, index) in condition" :key="index">
          <span class="con-name">
            {{ i.conName }}
          </span>
          <span
            class="con-item"
            :class="{ con_active: conActive[i.id] == index }"
            @click="conActive.splice(i.id, 1, index)"
            v-for="(j, index) in i.condition1"
            :key="index"
            >{{ j }}</span
          >
        </div>
        <div class="resNum">
          共计 <span style="color: rgba(0, 0, 0, 0.75)">9999</span> 条结果
        </div>
      </div>
      <div class="publish">
        <el-button type="primary" @click="dialogFormVisible = true"
          >发布招募</el-button
        >
      </div>
    </div>
    <div class="midForm">
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="date" label="截止日期" width="180" sortable>
        </el-table-column>
        <el-table-column prop="name" label="招募人" width="180">
        </el-table-column>
        <el-table-column prop="contest" label="比赛" width="100">
        </el-table-column>
        <el-table-column prop="nums" label="招募人数" width="100">
        </el-table-column>
        <el-table-column prop="intor" label="简要描述" width="300">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="tagType[Math.floor(Math.random() * 5)]"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="godetail(scope.$index, tableData)"
              type="text"
              size="small"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.updatetopMsg({
      minNav: [],
      title: "招募区",
    });
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        personNums: 0,
        date: "",
        intor: "",
        tag: "",
        desc: "",
      },

      tagType: ["primary", "success", "info", "warning", "danger"],
      tableData: [
        {
          date: "2022-9-21",
          name: "王小虎",
          contest: "挑战杯",
          nums: "1人",
          intor: "急招",
          tag: "vue",
        },
        {
          date: "2022-9-24",
          name: "王小虎",
          contest: "互联网+",
          nums: "1人",
          intor: "急招",
          tag: "java",
        },
        {
          date: "2021-9-22",
          name: "王小虎",
          contest: "华迪杯",
          nums: "1人",
          intor: "急招",
          tag: "c++",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
        {
          date: "2022-8-23",
          name: "王小虎",
          contest: "acm",
          nums: "1人",
          intor: "急招",
          tag: "python",
        },
      ],
      searchInput: "",
      conActive: [0, 0],
      condition: [
        {
          id: 0,
          conName: "比赛",
          condition1: ["互联网+", "acm", "挑战杯", "华迪杯"],
        },
        {
          id: 1,
          conName: "技术标签",
          condition1: [
            "vue",
            "java",
            "c++",
            "微信小程序",
            "python",
            "springboot",
          ],
        },
      ],
    };
  },
  methods: {
    ...mapMutations("contest", ["updatetopMsg"]),
    submitForm(){
      console.log(this.form)
    },
    godetail(id, tableData) {
      console.log(id, tableData);

      this.$router.push({ path: "/contestPage/contestItem" });
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  background-color: rgb(239, 239, 239);
  padding: 40px 0;
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
    background-color: white;
    padding: 20px;
    .page {
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }
  }
}
</style>