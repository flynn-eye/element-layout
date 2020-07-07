<template>
    <div>
        <div class="title" v-if='title'>
            {{title}}
            <span v-if='location'>/{{location}}</span>
        </div>
        <el-divider></el-divider>
        <ul id='scroll' >
            <li @click="handleClick(index)" v-for='(index,key) in  list' :key='key'> {{index.deptName}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Scroll',
    props:{
        list:{
            type:Array,
            default:()=>[]   
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            location:'全部'
        }
    },
    methods:{
        handleClick(row){
            this.location = row.deptName
            this.$emit('ScrollItemClick',row)
        }
    }
}
</script>

<style lang='scss'>
.title{
    font: {
        size: 1.2rem;
        weight: 600;
    }
    span{
        color: #757575;
        font: {
            size: 1rem;
            weight: 500;
        }
    }
}
#scroll{
    width:110px;
    height:400px;
    overflow: auto;
    list-style-type: none;
    li{
        font: {
            size:1rem
        };
        margin: {
            top:5px;
            bottom:10px;
        }
    }
}
</style>