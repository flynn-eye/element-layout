<template>
  <div style="min-width:1200px">
    <el-card>
      <div class="container">
        <div class="left">
          <div class="header">
            <el-avatar :size="60" :src="headerImgUrl" />
          </div>
          <div class="detail">
            <div>
              <span>姓名：</span>
              <span class="message">{{`${this.staffDetail.empName}`}}</span>
              <span style="margin-left:10px">工号：</span>
              <span class="message">{{`${this.staffDetail.empNo}`}}</span>
            </div>
            <div class="data">
              {{`${this.staffDetail.rank.rankName}`}} |
              {{`${this.staffDetail.dept.deptName}`}} |
              {{`${this.staffDetail.dept.line}`}}
            </div>
          </div>
        </div>
        <div style="min-width:30vw">
          <el-steps :active="stepsData.length-1">
            <el-step
              v-for="(index,key) in stepsData"
              :description="index.rankName"
              :title="index.empName"
              :key="key"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </el-card>
    <el-row :gutter="2" style="margin-top:.5rem">
      <el-col :span="15">
        <el-card :body-style="{ 'padding': '0px','min-height':'382px' }">
          <div slot="header">
            <span>参加的项目</span>
            <a
              style="float: right; padding: 3px 0;color:#8C9ABC"
              type="text"
            >{{this.staffProject.length}}个项目</a>
          </div>
          <el-col v-for="(index,key) in projectDataSource" :key="key" :span="8">
            <el-card shadow="hover">
              <div class="project">
                <div>
                  项目名称:
                  <span class="name">{{index.projectName }}</span>
                </div>
                <div>开始时间:{{index.projectStartDate }}</div>
                <div>结束时间:{{index.projectEndDate }}</div>
                <div>
                  所属部门:
                  <span class="leader">{{index.employee.dept.deptName }}</span>
                  负责人:
                  <span class="leader">{{index.employee.empName }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col>
            <el-row type="flex" justify="center">
              <el-pagination
                style="align-self:end"
                v-if="projectDataSource.length"
                background
                :total="projectPaginationConfig.total"
                :current-page="projectPaginationConfig.currentPage"
                :page-size="projectPaginationConfig.pageSize"
                @current-change="currentChange"
                layout="prev, pager, next,jumper, total"
              ></el-pagination>
              <div
                v-else
                style="line-height:240px;color:#8c8c8c;font-size:1.2rem;min-height:240px"
              >这里什么也没有</div>
            </el-row>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <ve-pie :data="chartData"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:.5rem">
      <div id="myheat" style="height:200px;min-width:1200px"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapState, mapMutations } from "vuex";
export default {
  name: "StaffDetail",
  components: {},
  mounted() {
    var colors = ["#ededed", "#f5dfa1", "#f1d37c", "#edc757"];
    function getVirtulData(year, info) {
      console.log(info);
      let dateTime = new Date();
      let m = dateTime.getMonth() + 1;
      let d = dateTime.getDate() + 1;
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(+year + "-" + m + "-" + d);
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        var dateStr = echarts.format.formatTime("yyyy-MM-dd", time);
        var v = 0;
        for (let i = 0; i < info.length; i++) {
          if (dateStr === info[i].time) {
            v = info[i].timelong;
          }
        }
        var color = colors[0];
        if (0 < v && v <= 1) {
          color = colors[1];
        } else if (1 < v && v <= 3) {
          color = colors[2];
        } else if (v > 3) {
          color = colors[3];
        }
        data.push({
          name: dateStr,
          value: [dateStr, v],
          itemStyle: {
            normal: {
              color: color
            }
          }
        });
      }
      return data;
    }
    var option = {
      tooltip: {
        position: "top",
        formatter: function(params) {
          return params.name + ": " + params.value[1];
        }
      },

      calendar: [
        {
          range: new Date().getFullYear(),
          cellSize: 18,
          splitLine: {
            show: false
          },
          itemStyle: {
            normal: {
              color: "#ededed",
              borderColor: "#fff",
              borderWidth: "4"
            }
          },
          monthLabel: {
            formatter: "{M}月"
          },
          dayLabel: {
            // nameMap: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            nameMap: "cn"
          }
        }
      ],

      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: null //getVirtulData(new Date().getFullYear())
        }
      ]
    };
    this.$store
      .dispatch("staffManager/getStaffHeat", this.staffDetail.empNo)
      .then(res => {
        if (res.code === "200") {
          this.SETstaffHeat(res.data);
          let result = getVirtulData(new Date().getFullYear(), res.data);
          option.series[0].data = result;
          let mycharts = echarts.init(document.getElementById("myheat"));
          mycharts.setOption(option);
        }
      });
      this.$store.dispatch('staffManager/getStaffPie',this.staffDetail.empNo)
      .then(res=>{
        if(res.code==='200'){
          console.log(res.data)
          for(let i= 0;i<res.data.length;i++){
            this.$set(this.chartData.rows,i,res.data[i])
          }
        }
      })
    this.projectPaginationConfig.total = this.staffProject.length;
    this.projectPaginationConfig.pageSize = 9;
    this.$store
      .dispatch("projectManager/getStaffProject", this.staffDetail.empNo)
      .then(res => {
        this.SETstaffProject(res.data);
        this.projectDataSource = this.staffProject.slice(0, 9);
      });
    this.$store
      .dispatch("staffManager/getStaffLeaders", this.staffDetail.empNo)
      .then(res => {
        this.stepsData.push({
          empName: this.staffDetail.empName,
          rankName: this.staffDetail.rank.rankName
        });
        let temp = res.data[0];
        while (temp.parentEmployee) {
          this.stepsData.unshift({
            empName: temp.parentEmployee.empName,
            rankName: temp.parentEmployee.rank.rankName
          });
          temp = temp.parentEmployee;
        }
      });
  },
  data() {
    return {
      heatInfo: [],
      headerImgUrl: require("../../../assets/bigUserHeader.png"),
      stepsData: [],
      projectDataSource: [],
      overtimeDataSource: [],
      overtimePaginationConfig: {
        currentPage: 1,
        total: 0,
        pageSize: 0
      },
      projectPaginationConfig: {
        currentPage: 1,
        total: 0,
        pageSize: 0
      },
      chartData: {
        columns: ["项目", "次数"],
        rows: [
          { 项目: "1/1", 次数: 1393 },
        ]
      }
    };
  },
  methods: {
    ...mapMutations("projectManager", {
      SETstaffProject: "SETstaffProject"
    }),
    ...mapMutations("staffManager", {
      SETstaffHeat: "SETstaffHeat"
    }),
    currentChange(pageNum) {
      this.projectPaginationConfig.currentPage = pageNum;
      this.projectDataSource = this.staffProject.slice(
        (pageNum - 1) * 9,
        (pageNum - 1) * 9 + 9
      );
    }
  },
  computed: {
    ...mapState("staffManager", {
      staffDetail: state => state.staffDetail,
      staffHeat: state => state.staffHeat
    }),
    ...mapState("projectManager", {
      staffProject: state => state.staffProject
    })
  }
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    .header {
      align-self: center;
      margin: {
        right: 1rem;
      }
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .message {
        font: {
          size: 1.2rem;
        }
      }
      .data {
        color: #8c8c8c;
        font: {
          size: 1rem;
        }
      }
    }
  }
}
.project {
  .name {
    font: {
      weight: 550;
      size: 0.9rem;
    }
    &:hover {
      color: #52c46b;
    }
  }
  .leader {
    color: #8c8c8c;
    font: {
      size: 0.9rem;
    }
    &:hover {
      color: #52c46b;
    }
  }
}
</style>