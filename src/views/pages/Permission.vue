<template>
  <div>
    <el-card>
      <el-table :data="dataSource" v-loading="tableLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="职级id" prop="rankId"></el-table-column>
        <el-table-column label="职级名称" prop="rankName"></el-table-column>
        <el-table-column label="操作" prop="oper">
          <template slot-scope="scope">
            <a @click="updateRank(scope.row)">更新</a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改权限" :visible.sync="updateFormVisible" width="30%">
      <el-checkbox-group v-model="updateValue">
        <el-row v-for="(index,key) in menuList" :key="key">
          <el-checkbox :label="index.menuId">{{index.name}}</el-checkbox>
        </el-row>
      </el-checkbox-group>
      <el-button type="primary" @click="changePermission">修改权限</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { put } from "../../util/http.js";
export default {
  name: "Permission",
  data() {
    return {
      dataSource: [],
      tableLoading: false,
      updateFormVisible: false,
      menuList: [],
      updateValue: [],
      rankId:null
    };
  },
  methods: {
    changePermission(){
      this.$store.dispatch("commonStore/changePermission", {menuIds:this.updateValue,rankId:this.rankId})
        .then(res=>{
          this.updateFormVisible = false
           Message({
            message: res.message,
            type: "success"
          });
        })
    },
    getAcessMenu(menu) {
      if (menu.children === null) {
        return this.updateValue.push(menu.menuId);
      }
      if(menu.hasOwnProperty('children')&&menu.children.length===0){
        return this.updateValue.push(menu.menuId);
      }
      if (menu.children.length > 0) {
        for (let i = 0; i < menu.children.length; i++) {
          this.getAcessMenu(menu.children[i]);
        }
      }
    },
    updateRank(data) {
      this.rankId = data.rankId
      this.updateFormVisible = true;
      this.$store.dispatch("commonStore/getMenuById", data).then((res) => {
        this.updateValue = [];

        for (let i = 0; i < res.data.length; i++) {
          this.getAcessMenu(res.data[i]);
        }
      });
    },
    loadRankList() {
      this.tableLoading = true;
      this.$store.dispatch("rankManager/getRankList").then((res) => {
        setTimeout(() => {
          this.tableLoading = false;
          this.dataSource = res.data.ranks;
        }, 0.5 * 1000);
      });
    },
  },
  mounted() {
    this.loadRankList();
    this.$store.dispatch("commonStore/getAllMenu").then((res) => {
      this.menuList = res.data;
    });
  },
};
</script>

<style>
</style>