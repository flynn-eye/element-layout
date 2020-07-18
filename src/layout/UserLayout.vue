<template>
  <div id="userLayout">
    <router-view></router-view>
  </div>
</template>

<script>
import { post } from "../util/http";
export default {
  name: "UserLayout"
};
</script>

<style lang="scss">
#userLayout {
  height: 100vh;
  background: url(../assets/background.svg);
  .form {
    padding: 150px;
  }
}
</style>