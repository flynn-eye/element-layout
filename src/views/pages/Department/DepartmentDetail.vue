<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="4" > 
        <el-card style="height:400px">
          <div >部门名称:{{this.detailData.deptName}}</div>
          <div>部门线路:{{this.detailData.line}}</div>
          <div>部长姓名:{{this.detail.empName}}</div>
          <div>员工人数:{{this.detail.employeeCounts}}人</div>
          <div>项目数量:{{this.detail.projectCounts}}项</div>
        </el-card>
      </el-col>
      <el-col :span="6"  style="margin:0px 20px 0 20px">
        <el-card :body-style="{ 'padding': '0px 0px 0px 0','min-height':'400px' }">
             <ve-pie :data="chartData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ 'padding': '0px 0px 0px 0px','min-height':'400px'}">
            <ve-histogram :data="chartData"></ve-histogram>
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
import { mapMutations, mapState } from "vuex";
import echarts from "echarts";
export default {
  name: "DepartmentDetail",
  mounted(){
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
    this.$store.dispatch('departmentManager/getDeptHeat',{deptCode:this.detailData.deptCode})
      .then(res=>{
          if(res.code==='200'){
              let result = getVirtulData(new Date().getFullYear(), res.data);
          option.series[0].data = result;
          let mycharts = echarts.init(document.getElementById("myheat"));
          mycharts.setOption(option);
          }
      })
      this.$store.dispatch('departmentManager/getMinisterByDeptCode',this.detailData.deptCode)
        .then(res=>{
            this.detail.empName = res.data.minister.empName
            this.detail.employeeCounts = res.data.employeeCounts
            this.detail.projectCounts = res.data.projectCounts
        })
        this.$store.dispatch('departmentManager/listDeptDownProjectChart',{deptCode:this.detailData.deptCode})
        .then(res=>{
            for(let i = 0;i<res.data.length;i++){
                res.data[i]['加班次数'] = res.data[i].counts
            }
            this.chartData.rows = res.data 
        })
  },
  data() {
    return {
      departmentDetail: null,
      detail:{
          empName:'',
          employeeCounts:0,
          projectCounts:0
      },
      chartData: {
          columns: ['projectName','加班次数'],
          rows: [
          ]
        }
    };
  },
  computed: mapState("departmentManager", {
    detailData: state => state.detailData
  }),
  methods: {}
};
</script>

<style lang='scss'>
</style>