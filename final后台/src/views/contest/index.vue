<template>
    <div class="main">
        <el-button type="primary" @click="dialogFormVisible=true">添加招募</el-button>
        <el-dialog title="添加招募" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80px">
                <el-form-item label="比赛名称" style="width: 50%">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="招募人数">
                    <el-input-number v-model="form.personNums" :step="1"></el-input-number></el-form-item>
                <el-form-item label="截止时间" style="width: 50%">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%"
                        value-format="yyyy-MM-dd"></el-date-picker>
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
                <el-button type="primary" @click="dialogFormVisible = false" @click.native="submitForm">确 定</el-button>
            </div>
        </el-dialog>
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
                        <el-tag :type="tagType[Math.floor(Math.random() * 5)]" disable-transitions>{{
                            scope.row.tag
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="openDel(row)">删除</el-button>
                        <el-button type="primary" size="mini">查看详情</el-button>
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
export default {
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
        }
    },
    mounted() {

    },
    methods: {
        openDel(row) {
            this.$confirm("此操作将删除该招募, 是否继续?", "提示", {
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
        },
    },
    computed: {

    },
}
</script>
<style scoped lang='scss'>
.main {
    padding: 0 20px;
    width: 100%;

    .midForm {
        border-radius: 4px;
        width: 100%;
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
