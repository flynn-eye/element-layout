3wsr  op k    =-04365reesrtemplate>
    <div>
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
        <vue-page-transition name="fade-in-right">
            <router-view/>
        </vue-page-transition>
    </div>
</template>

<script>
export default {
    name: 'StaffLayout',
    mounted(){
    }
}
</script>

<style lang='scss'>

</style>