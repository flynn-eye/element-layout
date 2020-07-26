<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="9">
        <el-card>
          <ve-histogram :data="chartData"></ve-histogram>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div ref="dashBoard" id="dashboard" style="height:400px;width:400px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
         <div style="height:400px;  overflow-y:auto;">
           <div>项目员工<span style="float:right;font-size:0.9rem">共：{{staffArray.length}}人</span></div>
          <el-divider></el-divider>
           <div v-for="(index,key) in  staffArray" :key="key">
             {{index}}
           </div>
         </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:.5rem">
      <el-row type="flex" align="center">
        <div id="myheat" style="height:200px;min-width:1200px"></div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
export default {
  name: "ProjectDetail",
  computed: {
    ...mapState("projectManager", {
      projectDetail: state => state.projectDetail
    })
  },
  data() {
    return {
      chartData: {
        columns: ["empName", "加班次数"],
        rows: []
      },
      staffArray:[]
    };
  },
  mounted() {
    let dashBoardoption = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3"],
      series: [
        {
          name: "业务指标",
          type: "gauge",
          detail: {
            formatter: "{value}%"
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 30,
              shadowBlur: 0,
              color: [
                [0.3, "#67e0e3"],
                [0.7, "#37a2da"],
                [1, "#fd666d"]
              ]
            }
          },
          data: [
            {
              value: 50,
              name: "项目进度"
            }
          ]
        }
      ]
    };
    //项目详细信息
    this.$store
      .dispatch("projectManager/projectInfo", this.projectDetail.projectId)
      .then(res => {
        this.staffArray = res.data.joinsName
        let projectStartDate = new Date(res.data.projectStartDate).getTime();
        let projectEndDate = new Date(res.data.projectEndDate).getTime() ;
        let dashBoardEcharts = echarts.init(this.$refs.dashBoard);
        let now = new Date().getTime()
        if (
          projectEndDate &&
          projectStartDate&&
          projectEndDate > projectStartDate
        ) {
            if((now-projectStartDate)/(projectEndDate-projectStartDate)>1){
              dashBoardoption.series[0].data[0].value = 100;
            }else{
              dashBoardoption.series[0].data[0].value = Math.floor( 100*(now-projectStartDate)/(projectEndDate-projectStartDate))
            }
          
          dashBoardEcharts.setOption(dashBoardoption, true);
        }else{
           dashBoardoption.series[0].data[0].value =0;
          dashBoardEcharts.setOption(dashBoardoption, true);
        }
      });

    var colors = ["#ededed", "#ADE0FF", "#2F9CFF", "#5FB6FF"];
    function getVirtulData(year, info) {
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
      .dispatch("projectManager/getHeat", {
        projectId: this.projectDetail.projectId
      })
      .then(res => {
        if (res.code === "200") {
          let result = getVirtulData(new Date().getFullYear(), res.data);
          option.series[0].data = result;
          let mycharts = echarts.init(document.getElementById("myheat"));
          mycharts.setOption(option);
        }
      });
    this.$store
      .dispatch("projectManager/listProjectDownPersonalCount", {
        projectId: this.projectDetail.projectId
      })
      .then(res => {
        if (res.code === "200") {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i]["加班次数"] = res.data[i].counts;
          }
          this.chartData.rows = res.data;
        }
      });
  }
};
</script>

<style>
</style>