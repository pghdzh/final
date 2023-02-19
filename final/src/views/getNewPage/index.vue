<template>
  <div class="main">
    <el-dialog
      title="落选通知"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        很遗憾，您未通过本轮面试，期待下一次能有更好的发挥。
      </span>
      <span slot="footer" class="dialog-footer">
      
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <h1>招新</h1>
    <el-steps :active="StepActive" align-center>
      <el-step title="投递简历" description="投递自己的简要介绍"></el-step>
      <el-step title="初试" description="请前往以下链接下载试题"></el-step>
      <el-step
        title="一面"
        description="选择感兴趣的小组面试（小组负责人面试）"
      ></el-step>
      <el-step title="二面" description="小组指导老师面试"></el-step>
    </el-steps>
    <div class="detailStep">
      <div class="un-start" v-show="StepActive == -1">
        <h1>招新未开始，请留意后续公告消息</h1>
      </div>
      <div class="upIntor" v-show="StepActive == 0">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传简介文件</div>
        </el-upload>
        <div class="btn">
          <el-button type="primary" @click="clickUp"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
          <div class="tip" v-show="showtip">
            简历已投递，请留意主页消息通知。
          </div>
        </div>
      </div>
      <div class="writtenTest" v-show="StepActive == 1">
        <div class="testDownload">
          试题下载链接：
          <router-link to="">试题链接</router-link>
        </div>
        <div class="testUpload">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传答卷</div>
          </el-upload>
          <div class="btn">
            <el-button type="primary" @click="clickUp"
              >上传<i class="el-icon-upload el-icon--right"></i
            ></el-button>
            <div class="tip" v-show="showtip">
              答卷已上传，请留意主页消息通知。
            </div>
          </div>
        </div>
      </div>
      <div class="selectGroup" v-show="StepActive == 2">
        <div class="selectTop">恭喜你进入一轮面试，请选择想加入的小组</div>
        <el-radio-group v-model="radio" :disabled="isSelect">
          <el-radio :label="1">小组1</el-radio>
          <el-radio :label="2">小组2</el-radio>
          <el-radio :label="3">小组3</el-radio>
          <el-radio :label="4">小组4</el-radio>
        </el-radio-group>
        <div class="groupIntor">
          <el-card class="group" v-show="radio == i" v-for="i in 4" :key="i">
            小组{{ radio }}介绍 Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nam harum ducimus, aperiam totam sapiente at
            mollitia laborum, soluta assumenda vel eos esse voluptatibus odio
            laboriosam quasi et, fugit beatae. Aperiam?
          </el-card>
        </div>
        <div class="btn">
          <el-button type="primary" @click="clickSelect"
            >确认选择小组{{ radio }}</el-button
          >
          <div class="tip" v-show="showtip">
            小组已选择，请留意主页消息通知。
          </div>
        </div>
      </div>
      <div class="teacherInterview" v-show="StepActive == 3">
        <h1>恭喜你进入最后一轮面试</h1>
        <div class="link">
          小组老师联系方式如下，请自行联系考核
          <div>qq:12345678</div>
        </div>
      </div>
      <div class="next">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button type="primary" @click="dialogVisible = true">落选</el-button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "suggestPage",
  data() {
    return {
      StepActive: -1,
      showtip: false,
      radio: 1,
      isSelect: false,
      dialogVisible: false,
    };
  },
  methods: {
  
    nextStep() {
      this.StepActive += 1;
      this.showtip = false;
    },
    clickUp() {
      this.showtip = true;
    },
    clickSelect() {
      this.showtip = true;
      this.isSelect = true;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin-top: 60px;
  height: 800px;
  padding: 20px;
  background-color: rgb(239, 239, 239);
  .btn {
    margin-top: 40px;
    .tip {
      color: #409eff;
    }
  }
  .detailStep {
    position: relative;
    text-align: center;
    height: 500px;
    padding-top: 40px;

    .writtenTest {
      .testDownload {
        font-size: large;
        font-weight: bold;
        margin-bottom: 40px;
        a {
          color: #409eff;
        }
      }
    }
    .selectGroup {
      .selectTop {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .groupIntor {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .group {
          width: 400px;
          height: 200px;
        }
      }
    }
    .teacherInterview {
      .link {
        margin-top: 20px;
        font-size: 12px;
      }
    }
    .next {
      position: absolute;
      left: 0;
      bottom: 100px;
    }
  }
}
</style>