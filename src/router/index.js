import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: "/",
        redirect: "/menu"
    },
    {
        path: "/home",
        component: () => import("@/pages/Home/Home")
    },
    {
        path: "/login",
        component: () => import("@/pages/Login/Login")
    },
    {
        path: "/menu",
        component: () => import("@/pages/Menu/Menu")
    },
    {
        path: "/menu/add",
        component: () => import("@/pages/Menu/Menuadd")
    },
    {
        path: "/menu/edit",
        component: () => import("@/pages/Menu/Menuadd")
    },
    {
        path: "/role",
        component: () => import("@/pages/Role/Role")
    },
    {
        path: "/role/add",
        component: () => import("@/pages/Role/Roleadd")
    },
    {
        path: "/role/edit",
        component: () => import("@/pages/Role/Roleadd")
    },
    {
        path: "/user",
        component: () => import("@/pages/User/User")
    },
    {
        path: "/user/add",
        component: () => import("@/pages/User/Useradd")
    },
    {
        path: "/user/edit",
        component: () => import("@/pages/User/Useradd")
    },
    {
        path: "/category",
        component: () => import("@/pages/Category/Category")
    },
    {
        path: "/category/add",
        component: () => import("@/pages/Category/Categoryadd")
    },
    {
        path: "/category/edit",
        component: () => import("@/pages/Category/Categoryadd")
    },
    {
        path: "/specs",
        component: () => import("@/pages/Specs/Specs")
    },
    {
        path: "/specs/add",
        component: () => import("@/pages/Specs/Specsadd")
    },
    {
        path: "/specs/edit",
        component: () => import("@/pages/Specs/Specsadd")
    },
    {
        path: "/goods",
        component: () => import("@/pages/Goods/Goods")
    },
    {
        path: "/goods/add",
        component: () => import("@/pages/Goods/Goodsadd")
    },
    {
        path: "/goods/edit",
        component: () => import("@/pages/Goods/Goodsadd")
    }
  ]
})
