<template>
    <el-col :span="24">
        <!-- router开启之后，所有的el-menu-item 的 index就是路由跳转的路径 -->
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 
                 router>
            <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu :index="index.toString()" v-for="(item, index) in menus" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item 
                v-for="(val, i) in menus[index].children" 
                :key="val.id" 
                :index="val.url">{{val.title}}</el-menu-item>
            </el-submenu>
           
        </el-menu>
    </el-col>
</template>

<script>
export default {
    computed: {
        menus() {
            return this.$store.state.user.menus
        }
    }
}
</script>

<style lang="stylus" scoped></style>