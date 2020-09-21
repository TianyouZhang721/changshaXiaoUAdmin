<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs'}">规格管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="规格名称"
                          prop="specsname">
                <el-input v-model="ruleForm.specsname"></el-input>
            </el-form-item>

<!-- [{value: "1"}] -->
            <el-form-item v-for="(item, index) in ruleForm.attrs"
                          :label="'规格属性' + index"
                          :key="index">
                <el-input v-model="item.value"></el-input>
                <el-button @click="addDomain"
                           v-if="index == 0">新增属性</el-button>
                <el-button @click.prevent="removeDomain(item)"
                           v-if="index != 0">删除</el-button>
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
                specsname: "",
                attrs: [
                    {
                        value: ""
                    }
                ],
                status: true
            },
            rules: { // 每个表单元素的验证规则
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ],
                pid: [
                    { required: true, message: '请选择上级菜单', trigger: 'change' }
                ]
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
            this.title = "规格编辑"
            this.buttonTitle = "修改"
            this.$http.get("/menuinfo", { id: this.id }).then(res => {
                console.log(res)
                let { status } = res.data.list
                this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }

            })
        } else {
            // 说明是点击的添加
            this.title = "规格添加"
            this.buttonTitle = "添加"
        }

        this.$http.get("/menulist").then(res => {
            console.log(res)
            this.menuList = res.data.list
        })
    },
    methods: {
        removeDomain (item) {
            var index = this.ruleForm.attrs.indexOf(item)
            if (index !== -1) {
                this.ruleForm.attrs.splice(index, 1)
            }
        },
        addDomain () {
            this.ruleForm.attrs.push({
                value: ''
            });
        },
        submitForm (formName) {
            // formName "ruleForm"
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过，调用添加的接口
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    if (this.id) {
                        this.$http.post("/menuedit", { ...this.ruleForm, id: this.id }).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        // [{value: "黑色"}, {value: "白色"}, {value: "红色"}] =》 "黑色,白色,红色"
                        this.ruleForm.attrs = this.ruleForm.attrs.map(item => {
                            return item.value
                        }).join(",")
                        this.$http.post("/specsadd", this.ruleForm).then(res => {
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