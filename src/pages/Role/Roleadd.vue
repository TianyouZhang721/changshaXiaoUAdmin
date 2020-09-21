<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/role'}">角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="角色名称"
                          prop="rolename">
                <el-input v-model="ruleForm.rolename"></el-input>
            </el-form-item>

            <el-form-item label="角色权限"
                          prop="menus">
                <el-tree :data="data"
                         show-checkbox
                         node-key="id"
                         :default-expanded-keys="[1]"
                         :default-checked-keys="checkedArr"
                         ref="mytree"
                         :props="defaultProps"
                         check-strictly>
                </el-tree>
            </el-form-item>

            <el-form-item label="状态"
                          prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: "",
            title: "", // 面包屑最后的文字
            buttonTitle: "", // 最后按钮的文字
            menuList: [],
            /**
             * this.$http.post("/menuadd", this.ruleForm).then(res => {
             * })
             */
            ruleForm: { // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
                rolename: "",// 菜单名称
                menus: [],
                status: true
            },
            checkedArr: [], //默认选中
            rules: { // 每个表单元素的验证规则
                rolename: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ]
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        };
    },
    mounted () {
        // 这个组件既做添加也做编辑
        // 1. 面包屑导航文字 2. 最下面的按钮   3. 编辑有回显
        // 获取路由参数id
        console.log(this)
        this.id = this.$route.query.id
        if (this.id) {
            // 说明是点击的编辑
            this.title = "角色编辑"
            this.buttonTitle = "修改"
            this.$http.get("/roleinfo", { id: this.id }).then(res => {
                console.log(res)
                let { status } = res.data.list
                this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }
                this.checkedArr = res.data.list.menus.split(",")
            })
        } else {
            // 说明是点击的添加
            this.title = "角色添加"
            this.buttonTitle = "添加"
        }

        this.$http.get("/menulist", { istree: true }).then(res => {
            console.log(res)
            this.data = res.data.list
        })
    },
    methods: {
        submitForm (formName) {
            // formName "ruleForm"
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过，调用添加的接口
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    this.ruleForm.menus = this.$refs.mytree.getCheckedKeys()
                    if (this.id) {
                        this.$http.post("/roleedit", { ...this.ruleForm, id: this.id }).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        
                        console.log(this.ruleForm.menus)
                        this.$http.post("/roleadd", this.ruleForm).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    }
                } else {
                    // 验证没通过
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="stylus" scoped></style>