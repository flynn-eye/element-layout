<template>
  <div>
    <el-card>
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px;">
        <el-step title="个人信息修改"></el-step>
        <el-step title="部门修改"></el-step>
        <el-step title="执行结果"></el-step>
      </el-steps>
      <!-- 信息修改 -->
      <el-row type="flex" justify="center">
        <el-form label-position="left" style="margin-top:80px" v-if="active===0">
          <el-form-item label="工号：">
            <el-input v-model="dialogForm.empNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="dialogForm.empName" placeholder="输入员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="职级：">
            <el-select @change="selectChange" v-model="dialogForm.rankId" placeholder="选择职级">
              <el-option
                v-for="(item,key) in  selectOption"
                :key="key"
                :label="item.rankName"
                :value="item.rankId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-row justify="center" type="flex">
              <el-button @click="next" round type="success">下一步</el-button>
            </el-row>
          </el-form-item>
        </el-form>
        <!-- 部门修改 -->
        <el-form v-if="active===1">
          <el-form-item v-for="(index,key) in rankList" :key="key" :label='index.rankName'>
            {{index}}
          </el-form-item>
          <el-form-item label>
            <el-button round type="success" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="active===2">
          <el-form-item label>
            <i class="el-icon-success" style="color:#52C41A;font-size:6rem;margin-top:50px"></i>
          </el-form-item>
          <el-form-item label>
            <el-row type="flex" justify="center">
              <div style="font-size:1.2rem;">修改成功</div>
            </el-row>
            <el-row type="flex" justify="center">
              <el-button
                style="margin-top:30px"
                @click="()=>{this.$router.push('/pageLayout/StaffLayout/staffManager')}"
                type="success"
                round
              >完成</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UpdateStaff",
  mounted() {
    this.$store.dispatch("rankManager/getRankList").then(res => {
      this.selectOption = res.data.ranks;
    });
    this.dialogForm.deptCode = this.staffDetail.dept.deptCode;
    this.dialogForm.deptName = this.staffDetail.dept.deptName;
    this.dialogForm.empName = this.staffDetail.empName;
    this.dialogForm.empNo = this.staffDetail.empNo;
    this.dialogForm.leader = this.staffDetail.parentEmployee.empNo;
    this.dialogForm.leaderName = this.staffDetail.parentEmployee.empName;
    this.dialogForm.rankId = this.staffDetail.rank.rankId;
    this.dialogForm.rankName = this.staffDetail.rank.rankName;
    this.$store
      .dispatch("rankManager/getParentRank", this.dialogForm.rankId)
      .then(res => {
        let temp = res.data[0];
        while (temp.parentRank) {
          this.rankList.push({ rankId: temp.rankId, rankName: temp.rankName });
          temp = temp.parentRank;
        }
        this.rankList.push({ rankId: temp.rankId, rankName: temp.rankName });
      });
  },
  data() {
    return {
      active: 0,
      dialogForm: {
        deptCode: null,
        deptName: "",
        empName: "",
        empNo: null,
        leader: null, //leader  empNo INT
        leaderName: "",
        password: null,
        rankId: null,
        rankName: "",
        selectChangeFlag: 0
      },
      rankList: [],
      selectOption: []
    };
  },
  computed: {
    ...mapState("staffManager", {
      staffDetail: state => state.staffDetail
    })
  },
  methods: {
    next() {
      if (this.selectChangeFlag === 1) {
        this.active += 1;
      } else {
        this.active += 2;
      }
      this.selectChangeFlag = 0;
    },
    ...mapMutations("staffManager", { SETstaffDetail: "SETstaffDetail" }),
    selectChange(value) {
      this.selectChangeFlag = 1;
      this.$store
        .dispatch("rankManager/getParentRank", this.dialogForm.rankId)
        .then(res => {
          this.rankList = []
          let temp = res.data[0];
          while (temp.parentRank) {
            this.rankList.unshift({
              rankId: temp.rankId,
              rankName: temp.rankName
            });
            temp = temp.parentRank;
          }
          console.log(this.rankList);
        });
    }
  }
};
</script>

<style lang="scss">
</style>