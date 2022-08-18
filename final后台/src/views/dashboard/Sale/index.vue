<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div class="clearfix" slot="header">
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="小组1" name="one"></el-tab-pane>
        <el-tab-pane label="小组2" name="two"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "",
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: this.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
          color: "yellowgreen",
        },
      ],
    });
  },
  data() {
    return {
      activeName: "one",
      mycharts: null,
      //收集日历数据
      date: [],
      listState: {
        orderFullYearAxis: [
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
        ],
        orderFullYear: [
          41, 82, 20, 33, 39, 33, 22, 15, 82, 20, 14, 20, 82, 20, 14, 20,
        ],
        userFullYearAxis: [
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
          "nhh",
          "cy",
          "pgh",
        ],
        userFullYear: [11, 12, 9, 20, 15, 21, 19, 9, 88, 10, 25, 30],
      },
    };
  },
  computed: {
    title() {
      return this.activeName == "one" ? "小组1签到" : "小组2签到";
    },
  },
  watch: {
    title() {
      console.log("修改配置数据");
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.listState == "小组1签到"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "小组1签到"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: "yellowgreen",
          },
        ],
      });
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
  cursor: pointer;
}

.charts {
  width: 100%;
  height: 300px;
}
</style>