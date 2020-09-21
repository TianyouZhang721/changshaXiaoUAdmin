<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>规格管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加按钮 -->
        <el-button type="primary"
                   @click="goAdd">添加</el-button>
        <!-- 表格数据 -->
        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id"
                             label="规格编号"
                             width="180">
            </el-table-column>
            <el-table-column prop="specsname"
                             label="规格名称"
                             width="180">
            </el-table-column>
            <el-table-column
                             label="规格属性">
                <template slot-scope="scope">
                    <el-tag v-for="(item, index) in scope.row.attrs" :key="index">{{ item }}</el-tag>
                </template>
            </el-table-column>
                
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.status | statusFormat}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除吗"
                                   @onConfirm="del(scope.row.id)">
                        <el-button slot="reference"
                                   size="mini"
                                   type="danger">删除</el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: []
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            this.$http.get("/specslist").then(res => {
                console.log(res)
                this.tableData = res.data.list
            })
        },
        handleEdit (index, row) {
            console.log(index, row);
            this.$router.push("/specs/edit?id=" + row.id)
        },
        del (id) {
            console.log("真的删除")
            // 调用删除的接口
            this.$http.post("/specsdelete", { id }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.getList()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
            })
        },
        goAdd () {
            this.$router.push("/specs/add")
        }
    },
}
</script>

<style lang="stylus" scoped></style>