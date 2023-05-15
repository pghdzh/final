<template>
  <div class="container">
    <div class="TopNav">
      <div class="nav">
        <div @click="goHome" class="home"><i class="el-icon-d-arrow-left"></i> 返回主页</div>
      </div>
      <div class="title">{{ topTitle }}</div>
    </div>
    <el-dialog title="帖子详情" :visible.sync="dialogFormVisible" :show-close="false" :fullscreen=true>
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属板块" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="请选择板块">
            <el-option :label="i.categoryName" :value="i.categoryId" v-for="i, index in kindsList"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否允许评论" :label-width="formLabelWidth">
          <el-select v-model="form.isComment">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体内容" :label-width="formLabelWidth">

          <mavon-editor ref="mdedit" v-model="form.content" style="height: 80vh" @imgAdd="imgAdd">
          </mavon-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="talkTem">取 消</el-button>
        <el-button type="primary" @click="talkAdd">确 定</el-button>
      </div>
    </el-dialog>
    <div class="mid">
      <div class="list">
        <div class="item" v-for="i, index in ArticleList" :key="index">
          <div class="avatar">
            <div class="avatarImg" :style="{ 'background-image': `url(${i.user.avatar})` }" v-if="i.user.avatar"></div>
          </div>
          <div class="item-right">
            <div class="title" @click="goItem(i.articleId)">
              {{ i.title }}
            </div>
            <!-- <div class="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore est, pariatur eligendi molestias qui earum
              odit cupiditate ipsum quidem? Ratione Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
              qui dolorum quam error saepe sequi dolore soluta veritatis veniam! Autem maxime iure tempora saepe ab
              architecto, vel libero eum quae. accusamus at, nulla repellat saepe ut quas itaque eveniet deleniti.
            </div> -->
            <div class="otherMes">
              <span> <i class="el-icon-star-off">36</i></span>
              <span>作者:{{ i.user.nickName }}</span>
              <span>所属板块：{{ i.categoryName }}</span>
              <span> 发布时间：{{ i.createTime }} </span>
            </div>
          </div>
        </div>
        <el-pagination background layout="sizes,prev, pager, next" :total="totalSize" :current-page.sync="pageNum"
          :page-sizes="[10, 5, 7, 20]" :page-size="pageSize" @size-change="sizechange" @current-change="currentchange"
          @prev-click="currentchange" @next-click="currentchange" v-show="categoryId !== -1 && pageSize <= totalSize">
        </el-pagination>
      </div>
      <div class="midRight">
        <div class="search">
          <h2>搜索帖子</h2>
          <el-input placeholder="请输入帖子标题" v-model="searchInput" style="width: 65%;margin-right: 10px;" size="medium">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="search()">搜索</el-button>
        </div>
        <div class="talkKind">
          <h2>板块分区</h2>
          <div class="kinds">
            <span v-for="i in kindsList" :key="i.categoryId"
              @click="categoryIdChange(i.categoryId, i.categoryName)"><el-button type="primary" plain>{{ i.categoryName
              }}</el-button></span>
          </div>


        </div>
        <div class="sendNew">
          <el-button type="primary" style="margin-top: 20px" @click="sendArticle">发帖子</el-button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { reqgetCategoryList, reqarticleList, reqhotArticleList, reqwrite, requpdatecustomize, reqinitArticle, reqgetArticleListByTitle, requpdateViewCount } from "@/api";
export default {
  computed: {
    ...mapGetters("user", ["userImg", "userName"]),
  },
  mounted() {
    this.getInfo();

  },
  data() {
    return {
      topTitle: '热门帖子',
      searchInput: '',
      dialogFormVisible: false,
      kindsList: [],
      pageNum: 1,
      pageSize: 10,
      categoryId: -1,
      form: {
        articleId: null,
        categoryId: -1,
        content: "",
        isComment: '',
        title: "",
        status: '1'
      },
      totalSize: -1,
      ArticleList: [],
      formLabelWidth: "120px",
    };
  },
  methods: {
    search() {
      if (!this.searchInput) {
        this.$message({
          showClose: true,
          message: '请填写要搜索的题目'
        });
        return
      }

      this.topTitle = this.searchInput + ""
      this.pageNum = 1;
      this.pageSize = 10;
      this.getArticleListByTitle()
    },
    async getArticleListByTitle() {

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.topTitle
      }

      let res = await reqgetArticleListByTitle(params)
      if (res.code == 200) {
        console.log("res", res)
        this.searchInput = ''
        this.ArticleList = res.data.row
        this.totalSize = res.data.totalSize
      }
    },
    async sendArticle() {
      if (!this.userName) {
        this.$message({
          showClose: true,
          message: '请先登陆'
        });
        return
      }
      this.dialogFormVisible = true
      let res = await reqinitArticle()
      console.log("res12312", res)
      this.form.articleId = res.data.articleId
      this.form.categoryId = res.data.categoryId
      if (res.data.content) {
        this.form.content = res.data.content
      }
      this.form.isComment = res.data.isComment
      this.form.title = res.data.title
    },
    async getInfo() {
      let res2 = await reqhotArticleList();
      if (res2.code == 200) {
        this.ArticleList = res2.data;
        console.log("hotList", this.ArticleList);
      }
      let res = await reqgetCategoryList();
      if (res.code == 200) {
        this.kindsList = res.data;
        this.form.categoryId = this.kindsList[0]
        console.log("kind", res.data);
      }

    },

    async getarticleList() {

      let params = {
        categoryId: this.categoryId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log("params", params);
      let res = await reqarticleList(params);
      if (res.code == 200) {
        this.ArticleList = res.data.row
        this.totalSize = res.data.totalSize
        // console.log("artList", res.data);
      }
    },
    categoryIdChange(id, name) {
      this.topTitle = name
      if (this.categoryId != id) {
        this.categoryId = id
        this.pageNum = 1
        this.pageSize = 10
        this.getarticleList()

      }
    },
    currentchange(pageNum) {
      this.pageNum = pageNum
      let isSearch = true;
      for (let i = 0; i < this.kindsList.length; i++) {
        // console.log("wwww",i)
        if (this.kindsList[i].categoryName == this.topTitle) {
          isSearch = false;
          this.getarticleList()
          break;
        }
      }
      if (isSearch) {
        this.getArticleListByTitle()
      }


    },
    sizechange(pageSize) {
      this.pageSize = pageSize
      this.getarticleList()
    },
    async goItem(id) {
      let res = await requpdateViewCount(id)
      if (res.code == 200) {
        this.$router.push({ path: `/talkspecificitem/${id}` });
      }

    },
    goHome() {
      this.$router.push({ path: "/home" });
    },
    async talkTem() {
      // let params = []
      // let keys = Object.keys(this.form)
      // for (let i = 0; i < keys.length; i++) {
      //   if (this.form[keys[i]]) {
      //     params.push(p)
      //   }
      // }
      console.log("param", this.form)
      let res = await reqwrite(this.form)
      console.log("res", res)
      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: '草稿保存成功',
          type: 'success'
        });
      } else {
        this.$message({
          showClose: true,
          message: '草稿未保存',
        });
      }
      this.dialogFormVisible = false
    },
    async talkAdd() {

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
      this.form.status = '0'
      // console.log("this.form", this.form)
      let res = await reqwrite(this.form)
      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: '发布成功',
          type: 'success'
        });

        this.dialogFormVisible = false
      }



    },
    async imgAdd(pos, file) { //只要放上去就上传到oss
      //单图上传

      // 第一步.将图片上传到服务器.
      let imgData = new FormData();
      imgData.append('file', file);
      let res = await requpdatecustomize(imgData, 'article')
      console.log("Res", res)
      if (res.code == 200) {
        this.$refs.mdedit.$img2Url(pos, res.data);
      }
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      /**
      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      */


    }
  },
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  background-color: rgb(239, 239, 239);
  min-height: 900px;

  .TopNav {
    height: 128px;
    background-color: rgb(35, 37, 38);
    width: 100%;
    position: relative;
    color: white;
    margin-bottom: 20px;

    .nav {
      padding: 20px;
      display: flex;
      width: 17%;
      justify-content: space-between;

      .home {
        cursor: pointer;
        font-size: 16px;
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

  .mid {
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: space-around;

    .list {
      width: 73%;

      .item {
        margin-bottom: 20px;
        width: 100%;
        height: 143px;
        display: flex;
        padding: 20px 0;
        align-items: center;
        border-bottom: 1px solid #cfcfcf;

        .avatar {
          margin-left: 20px;
          margin-right: 20px;

          .avatarImg {
            width: 178px;
            height: 102px;
            overflow: hidden;
            background-size: cover;
          }
        }

        .item-right {
          display: flex;
          flex-direction: column;

          height: 102px;
          width: 100%;

          .title {

            cursor: pointer;
            font-size: 18px;
            height: 30px;
            font-weight: 700;
            color: #222226;
            overflow: hidden;
            white-space: normal;
            word-break: break-word;
            line-height: 25px;
            width: 100%;
            text-overflow: ellipsis;
          }

          .title:hover {
            text-decoration-line: underline;
          }

          .content {

            font-size: 14px;
            font-weight: 400;
            color: #555666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-word;
          }

          .otherMes {
            margin-top: 14px;
            font-weight: 400;
            font-size: 14px;
            color: #555666;
            display: flex;
            justify-content: space-between;
            width: 60%;
          }
        }


      }

      .el-pagination {
        margin-left: 25%;
      }
    }

    .midRight {
      padding: 10px;
      width: 20%;
      height: 300px;

      .talkKind {
        min-height: 160px;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 1px 2px gainsboro;
        padding: 10px 20px;
        margin-top: 20px;

        .kinds {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          span {
            width: 40%;
            margin-top: 5px;

            .el-button {
              width: 100%;
            }
          }
        }
      }

      .search {

        background-color: #fff;
        padding: 20px 5px;
        border-radius: 2px;
        box-shadow: 0 1px 2px gainsboro;


        h2 {
          margin-bottom: 20px;

        }
      }

      .sendNew {
        width: 100%;

        .el-button {
          width: 100%;
          text-align: center;
        }
      }
    }
  }

}
</style>