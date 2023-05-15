<template>
    <div class="main">
        <div class="btns">
            <el-button type="primary" @click="addKind">添加分类</el-button>
        </div>
        <el-dialog title="添加分类" :visible.sync="dialogVisibleKind" width="50%">
            <span>
                <el-form ref="fromKind" :model="formKind">
                    <el-form-item label="分类">
                        <el-input placeholder="请输入分类" v-model="formKind.kind">
                        </el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleKind = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleKind = false">确定</el-button>
            </span>
        </el-dialog>
        <el-table :data="kind" style="width: 100%">
        <el-table-column prop="ID" label="ID" width="80">
        </el-table-column>
        <el-table-column prop="title" label="分类" width="180">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="200" header-align="left">
            <template slot-scope="{ row }">
                <el-button type="danger" size="mini" @click="openDel(row)">删除</el-button>
                <el-button type="primary" size="mini" @click="openDetail(row)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>

</template>

<script>
export default {
    data() {
        return {

            dialogVisibleKind: false,
            formKind: { kind: "" },
            kind: [{ ID: 1, title: '分类1', },
            { ID: 2, title: '分类2' },
            { ID: 3, title: '分类3' },
            { ID: 4, title: '分类4' },
            ]
        }
    },
    methods: {
        addKind() {
            this.dialogVisibleKind = true
        },
    }
};
</script>

<style scoped lang='scss'></style>