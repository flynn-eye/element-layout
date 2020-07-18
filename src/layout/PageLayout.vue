<template>
  <div id="pageLayout">
    <div>
      <Menu @update="update" :isCollapse="collapse" />
    </div>
    <div class="right">
      <NavBar :collapseClick="collapseClick" :collapse="collapse"></NavBar>
      <ScrollPane></ScrollPane>
      <vue-page-transition name="fade-in-right">
        <router-view class="router" />
      </vue-page-transition>
    </div>
  </div>
</template>

<script>
import Menu from "../components/menu";
import NavBar from "../components/navBar";
import ScrollPane from "../components/scrollpane";
export default {
  name: "PageLayout",
  components: {
    Menu,
    NavBar,
    ScrollPane
  },
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    collapseClick() {
      this.collapse = !this.collapse;
    },
    update() {
      this.$children[2].$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
#pageLayout {
  height: 100%;
  width: 100%;
  display: flex;
  .right {
    flex: 1;
    background-color: #f0f2f5;
    min-width: 500px;
  }
  .router {
    margin: 10px 10px 10px 10px;
    visibility: auto;
  }
}
</style>