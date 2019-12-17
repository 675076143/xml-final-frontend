<template>
  <div class="home">
    <top-bar></top-bar>
    <left-nav></left-nav>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import LeftNav from "../components/LeftNav";
import TopBar from "../components/TopBar";
import User from "./User";
export default {
  name: 'home',
  components: {
    LeftNav,
    TopBar,
    User
  }
}
</script>
<style scoped lang="less">
  .content{
    padding-left:190px;
    padding-top: 59px;
    height: 100%;
    width: 100%;
  }
</style>
