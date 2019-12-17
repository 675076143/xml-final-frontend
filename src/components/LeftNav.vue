<template>
    <Menu class="left-nav" @on-select="redirect">
        <MenuItem v-for="menu in menus" :name="menu.key" :key="menu.key">
            <Icon :type="menu.icon" />
            {{menu.title}}
        </MenuItem>

    </Menu>
</template>

<script>
  import menuConfig from "../config/menuConfig";
  import store from '../store'
  export default {
    name: "LeftNav",
    data(){
      return{
        menus:'',
        user:store.state.user
      }
    },
    mounted() {
      console.log('left-nav:mounted')
      this.menus=[...menuConfig]
      console.log('初始menu=>',menuConfig)
      console.log('this.store.user=>',this.user)
      console.log(this.user.role);
      if(this.user.role === 'teacher'){
        this.menus.splice(1,1)
      }else if(this.user.role === 'student'){
        this.menus.splice(0,2)
      };
      console.log('过滤后menu=>',this.menus)

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
