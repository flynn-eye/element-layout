<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <vue-page-transition name="fade-in-right">
            <router-view />
        </vue-page-transition>
    </div>
</template>

<script>
    export default {
        name: 'StaffLayout',
        mounted() {},
        data() {
            return {}
        }
    }
</script>

<style lang='scss'>
    .breadcrumb {
        background-color: #FFFFFF;
        margin-top: -10px;
        margin-left: -10px;
        ;
        width: 100vw;
        padding: 10px;
        border-top: 1px solid #E9EBEE;
        margin-bottom: 10px;
    }
</style>