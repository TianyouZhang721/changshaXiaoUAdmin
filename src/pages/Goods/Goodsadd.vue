<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="一级分类"
                          prop="first_cateid">
                <el-select v-model="ruleForm.first_cateid"
                           placeholder="请选择一级"
                           @change="firstCateChange">
                
                    <el-option :label="item.catename"
                               :value="item.id"
                               v-for="(item, index) in firstCateList"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="二级分类"
                          prop="second_cateid">
                <el-select v-model="ruleForm.second_cateid"
                           placeholder="请选择二级分类">
                    <el-option :label="item.catename"
                               :value="item.id"
                               v-for="(item, index) in secondCateList"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品名称"
                          prop="goodsname">
                <el-input v-model="ruleForm.goodsname"></el-input>
            </el-form-item>

            <el-form-item label="价格"
                          prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>

            <el-form-item label="市场价格"
                          prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>


             <el-form-item label="图片">
                <el-upload action="#"
                           list-type="picture-card"
                           :auto-upload="false"
                           :on-change="change"
                           :file-list="arr"
                           >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品规格"
                          prop="specsid">
                <el-select v-model="ruleForm.specsid"
                           placeholder="请选择规格" @change="specsChange">
                    <el-option :label="item.specsname"
                               :value="item.id"
                               v-for="(item, index) in specsList"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="规格属性"
                          prop="specsattr">
                <el-select v-model="ruleForm.specsattr"
                           placeholder="请选择规格属性">
                    <el-option :label="item"
                               :value="item"
                               v-for="(item, index) in specsAttr"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否新品"
                          prop="isnew">
                <el-radio-group v-model="ruleForm.isnew">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>

             <el-form-item label="是否热卖"
                          prop="ishot">
                <el-radio-group v-model="ruleForm.ishot">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
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
            firstCateList: [],
            secondCateList: [],
            specsList: [],
            specsAttr: [],
            arr: [],
            /**
             * this.$http.post("/menuadd", this.ruleForm).then(res => {
             * })
             */
            img: "",
            ruleForm: { // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
                first_cateid: "",
                second_cateid: "",
                goodsname: "",
                price: "",
                market_price: "",
                description: "",
                specsid: "",
                specsattr: "",
                isnew: "",
                ishot: "",
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
            this.title = "商品编辑"
            this.buttonTitle = "修改"
            this.$http.get("/goodsinfo", { id: this.id }).then(res => {
                console.log(res)
                let { status } = res.data.list
                this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }
                delete this.ruleForm.img
                if (res.data.list.img) {
                    this.arr.push({
                    url: "http://localhost:3000" + res.data.list.img
                })
                }
                
                this.firstCateChange(res.data.list.first_cateid)
            })
        } else {
            // 说明是点击的添加
            this.title = "商品添加"
            this.buttonTitle = "添加"
        }

        this.$http.get("/catelist", { pid: 0 }).then(res => {
            console.log(res)
            this.firstCateList = res.data.list
        })


        this.$http.get("/specslist").then(res => {
            this.specsList = res.data.list
        })
    },
    methods: {
        specsChange(id) {
            console.log("change")
            this.$http.get("/specsinfo", {id}).then(res => {
                console.log(res)
                this.specsAttr = res.data.list[0].attrs
            })
        },
        change(file, filelist) {
            console.log(file)
            this.img = file.raw
        },
        // 一级分类的改变
        firstCateChange(id) {
            console.log(id)
            this.$http.get("/catelist", { pid: id }).then(res => {
                console.log(res)
                this.secondCateList = res.data.list
            })
        },
        submitForm (formName) {
            console.log("submit")
            // formName "ruleForm"
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过，调用添加的接口
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    let form = new FormData()
                    console.log(this.ruleForm)
                    for(var key in this.ruleForm) {
                        form.append(key, this.ruleForm[key])
                    }
                    if (this.img) {

                        form.append("img", this.img)
                    }
                    if (this.id) {
                        form.append("id", this.id)
                        this.$http.post("/goodsedit", form).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        this.$http.post("/goodsadd", form).then(res => {
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

<style lang="stylus" scoped>

</style>