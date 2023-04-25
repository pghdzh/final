<template>
  <div class="main">
    <div class="container">
      <div class="list">
        <div class="item" v-for="i in pageSize">
          <div class="item-left">
            <div class="avatar">
              <img src="@/assets/avatar.webp" alt="">
            </div>
            <div class="autor">
              <div class="name">
                pgh
              </div>
              <div class="downloadNum">
                99个下载
              </div>
            </div>
          </div>
          <div class="item-mid">
            <div class="title">
              资源标题
            </div>
            <div class="intor">
              简要介绍Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. At cupiditate dignissimos magnam nobis
              praesentium culpa mollitia libero, ipsa iure vel asperiores enim quia delectus numquam magni sapiente illo
              eius quisquam. ipsum dolor sit amet consectetur adipisicing elit. Esse ullam maxime aperiam eveniet
              consequuntur itaque quisquam quas, voluptates illum magnam, delectus quod aut veniam ex ipsa tempore tenetur
              mollitia in?
            </div>
          </div>
          <div class="item-right" @click="downLoad">
            <i class="el-icon-download">
              下载
            </i>
          </div>
        </div>
        <el-pagination background layout="sizes,prev, pager, next" :total="totalSize" :current-page.sync="pageNum"
          :page-sizes="[5, 7, 10, 20]" :page-size="pageSize" @size-change="sizechange" @current-change="currentchange"
          @prev-click="currentchange" @next-click="currentchange" v-show="true">
        </el-pagination>
      </div>
      <div class="right">
        <div class="search">
          <h2>搜索资源</h2>
          <el-input placeholder="请输入资源 标题" v-model="searchInput" style="width: 65%;margin-right: 10px;" size="medium">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="search()">搜索</el-button>
        </div>
        <div class="sendNew">
          <el-button type="primary" style="margin-top: 20px" @click="dialogFormVisible = true">上传资源</el-button>
        </div>
        <el-dialog title="资源详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="标题" style="width: 40%;">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="简要介绍">
              <el-input v-model="form.content" type="textarea" :rows="2" placeholder="请输入简介"></el-input>
            </el-form-item>
            <el-form-item label="具体资源">

              <el-upload class="upload-demo" drag action="" :on-success="handleSuccess" :before-upload="beforeUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传 doc/docx/pdf文件，且不超过10M</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="fileAdd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "filePage",
  data() {
    return {
      pageNum: 1,
      pageSize: 7,
      totalSize: 100,
      searchInput: '',
      dialogFormVisible: false,
      form: {
        content: "",
        title: "",
        fileUrl: '',
      },
    }
  },
  computed: {
    ...mapGetters("user", ["userImg", "userName"]),
  },
  methods: {
    currentchange(pageNum) {
      this.pageNum = pageNum
    },
    sizechange(pageSize) {
      this.pageSize = pageSize
    },
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      console.table(file)
      const isJPG = (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/pdf');
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传文件只能是 doc/docx/pdf格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    fileAdd() {
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
      this.dialogFormVisible = false
      this.$message({
        showClose: true,
        message: '上传文件成功',
        type: 'success'
      })
    },
    downLoad() {
      if (!this.userName) {
        this.$message({
          showClose: true,
          message: '请先登陆'
        })
        return
      }
    }
  }
};
</script>

<style scoped lang="less">
.main {
  margin-top: 60px;
  min-height: 800px;
  background-color: rgb(239, 239, 239);
  padding: 20px 0;

  .container {
    width: 80%;

    min-height: 800px;
    margin: 0 10%;
    display: flex;
    justify-content: space-around;

    .list {
      width: 73%;

      .item {
        height: 100px;
        border: 1px solid #000;
        margin: 10px 0;
        display: flex;
        border: 1px solid gainsboro;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 1px 3px gainsboro;
        box-sizing: border-box;

        .item-left {
          width: 20%;
          display: flex;
          margin-left: 20px;

          .avatar {
            margin-right: 10px;

            img {
              width: 70px;
              height: 70px;
              border-radius: 50%;

              border: 1px solid #e6eaf0;

            }
          }

          .autor {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name {
              margin-bottom: 20px;
              font-size: 16px;
            }

            .downloadNum {
              font-size: 10px;

            }
          }


        }

        .item-mid {
          margin-left: 20px;
          width: 70%;

          .title {
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bolder;
          }

          .intor {
            font-size: 12px;
            color: gray;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        .item-right:hover {
          color: #409eff;
          cursor: pointer;
        }

      }

      .el-pagination {
        margin-left: 25%;
      }
    }

    .right {
      width: 20%;

      .search {
        padding: 20px 5px;
        border-radius: 2px;

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