<template>
    <div class="main">
        <div class="topArea">

            <h3>当前招新进度：未开始</h3>
            <el-button type="primary">开始招新</el-button>
            <el-steps :active="-1" align-center>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>

        </div>

        <div class="midTable">
            <h3>候选人列表</h3>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" >
                </el-table-column>
                <el-table-column prop="name" label="姓名">

                </el-table-column>
                <el-table-column prop="number" label="学号">
                </el-table-column>
                <el-table-column label="是否已投递简历"  align="center">
                    是
                </el-table-column>
                <el-table-column label="一面审核人" >
                </el-table-column>
                <el-table-column label="二面审核人">
                </el-table-column>
                <el-table-column label="三面审核人" >
                </el-table-column>
                <el-table-column prop="prop" label="操作" align="center" >
                    <template slot-scope="{ row }">
                        <el-button type="primary" size="mini">查看资料(简历/答卷)</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
</div>
</template>
<script>








export default {
    data() {
        return {
            tableData: [{
                name: '王小虎',
                number: '1905200128'
            }, {
                name: '王小虎',
                number: '1905200128'
            }, {
                name: '王小虎',
                number: '1905200128'
            },
            {
                name: '王小虎',
                number: '1905200128'
            }, {
                name: '王小虎',
                number: '1905200128'
            }],
            multipleSelection: []
        }
    },
    mounted() {

    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log('asd', this.multipleSelection)
        }
    },
    computed: {

    },
}
</script>
<style scoped lang='scss'>
.main {
    padding: 0 20px;

    .topArea {
        margin: 20px 0;
    }

    .midTable {
        margin-top: 40px;
    }
}
</style>
