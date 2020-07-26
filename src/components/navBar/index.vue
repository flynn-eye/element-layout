<template>
  <div id="navbar">
    <i :class="collapseIcon" style="font-size:2rem;line-height:50px" @click="collapseClick"></i>
    <el-dropdown style="margin-right:30px;line-height:50px" @command="exit">
      <span>
        <img src="../../assets/bigUserHeader.png" class="userHeader" alt />
        <span style="white-space:nowrap;">系统管理员</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    collapseClick: {
      type: Function
    }
  },
  data() {
    return {};
  },
  computed: {
    collapseIcon() {
      if (this.collapse) {
        return "el-icon-s-unfold";
      } else {
        return "el-icon-s-fold";
      }
    }
  },
  methods: {
    exit(value) {
      if (value === "exit") {
        localStorage.setItem("token", "");
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style lang="scss">
#navbar {
  background-color: #ffffff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  vertical-align: middle;
  .userHeader {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
  }
}
</style>