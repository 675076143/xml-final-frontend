<template>
    <Menu active-name="1" class="left-nav" @on-select="redirect">
        <MenuItem v-for="menu in menus" :name="menu.key">
            <Icon :type="menu.icon" />
            {{menu.title}}
        </MenuItem>

    </Menu>
</template>

<script>
  import menuConfig from "../config/menuConfig";
  export default {
    name: "LeftNav",
    data(){
      return{
        menus:menuConfig
      }
    },
    methods:{
      redirect(name){
        console.log("redirect=>",name)
        console.log('menus=>',this.menus)
        this.$router.push(name)
      },
    }
  }
</script>

<style scoped lang="less">
.left-nav{
    position: fixed;
    left: 0;
    top: 49px;
    height: 100%;
    width: 180px !important;
    z-index: 1000;
}
</style>
