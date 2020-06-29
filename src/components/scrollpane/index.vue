<template>
  <div id='tagsNav' >
    <el-tag
    class='tag'
     v-for="(index,key) in tagsConfig"
     :key='key'
     closable
     size="small"
     :effect='index.effect'
     @click='handleClick(index,key)'
     :disable-transitions='true'
     @close='colse(index,key)'>
     {{index.name}}
     </el-tag>
  </div>
</template>

<script>
export default {
  name:'ScrollPane',
  data(){
    return{
      tagsConfig:this.$store.state.commonStore.tagsConfig
    }
  },
  methods:{
    colse(index,key){
      this.$store.commit('commonStore/Del_tagsConfig',key)
      if(index.path===this.$router.currentRoute.fullPath&&this.$store.state.commonStore.tagsConfig.length>0){
        this.$router.push(this.$store.state.commonStore.tagsConfig[0].path)
        this.$store.commit('commonStore/Update_tagsConfig',0)
      }
    },
    handleClick(index,key){
      if(this.$router.currentRoute.fullPath!==index.path){
        this.$store.commit('commonStore/Update_tagsConfig',key)
        this.$router.push(index.path)
        this.$forceUpdate()
      }
    }
  }   
}
</script>

<style lang='scss' scoped>
#tagsNav{
  background-color: white;
  overflow:auto;
  border-top: 1px #E3E3E3 solid;
  .tag{
    margin:{
      top:5px;
      bottom: 5px;
      left:5px
    }
  }
}
</style>