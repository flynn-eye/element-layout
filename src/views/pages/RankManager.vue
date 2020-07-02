<template>
    <div>
        <el-card>
            <el-button type="primary" size="mini" @click="()=>{dialogVisible = true;rankName = ''}">添加职级</el-button>
            <el-table :data="dataSource" v-loading="tableLoading">
                <el-table-column type="index" label="索引"></el-table-column>
                <el-table-column label="职级id" prop='rankId'></el-table-column>
                <el-table-column label="职级名称" prop='rankName'></el-table-column>
                <el-table-column label="删除" prop='del'>
                    <template slot-scope="scope">
                       <a @click='delRank(scope.row.rankId)'>删除</a>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="添加职级" :visible.sync="dialogVisible" width="30%">
            <el-form>
                <el-form-item>
                    <el-input prefix-icon='el-icon-data-analysis' type="text" v-model="rankName"
                        autocomplete="off" placeholder="职级名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{dialogVisible = false;rankName = ''}">取 消</el-button>
                <el-button type="primary" @click="addRank">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {Message} from 'element-ui'
    export default {
        mounted(){
           this.loadRankList()
        },
        name: 'RankManager',
        methods:{
            loadRankList(){
                this.tableLoading = true
                this.$store.dispatch('rankManager/getRankList')
                .then(res=>{
                    setTimeout(()=>{
                        this.tableLoading = false
                        this.dataSource = res.data.ranks
                    },0.5*1000)
                    
                })
            },
            delRank(rankId){
                this.$store.dispatch('rankManager/delRank',rankId)
                    .then(res=>{
                        if(res.code='200'){
                            Message(
                                {
                                    message:res.message,
                                    type:'success'
                                }
                            )
                            this.loadRankList()
                        }else{
                            Message(
                                {
                                    message:res.message,
                                    type: 'warning'
                                }
                            )
                        }
                    })
            },
            addRank(){
                this.$store.dispatch('rankManager/addRank',{rankName:this.rankName})
                    .then(res=>{
                        this.rankName = ''
                        if(res.code='200'){
                            Message(
                                {
                                    message:res.message,
                                    type:'success'
                                }
                            )
                        }else{
                            Message(
                                {
                                    message:res.message,
                                    type: 'warning'
                                }
                            )
                        }
                        this.dialogVisible = false
                        this.loadRankList()
                    })
            }
        },
        data() {
            return {
                rankName:'',
                dialogVisible:false,
                tableLoading:false,
                dataSource: [
                ]
            }
        }
    }
</script>

<style lang='scss'>

</style>