<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总贴子数" count="128">
            <template slot="charts">
              <span>
                周同比 &nbsp; &nbsp;56.7%
                <i class="el-icon-caret-top" style="color:red;"></i>
              </span>
              <span>
                日同比 &nbsp; &nbsp;19.96%
                <i class="el-icon-caret-bottom" style="color:green"></i>
              </span>
            </template>
            <template slot="footer">
              <span>日帖子数 12</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="884">
            <template slot="charts">
              <lineChart/>
            </template>
             <template slot="footer">
              <span>日访问量 12</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from "./lineChart"
import barCharts from "./barChart"
import programChart from './programChart'
export default {
  name: "",
  components: {
    Detail,
    lineChart,
    barCharts,
    programChart
  },
};
</script>

<style>
</style>