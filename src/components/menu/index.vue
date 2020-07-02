<template>
    <div id='menu'>
        <div v-if='isCollapse'>
            <img class="header" src='../../assets/icon.svg' :style="collapseWidth" />
        </div>
        <div v-else>
            <div class='header' :style="collapseWidth">加班管理系统</div>
        </div>

        <el-menu :collapse-transition='false' background-color="#001529" class="menu" text-color="white" active-text-color="white"
            :unique-opened='true' :collapse='isCollapse' :style="collapseWidth">
                <el-submenu :index="index.key" v-for='(index,key) in menu' :key='key'>
                <template slot="title">
                    <i :class="index.icon"></i>
                    <span slot="title">{{index.name}}</span>
                </template>
                <div v-for='(i,k) in index.children' :key='k'>
                    <el-menu-item @click='handleMenuClick(i)' :index="i.k">{{i.name}}</el-menu-item>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import menuList from '../../util/menuList'

    export default {
        name: 'Menu',
        props: {
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menu:menuList
            }
        },
        computed: {
            collapseWidth() {
                if (this.isCollapse) {
                    return {
                        width: '66px',
                    }
                } else {
                    return {
                        width: '200px',
                    }
                }
            }
        },
        methods:{
            handleMenuClick(i){
                if(this.$router.currentRoute.fullPath!==i.path){
                    this.$router.push(i.path)
                }
                this.$store.commit('commonStore/ADD_tagsConfig',i)
                this.$emit('update')
            }
        }
    }
</script>

<style lang="scss">
    #menu {
        display: flex;
        height: 100vh;
        min-height: 100%;
        flex-direction: column;

        .header {
            height: 3rem;
            line-height: 3rem;
            display: flex;
            background-color: #001529;
            font-size: 1.5rem;
            color: white;
            justify-content: center;
        }

        .menu {
            flex: 1
        }
    }
</style>