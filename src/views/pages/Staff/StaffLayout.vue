<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span @click="handle('/pageLayout/StaffLayout/staffManager')">员工管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="location">{{location.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <vue-page-transition name="fade-in-right">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "StaffLayout",
  methods: {
    handle(path) {
      if (this.$router.history.current.path !== path) {
        this.$router.push(path);
        this.SETlocation(null);
      }
    },
    ...mapMutations("staffManager", { SETlocation: "SETlocation" })
  },
  data() {
    return {};
  },
  computed: mapState("staffManager", { location: state => state.location })
};
</script>

<style lang='scss'>
.breadcrumb {
  background-color: #ffffff;
  margin-top: -10px;
  margin-left: -10px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #e9ebee;
  margin-bottom: 10px;
}
</style>