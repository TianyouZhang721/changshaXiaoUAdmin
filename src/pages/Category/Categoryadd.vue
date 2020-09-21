<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/category'}">商品分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="上级分类"
                          prop="pid">
                <el-select v-model="ruleForm.pid"
                           placeholder="请选择分类">
                    <el-option label="顶级分类"
                               :value="0"></el-option>
                    <el-option :label="item.catename"
                               :value="item.id"
                               v-for="(item, index) in menuList"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="分类名称"
                          prop="catename">
                <el-input v-model="ruleForm.catename"></el-input>
            </el-form-item>

            <el-form-item label="图片">
                <el-upload action="#"
                           list-type="picture-card"
                           :auto-upload="false"
                           :on-change="change"
                           :file-list="arr">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <!-- <input type="file" @change="change"> -->

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
            arr: [],
            id: "",
            title: "", // 面包屑最后的文字
            buttonTitle: "", // 最后按钮的文字
            menuList: [],
            /**
             * this.$http.post("/menuadd", this.ruleForm).then(res => {
             * })
             */
            ruleForm: { // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
                pid: "", //上级分类编号
                catename: "",
                img: "",
                status: true
            },
            rules: { // 每个表单元素的验证规则
                catename: [
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
            this.title = "商品分类编辑"
            this.buttonTitle = "修改"
            this.$http.get("/cateinfo", { id: this.id }).then(res => {
                console.log(res)
                let { status } = res.data.list
                this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }
                this.arr.push({
                    url: "http://localhost:3000" + res.data.list.img
                })

            })
        } else {
            // 说明是点击的添加
            this.title = "商品分类添加"
            this.buttonTitle = "添加"
        }

        this.$http.get("/catelist", {pid: 0}).then(res => {
            console.log(res)
            this.menuList = res.data.list
        })
    },
    methods: {
        change(file, filelist) {
            console.log(file)
            console.log(filelist)
            this.ruleForm.img = file.raw
        },
        submitForm (formName) {
            // formName "ruleForm"
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过，调用添加的接口
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    // 生成一个formData对象
                    let form = new FormData()
                    // 往这个formData对象内，添加键值对
                    for(var key in this.ruleForm) {
                        form.append(key, this.ruleForm[key])
                    }
                    if (this.id) {
                        form.append("id", this.id)
                        this.$http.post("/cateedit", form).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {



                        this.$http.post("/cateadd", form).then(res => {
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