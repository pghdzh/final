<template>
  <div class="container">
    <el-dialog title="帖子详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属板块" :label-width="formLabelWidth">
          <el-select v-model="form.kind" placeholder="请选择板块">
            <el-option label="前端" value="前端"></el-option>
            <el-option label="后端" value="后端"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="mid">
      <div class="list">
        <div class="item" v-for="i in 10" :key="i">
          <div class="avatar">
            <img :src="userImg" alt="" />
          </div>
          <div class="person">
            <span class="name">
              {{ userName }}
            </span>
            <span style="color: grey"> 66个回复 </span>
          </div>
          <div class="title">
            <span class="con" @click="goItem"> 标题 </span>
            <span>所属板块：<a href="">前端</a></span>
            <span> 2022-8-3 15:25:02 </span>
          </div>
          <div class="respond">
            <span class="con">
              最新回复：
              <a href="">pgh</a>
            </span>
            <span style="margin-top: 10px"> 2022-8-3 15:25:02 </span>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
      <div class="talkKind">
        <h2>板块分区</h2>
        <div class="kinds">
          <span><el-button type="primary" plain>前端</el-button></span>
          <span><el-button type="primary" plain>后端</el-button></span>
          <span><el-button type="primary" plain>算法</el-button></span>
          <span><el-button type="primary" plain>其他</el-button></span>
        </div>

        <el-button
          type="danger"
          style="margin-top: 20px"
          @click="dialogFormVisible = true"
          >发帖子</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["userImg", "userName"]),
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        kind: "",
        content: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    goItem() {
      this.$router.push({ path: "/talkPage/specificitem" });
    },
  },
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  background-color: rgb(239, 239, 239);
  padding: 20px 0;
  .mid {
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: space-between;
    .list {
      width: 73%;
      .item {
        margin-bottom: 20px;
        width: 100%;
        height: 74px;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 1px 2px gainsboro;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar {
          margin-left: 20px;
          cursor: pointer;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .person {
          display: flex;
          flex-direction: column;
          width: 10%;

          margin-right: 15%;
          .name {
            color: #8e44ad;
            font-weight: bold;
            margin-bottom: 10px;
          }
        }
        .title {
          width: 40%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .con {
            color: #3498db;
            font-size: 16px;
          }
        }
        .respond {
          margin-right: 10%;
          display: flex;
          flex-direction: column;
          color: grey;
        }
      }
      .el-pagination {
        margin-left: 25%;
      }
    }
    .talkKind {
      padding: 10px;
      width: 25%;
      height: 200px;
      background-color: white;
      border-radius: 2px;
      box-shadow: 0 1px 2px gainsboro;
      .kinds {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        span {
          width: 40%;
          margin: 5px 10px;
        }
      }
    }
  }
}
</style>